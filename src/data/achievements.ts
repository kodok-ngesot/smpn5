export interface AchievementItem {
  id: string;
  title: string;
  competitionName: string;
  rank: string;
  category: "Akademik" | "Olahraga" | "Seni & Budaya" | "Kesiswaan & Sekolah";
  level: "Kabupaten" | "Karesidenan / Provinsi" | "Nasional";
  year: string;
  winnerName: string;
  organizer: string;
  photoSrc: string;
  isDummy: boolean;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "prestasi-1",
    title: "Juara Turnamen Futsal Putra Antar Kelas & Pembinaan Prestasi Olahraga",
    competitionName: "Kompetisi Futsal & Pembinaan Olahraga Siswa SMPN 5 Purbalingga",
    rank: "Juara 1",
    category: "Olahraga",
    level: "Kabupaten",
    year: "2026",
    winnerName: "Tim Futsal Putra SMPN 5 Purbalingga",
    organizer: "Bidang Kesiswaan & Olahraga SMPN 5 Purbalingga",
    photoSrc: "/images/school/real-juara-futsal.jpg",
    isDummy: false,
  },
  {
    id: "prestasi-2",
    title: "Apresiasi & Piagam Dharma Wanita Persatuan (DWP) Unit SMPN 5 Purbalingga",
    competitionName: "Pembinaan & Kegiatan DWP Dinas Pendidikan dan Kebudayaan Kab. Purbalingga",
    rank: "Penghargaan",
    category: "Kesiswaan & Sekolah",
    level: "Kabupaten",
    year: "2025",
    winnerName: "DWP Unit SMP Negeri 5 Purbalingga",
    organizer: "DWP Dindikbud Kabupaten Purbalingga",
    photoSrc: "/images/school/real-dwp-penghargaan.jpg",
    isDummy: false,
  },
  {
    id: "prestasi-3",
    title: "Penampilan Terbaik Parade Busana Adat & Lomba Baca Puisi Peringatan Hari Kartini",
    competitionName: "Apresiasi Seni Budaya & Literasi Sastra SMPN 5 Purbalingga",
    rank: "Terbaik 1",
    category: "Seni & Budaya",
    level: "Kabupaten",
    year: "2026",
    winnerName: "Siswa-Siswi Perwakilan Kelas SMPN 5 Purbalingga",
    organizer: "SMP Negeri 5 Purbalingga",
    photoSrc: "/images/school/real-kartini-fashion.jpg",
    isDummy: false,
  },
  {
    id: "prestasi-4",
    title: "Inovasi Produk Terbaik Gelar Karya P5 Tema Kewirausahaan",
    competitionName: "Pameran Projek Penguatan Profil Pelajar Pancasila (P5) Kurikulum Merdeka",
    rank: "Karya Unggulan",
    category: "Akademik",
    level: "Kabupaten",
    year: "2026",
    winnerName: "Tim Wirausaha Siswa & Kelas 8G SMPN 5 Purbalingga",
    organizer: "Tim Fasilitator P5 SMPN 5 Purbalingga",
    photoSrc: "/images/school/real-p5-kewirausahaan.jpg",
    isDummy: false,
  },
  {
    id: "prestasi-5",
    title: "[Contoh Data Tambahan] Juara 2 Lomba MAPSI Cabang Tilawah & Tartil Al-Qur'an SMP",
    competitionName: "Lomba MAPSI SMP Tingkat Kabupaten Purbalingga",
    rank: "Juara 2",
    category: "Akademik",
    level: "Kabupaten",
    year: "2025",
    winnerName: "[Perwakilan Siswa MAPSI SMPN 5]",
    organizer: "MGMP PAI SMP Kab. Purbalingga",
    photoSrc: "/images/school/real-tadarus-lapangan.jpg",
    isDummy: true,
  },
  {
    id: "prestasi-6",
    title: "[Contoh Data Tambahan] Juara Harapan 1 Lomba Baris-Berbaris (LKBB) Pelajar SMP",
    competitionName: "LKBB Pelajar SMP/MTs Tingkat Kabupaten Purbalingga",
    rank: "Harapan 1",
    category: "Kesiswaan & Sekolah",
    level: "Kabupaten",
    year: "2025",
    winnerName: "Pleton Paskibra SMPN 5 Purbalingga",
    organizer: "Dindikbud Kab. Purbalingga",
    photoSrc: "/images/school/real-upacara-bendera.jpg",
    isDummy: true,
  },
];
