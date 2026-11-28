export interface PpdbTrack {
  id: string;
  name: string;
  quotaBadge: string;
  description: string;
  keyCriteria: string[];
}

export interface PpdbStep {
  stepNumber: number;
  title: string;
  scheduleNote: string;
  description: string;
}

export interface PpdbFaq {
  question: string;
  answer: string;
}

export interface PublicDocumentItem {
  id: string;
  title: string;
  category: "PPDB / SPMB" | "Akademik & Kurikulum" | "Tata Tertib & Kesiswaan";
  fileFormat: "PDF" | "DOCX";
  fileSize: string;
  updatedAt: string;
  description: string;
  downloadHref: string;
}

export const ppdbOverview = {
  academicYear: "Tahun Ajaran Baru (Simulasi / Data Sementara)",
  statusLabel: "Informasi Persiapan PPDB / SPMB",
  note:
    "Jadwal tanggal pasti dan kuota daya tampung resmi mengikuti Keputusan Kepala Dinas Pendidikan dan Kebudayaan Kabupaten Purbalingga pada masa pendaftaran berlangsung.",
};

export const ppdbTracks: PpdbTrack[] = [
  {
    id: "jalur-domisili-zonasi",
    name: "Jalur Domisili / Zonasi",
    quotaBadge: "Kuota Utama (Sesuai Juknis Dindikbud)",
    description:
      "Diperuntukkan bagi calon peserta didik yang berdomisili di dalam wilayah zonasi yang ditetapkan oleh Pemerintah Kabupaten Purbalingga (area Bancar, Kecamatan Purbalingga, dan sekitarnya).",
    keyCriteria: [
      "Kartu Keluarga (KK) diterbitkan paling singkat 1 (satu) tahun sebelum tanggal pendaftaran PPDB.",
      "Prioritas seleksi berdasarkan jarak tempat tinggal terdekat ke SMPN 5 Purbalingga (Jl. Letjend S. Parman No. 1 A) dan usia calon peserta didik.",
    ],
  },
  {
    id: "jalur-afirmasi",
    name: "Jalur Afirmasi",
    quotaBadge: "Kuota Khusus Keluarga Tidak Mampu & Disabilitas",
    description:
      "Diperuntukkan bagi calon peserta didik yang berasal dari keluarga ekonomi tidak mampu serta calon peserta didik penyandang disabilitas.",
    keyCriteria: [
      "Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) atau memiliki Kartu Indonesia Pintar (KIP) / Program Keluarga Harapan (PKH) aktif.",
      "Surat pernyataan dari orang tua/wali tentang keabsahan dokumen yang diunggah.",
    ],
  },
  {
    id: "jalur-prestasi",
    name: "Jalur Prestasi",
    quotaBadge: "Akademik & Non-Akademik",
    description:
      "Diperuntukkan bagi calon peserta didik yang memiliki capaian nilai rapor SD/MI unggul dan/atau piagam penghargaan kejuaraan akademik maupun non-akademik.",
    keyCriteria: [
      "Nilai rapor SD/MI pada semester yang ditentukan dalam Juknis PPDB Kabupaten Purbalingga.",
      "Sertifikat/piagam kejuaraan resmi tingkat Kecamatan, Kabupaten, Provinsi, atau Nasional yang telah dilegalisasi.",
    ],
  },
  {
    id: "jalur-mutasi",
    name: "Jalur Perpindahan Tugas Orang Tua/Wali",
    quotaBadge: "Maksimal Sesuai Ketentuan",
    description:
      "Diperuntukkan bagi calon peserta didik yang mengikuti perpindahan tempat tugas kedinasan orang tua/wali ke wilayah Kabupaten Purbalingga.",
    keyCriteria: [
      "Surat Keputusan (SK) pindah tugas dari instansi, lembaga, kantor, atau perusahaan yang mempekerjakan orang tua/wali.",
      "Surat keterangan domisili dari pejabat berwenang di wilayah Purbalingga.",
    ],
  },
];

export const ppdbSteps: PpdbStep[] = [
  {
    stepNumber: 1,
    title: "Persiapan Berkas & Pembuatan Akun",
    scheduleNote: "Tahap 1 (Pra-Pendaftaran)",
    description:
      "Calon peserta didik menyiapkan dokumen asli (KK, Akta Kelahiran, SKL/Ijazah SD, Rapor, Piagam) dan melakukan pengajuan akun pada portal PPDB Online Kabupaten Purbalingga.",
  },
  {
    stepNumber: 2,
    title: "Verifikasi Berkas di Sekolah",
    scheduleNote: "Tahap 2 (Verifikasi Panitia)",
    description:
      "Panitia PPDB SMPN 5 Purbalingga memeriksa keabsahan dokumen persyaratan dan titik koordinat domisili calon peserta didik.",
  },
  {
    stepNumber: 3,
    title: "Aktivasi Akun & Pemilihan Jalur Sekolah",
    scheduleNote: "Tahap 3 (Pendaftaran Aktif)",
    description:
      "Peserta memilih SMP Negeri 5 Purbalingga sesuai jalur pendaftaran (Zonasi, Afirmasi, Prestasi, atau Perpindahan Tugas) dan mencetak tanda bukti pendaftaran.",
  },
  {
    stepNumber: 4,
    title: "Seleksi & Pengumuman Hasil Resmi",
    scheduleNote: "Tahap 4 (Seleksi Terbuka)",
    description:
      "Perankingan dilakukan secara transparan melalui sistem PPDB Kabupaten Purbalingga dan hasil akhir diumumkan secara daring serta di papan pengumuman sekolah.",
  },
  {
    stepNumber: 5,
    title: "Daftar Ulang Peserta Didik Baru",
    scheduleNote: "Tahap 5 (Wajib Bagi yang Diterima)",
    description:
      "Siswa yang dinyatakan diterima wajib menyerahkan berkas fisik daftar ulang ke sekretariat PPDB SMPN 5 Purbalingga sebelum mengikuti kegiatan MPLS.",
  },
];

export const ppdbRequirements: string[] = [
  "Berusia paling tinggi 15 (lima belas) tahun pada tanggal 1 Juli tahun berjalan.",
  "Telah menyelesaikan kelas 6 (enam) SD/MI atau bentuk lain yang sederajat (dibuktikan dengan Ijazah atau Surat Keterangan Lulus asli).",
  "Kartu Keluarga (KK) asli dan fotokopi yang telah dilegalisasi.",
  "Akta Kelahiran asli dan fotokopi.",
  "Pasfoto berwarna ukuran 3x4 berseragam sekolah asal.",
  "Kartu KIP / PKH / bukti terdaftar DTKS (khusus pendaftar Jalur Afirmasi).",
  "Piagam prestasi asli dan fotokopi legalisir (khusus pendaftar Jalur Prestasi dengan tambahan poin kejuaraan).",
];

export const ppdbFaqs: PpdbFaq[] = [
  {
    question: "Apakah pendaftaran PPDB di SMPN 5 Purbalingga dipungut biaya?",
    answer:
      "Tidak. Seluruh rangkaian proses pendaftaran dan seleksi PPDB / SPMB di SMP Negeri 5 Purbalingga tidak dipungut biaya (gratis) sesuai ketentuan sekolah negeri di bawah Dindikbud Kabupaten Purbalingga.",
  },
  {
    question: "Bagaimana jika calon siswa mengalami kendala saat unggah berkas daring?",
    answer:
      "Orang tua/wali murid dapat datang langsung ke Posko Layanan & Helpdesk PPDB di kampus SMPN 5 Purbalingga (Jl. Letjend S. Parman No. 1 A, Bancar) pada jam kerja pukul 08.00 - 14.00 WIB dengan membawa dokumen asli.",
  },
  {
    question: "Apakah siswa dari luar Kecamatan Purbalingga bisa mendaftar ke SMPN 5 Purbalingga?",
    answer:
      "Bisa. Calon siswa dari luar zonasi terdekat atau luar kecamatan tetap dapat mendaftar melalui Jalur Prestasi atau Jalur Perpindahan Tugas Orang Tua sesuai kuota yang tersedia pada Juknis Dindikbud.",
  },
  {
    question: "Kapan jadwal resmi pendaftaran dibuka?",
    answer:
      "Jadwal resmi PPDB SMP Kabupaten Purbalingga umumnya dilaksanakan pada bulan Juni hingga awal Juli setiap tahunnya. Pengumuman tanggal resmi akan diperbarui di halaman ini segera setelah Juknis terbaru diterbitkan.",
  },
];

export const publicDocumentsData: PublicDocumentItem[] = [
  {
    id: "doc-1",
    title: "Ringkasan Profil & Identitas Resmi SMPN 5 Purbalingga",
    category: "PPDB / SPMB",
    fileFormat: "PDF",
    fileSize: "240 KB",
    updatedAt: "November 2026",
    description: "Lembar informasi identitas sekolah (NPSN 20303136, Akreditasi A, fasilitas, dan kontak layanan).",
    downloadHref: "/documents/profil-singkat-smpn5-purbalingga.txt",
  },
  {
    id: "doc-2",
    title: "Panduan Persiapan Berkas PPDB / SPMB SMPN 5 Purbalingga (Contoh Draft)",
    category: "PPDB / SPMB",
    fileFormat: "PDF",
    fileSize: "310 KB",
    updatedAt: "November 2026",
    description: "Daftar periksa kelengkapan berkas pendaftaran jalur Zonasi, Afirmasi, Prestasi, dan Mutasi.",
    downloadHref: "/documents/panduan-berkas-ppdb-smpn5.txt",
  },
  {
    id: "doc-3",
    title: "Pedoman Tata Tertib & Budaya Disiplin Peserta Didik (Contoh Draft)",
    category: "Tata Tertib & Kesiswaan",
    fileFormat: "PDF",
    fileSize: "420 KB",
    updatedAt: "Juli 2026",
    description: "Aturan jam masuk sekolah, ketentuan atribut seragam harian, serta pedoman etika siswa.",
    downloadHref: "/documents/tata-tertib-siswa-smpn5.txt",
  },
  {
    id: "doc-4",
    title: "Rangkuman Kalender Akademik & Struktur Kurikulum Merdeka (Contoh Draft)",
    category: "Akademik & Kurikulum",
    fileFormat: "PDF",
    fileSize: "285 KB",
    updatedAt: "Juli 2026",
    description: "Jadwal pekan efektif belajar, pelaksanaan P5, penilaian tengah semester, dan akhir semester.",
    downloadHref: "/documents/kalender-akademik-smpn5.txt",
  },
];
