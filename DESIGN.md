# DESIGN.md: SMP Negeri 5 Purbalingga Official Profile

## Design Read
Reading this as: **Portal Profil & Informasi Publik Sekolah Negeri (SMPN 5 Purbalingga)** for **calon siswa, orang tua, siswa aktif, guru, dan masyarakat Kabupaten Purbalingga**, in a **Modern Institutional & Editorial Pendidikan** style, dial **ENERGY 2 / RHYTHM 2 / MOTION 1**.

## Three Dials
- **ENERGY: 2 (Balanced Institutional)** — Memiliki wibawa instansi pendidikan negeri yang resmi dan jelas, tetapi tetap hangat, ramah anak, dan modern.
- **RHYTHM: 2 (Consistent with Varied Compositions)** — Komposisi antar bagian bervariasi mengikuti kebutuhan informasi (asymmetric hero dengan random image switcher, 2-column editorial sambutan & berita/agenda, timeline vertikal/horizontal untuk PPDB, dan tabel terstruktur untuk unduhan dokumen).
- **MOTION: 1 (Purposeful Micro-Interactions & Controlled Crossfade)** — Fokus pada efek hover yang terasa hidup namun sopan (`-translate-y-0.5`, border emphasis, zoom foto halus `scale-[1.03]`, dan crossfade lembut pada komponen Random Image Switcher dengan tombol Pause/Play serta dukungan `prefers-reduced-motion`).

## Color System & Contrast Verification (WCAG AA)
Active palette dibatasi pada 2 warna inti + 1 aksen (di luar warna netral):
1. **Primary Core (Institutional Navy)**:
   - `#0B1F3A` (Navy 950) & `#123159` (Navy 900): Digunakan untuk header utama, permukaan kartu identitas resmi, dan teks judul utama. Rasio kontras dengan putih `#FFFFFF` adalah **15.8:1** (Lulus AAA).
2. **Secondary Core (Emerald / Teal Pendidikan)**:
   - `#0F766E` (Teal 700) & `#115E59` (Teal 800): Digunakan untuk penanda status aktif, lingkungan sekolah asri, dan elemen interaktif sekunder. Rasio kontras `#115E59` dengan `#FFFFFF` adalah **7.4:1** (Lulus AA/AAA).
3. **Deliberate Accent (Academic Gold / Amber)**:
   - `#B45309` (Amber 700 untuk teks di atas latar terang, kontras **5.02:1**) dan `#F59E0B` (Amber 500 dengan teks gelap `#0B1F3A`, kontras **10.1:1**): Digunakan secara terukur hanya pada momen kunci seperti CTA Portal PPDB, lencana Akreditasi A, dan sorotan medali prestasi.
4. **Neutral Surfaces**:
   - `#FFFFFF` (Pure White), `#F8FAFC` (Slate 50), `#F1F5F9` (Slate 100), dengan teks `#0F172A` (Slate 900, kontras **18.1:1**) dan teks sekunder `#334155` (Slate 700, kontras **10.3:1**) atau `#475569` (Slate 600, kontras **7.5:1**).

## Typography & Written Reasons (R-06, R-31)
- **Heading & Display Font**: `Plus Jakarta Sans` — Dipilih karena memiliki karakter geometris humanis modern yang dirancang di Indonesia, memberikan kesan institusi pendidikan masa kini yang ramah, lugas, dan mudah dibaca pada ukuran besar.
- **Body & Data Font**: `Plus Jakarta Sans` dengan `tabular-nums` pada angka NPSN, telepon, jadwal, dan tahun — Menjaga keterbacaan tabel dokumen, jadwal PPDB, dan identitas sekolah.

## Identity Motif & Key Decisions (R-31)
- **Identity Motif**: Garis aksen ganda khas instansi pendidikan (*Academic Crest Rule*: kombinasi bidang Navy `#0B1F3A` dengan aksen tipis Gold `#F59E0B`) pada header halaman dan kartu identitas resmi NPSN 20303136.
- **Why Asymmetric Hero + Random Image Showcase**: Memadukan informasi resmi sekolah (NPSN, Akreditasi A, CTA PPDB) di sisi kiri dengan galeri foto sekolah hidup yang berganti secara acak/otomatis di sisi kanan lengkap dengan kontrol pengguna (Acak Foto, Jeda/Putar, dan keterangan foto).
- **Why Varied Section Layouts**: Menghindari pengulangan grid 3 kartu yang monoton; bagian berita dan agenda disandingkan dalam layout 2 kolom fungsional (7:5), sedangkan PPDB disajikan dengan alur tahapan berurut dan daftar periksa dokumen.
- **Honest Placeholder Strategy (R-23, R-38)**: Data publik yang terverifikasi (NPSN `20303136`, Akreditasi `A` SK No. 905/BAN-SM/SK/2019, alamat `Jl. Letjend S. Parman No. 1 A, Bancar, Purbalingga`, telepon `(0281) 891088`, email `smpn5.purbalingga@gmail.com`, Kepala Sekolah `Slamet Sriyanto`) ditampilkan sebagai fakta nyata. Sementara itu, daftar prestasi, kegiatan, dan slot foto yang menunggu dokumen asli dari pemilik website diberi badge penanda transparan `[Data Sementara / Siap Diganti Foto & Data Asli]` agar jujur dan mudah dikelola.
