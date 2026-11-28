import crypto from "crypto";
import { NextRequest } from "next/server";

// Admin credentials can be overridden via environment variables in production (.env.local)
const ADMIN_USERNAME = process.env.SMPN5_ADMIN_USER || "admin_smpn5";
const ADMIN_PASSWORD = process.env.SMPN5_ADMIN_PASSWORD || "Smpn5Pbg@2026!";

// Server-side secret key for HMAC-SHA256 signing
const SERVER_SECRET =
  process.env.SMPN5_AUTH_SECRET ||
  "smpn5-purbalingga-hmac-secret-key-20303136-verified-2026";

export const SESSION_COOKIE_NAME = "smpn5_admin_session";
export const CSRF_COOKIE_NAME = "smpn5_csrf_token";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// In-memory brute-force rate limiter per IP
interface LoginAttemptRecord {
  count: number;
  lockUntil: number;
}
const loginAttempts = new Map<string, LoginAttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export function checkLoginRateLimit(ip: string): {
  allowed: boolean;
  remainingSeconds: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true, remainingSeconds: 0 };

  if (record.lockUntil > now) {
    return {
      allowed: false,
      remainingSeconds: Math.ceil((record.lockUntil - now) / 1000),
    };
  }

  if (record.lockUntil !== 0 && record.lockUntil <= now) {
    loginAttempts.delete(ip);
  }
  return { allowed: true, remainingSeconds: 0 };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lockUntil: 0 };
  record.count += 1;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockUntil = now + LOCKOUT_DURATION_MS;
  }
  loginAttempts.set(ip, record);
}

export function clearFailedLogins(ip: string): void {
  loginAttempts.delete(ip);
}

// Constant-time string comparison using SHA-256 digests to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export function verifyAdminCredentials(
  usernameInput: string,
  passwordInput: string
): boolean {
  const userMatch = safeCompare(usernameInput.trim(), ADMIN_USERNAME);
  const passMatch = safeCompare(passwordInput, ADMIN_PASSWORD);
  return userMatch && passMatch;
}

export interface SessionPayload {
  sub: string;
  role: "admin";
  csrf: string;
  exp: number;
}

export function createSessionToken(): {
  sessionToken: string;
  csrfToken: string;
  expiresAt: number;
} {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload: SessionPayload = {
    sub: ADMIN_USERNAME,
    role: "admin",
    csrf: csrfToken,
    exp: expiresAt,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const signature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  return {
    sessionToken: `${payloadBase64}.${signature}`,
    csrfToken,
    expiresAt,
  };
}

export function verifySessionToken(
  token: string | undefined
): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return null;

  const expectedSig = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  if (!safeCompare(signature, expectedSig)) return null;

  try {
    const decoded = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8")
    ) as SessionPayload;

    if (!decoded.exp || Date.now() > decoded.exp) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

// Validates both the HttpOnly session cookie AND the CSRF Double-Submit + Origin header for mutating requests
export function validateAdminRequest(
  req: NextRequest,
  requireCsrf = true
): { valid: boolean; error?: string; session?: SessionPayload } {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(sessionCookie);

  if (!session) {
    return {
      valid: false,
      error: "Sesi login tidak valid atau telah berakhir. Silakan login kembali.",
    };
  }

  if (requireCsrf) {
    // 1. Origin / Referer verification against Cross-Origin CSRF
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return {
            valid: false,
            error: "Permintaan ditolak: Origin tidak sesuai (Proteksi CSRF).",
          };
        }
      } catch {
        return {
          valid: false,
          error: "Permintaan ditolak: Header Origin tidak valid.",
        };
      }
    }

    // 2. Double-Submit CSRF Token verification (Header X-CSRF-Token must match signed session payload & cookie)
    const headerCsrf = req.headers.get("x-csrf-token") || "";
    const cookieCsrf = req.cookies.get(CSRF_COOKIE_NAME)?.value || "";

    if (
      !headerCsrf ||
      !cookieCsrf ||
      !safeCompare(headerCsrf, session.csrf) ||
      !safeCompare(headerCsrf, cookieCsrf)
    ) {
      return {
        valid: false,
        error: "Token keamanan CSRF tidak cocok atau tidak ditemukan.",
      };
    }
  }

  return { valid: true, session };
}

// Sanitizes plain text input by stripping HTML tags and control characters to prevent Stored XSS
export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

// Validates binary image magic bytes (JPEG, PNG, WEBP) to prevent disguised script/executable uploads
export function detectImageMagicBytes(
  buffer: Buffer
): { valid: boolean; ext?: "jpg" | "png" | "webp" } {
  if (buffer.length < 12) return { valid: false };

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, ext: "jpg" };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, ext: "png" };
  }

  // WEBP: "RIFF" .... "WEBP"
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, ext: "webp" };
  }

  return { valid: false };
}
