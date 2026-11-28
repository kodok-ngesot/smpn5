import { NextRequest, NextResponse } from "next/server";
import {
  getClientIp,
  checkLoginRateLimit,
  recordFailedLogin,
  clearFailedLogins,
  verifyAdminCredentials,
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  sanitizeText,
} from "@/lib/security";

// GET /api/admin/auth => Checks current admin session and returns active CSRF token
export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(sessionCookie);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    username: session.sub,
    csrfToken: session.csrf,
    expiresAt: session.exp,
  });
}

// POST /api/admin/auth => Authenticates admin with rate-limit & sets HttpOnly + CSRF cookies
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateStatus = checkLoginRateLimit(ip);

  if (!rateStatus.allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan login gagal. Akses dikunci sementara selama ${Math.ceil(
          rateStatus.remainingSeconds / 60
        )} menit.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const username = sanitizeText(body?.username, 64);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(username, password);
    if (!isValid) {
      recordFailedLogin(ip);
      return NextResponse.json(
        { error: "Username atau password admin tidak sesuai." },
        { status: 401 }
      );
    }

    clearFailedLogins(ip);
    const { sessionToken, csrfToken, expiresAt } = createSessionToken();

    const response = NextResponse.json({
      authenticated: true,
      username,
      csrfToken,
      expiresAt,
    });

    const isProd = process.env.NODE_ENV === "production";

    // HttpOnly Session Cookie (Unreachable by client-side JS / XSS)
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: isProd,
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    // Double-Submit CSRF Token Cookie (Readable by same-origin admin UI to send in X-CSRF-Token header)
    response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: false,
      sameSite: "strict",
      secure: isProd,
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Format permintaan login tidak valid." },
      { status: 400 }
    );
  }
}

// DELETE /api/admin/auth => Clears session and CSRF cookies (Logout)
export async function DELETE() {
  const response = NextResponse.json({ authenticated: false, loggedOut: true });
  response.cookies.delete(SESSION_COOKIE_NAME);
  response.cookies.delete(CSRF_COOKIE_NAME);
  return response;
}
