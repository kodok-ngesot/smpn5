export interface SchoolLeader {
  id: string;
  name: string;
  role: string;
  nipStatus: string;
  field: string;
  isVerified: boolean;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: "Akademik" | "Penunjang" | "Olahraga & Kesiswaan";
  description: string;
  condition: string;
  photoSrc: string;
}

export const schoolIdentity = {
  name: "SMP Negeri 5 Purbalingga",
  shortName: "SMPN 5 PURBALINGGA",
  npsn: "20303136",
  jenjang: "SMP (Sekolah Menengah Pertama)",
  status: "Negeri",
  akreditasi: "A",
  skAkreditasi: "905/BAN-SM/SK/2019",
  kurikulum: "Kurikulum Merdeka",
  kepalaSekolah: "Slamet Sriyanto",
  address: {
    street: "Jl. Letjend S. Parman No. 1 A",
    kelurahan: "Bancar",
    kecamatan: "Kecamatan Purbalingga",
    kabupaten: "Kabupaten Purbalingga",
    provinsi: "Jawa Tengah",
    postalCode: "53316",
    fullAddress:
      "Jl. Letjend S. Parman No. 1 A, Kel. Bancar, Kec. Purbalingga, Kab. Purbalingga, Jawa Tengah 53316",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=SMP+Negeri+5+Purbalingga+Jl.+Letjend+S.+Parman+No.+1+A+Bancar+Purbalingga&output=embed",
    googleMapsDirectUrl:
      "https://www.google.com/maps/search/?api=1&query=SMP+Negeri+5+Purbalingga+Jl.+Letjend+S.+Parman+No.+1+A+Bancar+Purbalingga",
  },
  contact: {
    phone: "(0281) 891088",
    phoneClean: "0281891088",
    whatsappDisplay: "0812-2700-5136 (Hotline Humas - Placeholder)",
    whatsappLink:
      "https://wa.me/6281227005136?text=Halo%20Humas%20SMPN%205%20Purbalingga%2C%20saya%20ingin%20bertanya%20mengenai%20informasi%20sekolah.",
    email: "smpn5.purbalingga@gmail.com",
    serviceHours: "Senin s.d. Jumat: 07.00 - 15.00 WIB",
  },
  vision:
    "Terwujudnya peserta didik SMP Negeri 5 Purbalingga yang beriman, berakhlak mulia, unggul dalam prestasi akademik dan non-akademik, berbudaya disiplin, serta peduli terhadap kelestarian lingkungan.",
  missions: [
    "Menanamkan keimanan dan ketakwaan melalui pembiasaan ibadah serta keteladanan akhlak di lingkungan sekolah.",
    "Melaksanakan pembelajaran Kurikulum Merdeka yang aktif, kreatif, dan berpusat pada pengembangan potensi peserta didik.",
    "Membina bakat dan minat siswa secara terarah melalui program ekstrakurikuler olahraga, seni budaya, sains, dan kepemimpinan.",
    "Meningkatkan disiplin, budaya literasi, serta layanan bimbingan konseling yang ramah anak.",
    "Mewujudkan lingkungan sekolah di kawasan Bancar yang bersih, sehat, hijau, dan nyaman sebagai ruang tumbuh bersama.",
  ],
  goals: [
    "Mempertahankan standar mutu Akreditasi A melalui peningkatan kompetensi tenaga pendidik dan kelengkapan sarana belajar.",
    "Meningkatkan capaian prestasi siswa pada ajang OSN, O2SN, FLS2N, dan kompetisi tingkat Kabupaten Purbalingga hingga Provinsi Jawa Tengah.",
    "Menghasilkan lulusan yang memiliki karakter Profil Pelajar Pancasila dan siap melanjutkan ke jenjang SMA/SMK terbaik.",
  ],
  principalWelcome: {
    name: "Slamet Sriyanto",
    title: "Kepala SMP Negeri 5 Purbalingga",
    greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Pendidikan.",
    paragraphs: [
      "Selamat datang di portal informasi resmi SMP Negeri 5 Purbalingga. Sebagai satuan pendidikan negeri yang berlokasi di Jl. Letjend S. Parman No. 1 A, Kelurahan Bancar, kami berkomitmen menghadirkan layanan pendidikan yang transparan, tertib, dan berorientasi pada perkembangan karakter serta prestasi peserta didik.",
      "Website ini kami hadirkan sebagai jembatan komunikasi antara sekolah, orang tua/wali murid, siswa, dan masyarakat luas. Melalui laman ini, masyarakat dapat mengakses profil institusi, agenda akademik, dokumentasi prestasi siswa, hingga informasi resmi Penerimaan Peserta Didik Baru (PPDB / SPMB).",
      "Mari bersinergi membangun generasi muda Purbalingga yang cerdas, santun, dan berdaya saing.",
    ],
  },
};

export const schoolLeaders: SchoolLeader[] = [
  {
    id: "kepsek",
    name: "Slamet Sriyanto",
    role: "Kepala Sekolah",
    nipStatus: "Data Terverifikasi Kemendikdasmen",
    field: "Penanggung Jawab Utama Satuan Pendidikan",
    isVerified: true,
  },
  {
    id: "waka-kurikulum",
    name: "[Data Sementara] Wakasek Bidang Kurikulum",
    role: "Wakil Kepala Sekolah",
    nipStatus: "Placeholder Struktural",
    field: "Perencanaan Pembelajaran, Kurikulum Merdeka & Evaluasi Akademik",
    isVerified: false,
  },
  {
    id: "waka-kesiswaan",
    name: "[Data Sementara] Wakasek Bidang Kesiswaan",
    role: "Wakil Kepala Sekolah",
    nipStatus: "Placeholder Struktural",
    field: "Pembinaan Karakter, OSIS, Ekstrakurikuler & Prestasi Siswa",
    isVerified: false,
  },
  {
    id: "waka-sarpras",
    name: "[Data Sementara] Wakasek Bidang Sarana & Prasarana",
    role: "Wakil Kepala Sekolah",
    nipStatus: "Placeholder Struktural",
    field: "Pengelolaan Fasilitas Kelas, Laboratorium & Lingkungan Sekolah",
    isVerified: false,
  },
  {
    id: "waka-humas",
    name: "[Data Sementara] Wakasek Bidang Humas",
    role: "Wakil Kepala Sekolah",
    nipStatus: "Placeholder Struktural",
    field: "Kemitraan Orang Tua, Komite Sekolah & Layanan Informasi Publik",
    isVerified: false,
  },
  {
    id: "ka-tu",
    name: "[Data Sementara] Kepala Urusan Tata Usaha",
    role: "Kepala Tata Usaha (Ka. TU)",
    nipStatus: "Placeholder Struktural",
    field: "Administrasi Sekolah, Dapodik, Persuratan & Pelayanan Terpadu",
    isVerified: false,
  },
];

export const schoolFacilities: FacilityItem[] = [
  {
    id: "ruang-kelas",
    name: "Ruang Kelas & Pelatihan Kepemimpinan",
    category: "Akademik",
    description:
      "Ruang belajar kelas VII, VIII, dan IX serta ruang pelatihan Latihan Dasar Kepemimpinan (LDK) OSIS dengan pencahayaan alami dan proyektor pembelajaran.",
    condition: "Terawat / Siap Pakai",
    photoSrc: "/images/school/real-ldk-osis.jpg",
  },
  {
    id: "lapangan-olahraga",
    name: "Lapangan Upacara, Basket & Futsal Terpadu",
    category: "Olahraga & Kesiswaan",
    description:
      "Lapangan utama berlogo resmi SMP Negeri 5 Purbalingga untuk pelaksanaan upacara bendera, senam bersama, turnamen futsal, basket, dan kegiatan literasi.",
    condition: "Terawat",
    photoSrc: "/images/school/real-upacara-bendera.jpg",
  },
  {
    id: "area-p5-bazar",
    name: "Area Panggung & Halaman Gelar Karya P5",
    category: "Olahraga & Kesiswaan",
    description:
      "Area terbuka hijau dan panggung kegiatan untuk penyelenggaraan Bazar Kewirausahaan P5, pentas seni, peragaan busana, dan kegiatan paguyuban.",
    condition: "Aktif",
    photoSrc: "/images/school/real-bazar-p5-8g.jpg",
  },
  {
    id: "upz-rohis",
    name: "Unit Pengumpul Zakat (UPZ) & Sarana Ibadah",
    category: "Penunjang",
    description:
      "Pusat kegiatan keagamaan siswa, tadarus Al-Qur'an, salat berjamaah, serta pengelolaan dan penyaluran zakat fitrah warga sekolah.",
    condition: "Aktif",
    photoSrc: "/images/school/real-upz-zakat.jpg",
  },
  {
    id: "ruang-seni-gamelan",
    name: "Ruang Seni Budaya & Perangkat Gamelan",
    category: "Akademik",
    description:
      "Fasilitas pengembangan bakat seni musik tradisional karawitan/gamelan, paduan suara, serta keterampilan kriya.",
    condition: "Aktif",
    photoSrc: "/images/school/real-kriya-konektor.jpg",
  },
  {
    id: "gerbang-ramah-anak",
    name: "Gerbang Utama & Pos Sekolah Ramah Anak",
    category: "Penunjang",
    description:
      "Area penyambutan pagi budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) dengan protokol Sekolah Ramah Anak di Jl. Letjend S. Parman No. 1 A.",
    condition: "Terawat",
    photoSrc: "/images/school/real-gerbang-5s.jpg",
  },
  {
    id: "koridor-taman",
    name: "Koridor Kelas & Taman Hijau Sekolah",
    category: "Penunjang",
    description:
      "Selasar penghubung antar ruang kelas yang teduh dengan pepohonan rindang dan papan nilai karakter sekolah.",
    condition: "Terawat",
    photoSrc: "/images/school/real-classmeeting-lomba.jpg",
  },
];
