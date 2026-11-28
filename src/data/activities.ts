export interface ActivityNewsItem {
  id: string;
  slug: string;
  title: string;
  category: "Kegiatan Sekolah" | "Pengumuman" | "Akademik" | "Kesiswaan";
  date: string;
  author: string;
  excerpt: string;
  content: string;
  photoSrc: string;
  isDummy: boolean;
}

export interface AcademicEventItem {
  id: string;
  title: string;
  dateRange: string;
  monthLabel: string;
  semester: "Semester Ganjil" | "Semester Genap";
  category: "Akademik" | "Kesiswaan" | "Ujian & Rapor" | "PPDB";
  description: string;
  isDummy: boolean;
}

export interface ExtracurricularItem {
  id: string;
  name: string;
  type: "Wajib" | "Pilihan";
  category: "Kepemimpinan & Karakter" | "Olahraga" | "Seni & Budaya" | "Sains & Literasi";
  schedule: string;
  description: string;
}

export const activitiesNewsData: ActivityNewsItem[] = [
  {
    id: "kegiatan-1",
    slug: "gelar-karya-p5-tema-kewirausahaan",
    title: "Gelar Karya P5 Tema Kewirausahaan & Bazar Kuliner Kreasi Siswa SMPN 5 Purbalingga",
    category: "Kegiatan Sekolah",
    date: "14 November 2026",
    author: "Tim Kurikulum & P5 SMPN 5 Purbalingga",
    excerpt:
      "Kepala Sekolah Bapak Slamet Sriyanto bersama dewan guru dan Paguyuban Orang Tua meninjau langsung pameran produk wirausaha siswa mulai dari kuliner tradisional hingga kreasi minuman segar.",
    content:
      "Dalam rangka mengimplementasikan Kurikulum Merdeka, SMP Negeri 5 Purbalingga menggelar puncak Projek Penguatan Profil Pelajar Pancasila (P5) dengan Tema Kewirausahaan. Para siswa dari berbagai kelas, termasuk stand kreatif Kelas 8G dan stand Paguyuban, mempraktikkan langsung proses perencanaan produk, pengemasan, hingga pelayanan konsumen di halaman sekolah.",
    photoSrc: "/images/school/real-p5-kewirausahaan.jpg",
    isDummy: false,
  },
  {
    id: "kegiatan-2",
    slug: "ramadhan-festive-dan-penyaluran-zakat-upz",
    title: "Ramadhan Festive: Penyaluran Zakat Fitrah UPZ SMPN 5 Purbalingga & Tadarus Bersama",
    category: "Kesiswaan",
    date: "28 Oktober 2026",
    author: "Unit Pengumpul Zakat (UPZ) & Rohis",
    excerpt:
      "Melalui Unit Pengumpul Zakat (UPZ) SMP Negeri 5 Purbalingga, para siswa menyalurkan paket beras zakat fitrah secara langsung kepada masyarakat sekitar Kelurahan Bancar.",
    content:
      "Kegiatan Ramadhan Festive di SMPN 5 Purbalingga diisi dengan rangkaian acara peningkatan iman dan kepedulian sosial, meliputi Tadarus Al-Qur'an (One Class One Juz) di lapangan sekolah, pengumpulan serta penyaluran Zakat Fitrah oleh UPZ sekolah kepada warga yang membutuhkan, peringatan Nuzulul Qur'an, salat Dhuha bersama, dan festival keagamaan.",
    photoSrc: "/images/school/real-upz-zakat.jpg",
    isDummy: false,
  },
  {
    id: "kegiatan-3",
    slug: "latihan-dasar-kepemimpinan-ldk-osis",
    title: "Latihan Dasar Kepemimpinan (LDK) OSIS: Membentuk Generasi Profil Pelajar Pancasila",
    category: "Kesiswaan",
    date: "15 Oktober 2026",
    author: "Bidang Kesiswaan SMPN 5 Purbalingga",
    excerpt:
      "Pengurus OSIS mengikuti pelatihan kepemimpinan, manajemen organisasi, public speaking, dan penegakan budaya 5S (Senyum, Salam, Sapa, Sopan, Santun).",
    content:
      "Latihan Dasar Kepemimpinan (LDK) OSIS diselenggarakan untuk membekali calon pemimpin muda SMPN 5 Purbalingga dengan kecakapan komunikasi, tanggung jawab organisasi, keteladanan disiplin di gerbang Sekolah Ramah Anak, serta tata upacara bendera.",
    photoSrc: "/images/school/real-ldk-osis.jpg",
    isDummy: false,
  },
  {
    id: "kegiatan-4",
    slug: "semarak-hari-kartini-dan-apresiasi-sastra",
    title: "Semarak Parade Busana Adat, Lomba Baca Puisi & Persembahan Seni Siswa",
    category: "Kegiatan Sekolah",
    date: "02 Oktober 2026",
    author: "Bidang Seni Budaya & Literasi",
    excerpt:
      "Lapangan utama SMPN 5 Purbalingga semarak dengan peragaan busana kebaya nasional, pembacaan puisi, serta persembahan paduan suara siswa.",
    content:
      "Untuk menumbuhkan kecintaan terhadap budaya bangsa dan kemampuan literasi sastra, siswa-siswi bersama dewan guru menampilkan peragaan busana adat kebaya dan batik, lomba baca puisi di lapangan utama, serta penampilan vokal paduan suara.",
    photoSrc: "/images/school/real-kartini-fashion.jpg",
    isDummy: false,
  },
  {
    id: "kegiatan-5",
    slug: "gebyar-senam-pagi-dan-turnamen-classmeeting",
    title: "Gebyar Senam Sehat Bersama & Penyerahan Piala Turnamen Futsal Classmeeting",
    category: "Akademik",
    date: "20 September 2026",
    author: "Tim PJOK & Kesiswaan",
    excerpt:
      "Menjaga kebugaran jasmani warga sekolah melalui senam pagi bersama di lapangan utama serta kompetisi olahraga futsal dan lomba ketangkasan antar kelas.",
    content:
      "Seluruh siswa dan guru mengikuti senam kebugaran jasmani secara rutin di lapangan olahraga SMPN 5 Purbalingga. Kegiatan juga dirangkaikan dengan penyerahan piala kepada tim pemenang turnamen futsal putra serta lomba kekompakan antar kelas.",
    photoSrc: "/images/school/real-senam-bersama.jpg",
    isDummy: false,
  },
  {
    id: "kegiatan-6",
    slug: "kiprah-dharma-wanita-persatuan-smpn5",
    title: "Kiprah Dharma Wanita Persatuan (DWP) SMPN 5 Purbalingga dalam Raker & Kriya Kreatif",
    category: "Pengumuman",
    date: "10 September 2026",
    author: "DWP Unit SMPN 5 Purbalingga",
    excerpt:
      "Partisipasi aktif anggota DWP dalam sosialisasi AD/ART tingkat Kabupaten Purbalingga, penerimaan penghargaan dari DWP Dindikbud, dan pelatihan kriya rajut.",
    content:
      "Dharma Wanita Persatuan (DWP) unit SMP Negeri 5 Purbalingga aktif mendukung program pendidikan dan pemberdayaan keterampilan melalui pertemuan rutin, penerimaan apresiasi dari DWP Dinas Pendidikan dan Kebudayaan Kabupaten Purbalingga, serta produksi kerajinan tangan.",
    photoSrc: "/images/school/real-dwp-penghargaan.jpg",
    isDummy: false,
  },
];

export const academicCalendarData: AcademicEventItem[] = [
  {
    id: "cal-1",
    title: "Masa Pengenalan Lingkungan Sekolah (MPLS) & Budaya 5S Siswa Baru",
    dateRange: "Pertengahan Juli",
    monthLabel: "Juli",
    semester: "Semester Ganjil",
    category: "Kesiswaan",
    description: "Pengenalan budaya Sekolah Ramah Anak, tata tertib, guru, dan fasilitas bagi peserta didik baru kelas VII.",
    isDummy: false,
  },
  {
    id: "cal-2",
    title: "Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) SMP",
    dateRange: "Minggu ke-2 September",
    monthLabel: "September",
    semester: "Semester Ganjil",
    category: "Akademik",
    description: "Pelaksanaan survei karakter, lingkungan belajar, literasi, dan numerasi di Lab Komputer.",
    isDummy: false,
  },
  {
    id: "cal-3",
    title: "Latihan Dasar Kepemimpinan (LDK) OSIS & Gelar Karya P5 Kewirausahaan",
    dateRange: "Oktober",
    monthLabel: "Oktober",
    semester: "Semester Ganjil",
    category: "Kesiswaan",
    description: "Pelatihan kepemimpinan pengurus OSIS serta bazar puncak Projek Penguatan Profil Pelajar Pancasila (P5).",
    isDummy: false,
  },
  {
    id: "cal-4",
    title: "Asesmen Sumatif Akhir Semester (ASAS), Turnamen Futsal & Classmeeting",
    dateRange: "Desember (Minggu ke-1 s.d. ke-3)",
    monthLabel: "Desember",
    semester: "Semester Ganjil",
    category: "Ujian & Rapor",
    description: "Ujian akhir semester ganjil, turnamen olahraga futsal dan lomba ketangkasan antar kelas, serta pembagian rapor.",
    isDummy: false,
  },
  {
    id: "cal-5",
    title: "Ramadhan Festive & Penyaluran Zakat Fitrah UPZ Sekolah",
    dateRange: "Bulan Suci Ramadhan",
    monthLabel: "Maret",
    semester: "Semester Genap",
    category: "Kesiswaan",
    description: "Gerakan Tadarus Al-Qur'an One Class One Juz, salat Dhuha bersama, serta pengumpulan dan penyaluran zakat fitrah oleh UPZ SMPN 5 Purbalingga.",
    isDummy: false,
  },
  {
    id: "cal-6",
    title: "Peringatan Hari Kartini, Parade Busana Adat & Pelepasan Kelas IX",
    dateRange: "April - Mei",
    monthLabel: "April",
    semester: "Semester Genap",
    category: "Akademik",
    description: "Lomba peragaan busana adat kebaya, baca puisi, ujian akhir jenjang, dan acara pelepasan siswa kelas IX.",
    isDummy: false,
  },
  {
    id: "cal-7",
    title: "Pelaksanaan PPDB / SPMB Tahun Ajaran Baru",
    dateRange: "Juni - Awal Juli",
    monthLabel: "Juni",
    semester: "Semester Genap",
    category: "PPDB",
    description: "Pembukaan pendaftaran peserta didik baru jalur Zonasi, Afirmasi, Prestasi, dan Perpindahan Tugas.",
    isDummy: false,
  },
];

export const extracurricularData: ExtracurricularItem[] = [
  {
    id: "ekskul-pramuka",
    name: "Praja Muda Karana (Pramuka)",
    type: "Wajib",
    category: "Kepemimpinan & Karakter",
    schedule: "Jumat Sore",
    description: "Pembinaan karakter kemandirian, kedisiplinan, kecakapan kepanduan, dan kepedulian sosial.",
  },
  {
    id: "ekskul-osis-paskibra",
    name: "Kepemimpinan OSIS & Pasukan Pengibar Bendera (Paskibra)",
    type: "Pilihan",
    category: "Kepemimpinan & Karakter",
    schedule: "Rabu & Sabtu Sore",
    description: "Pelatihan baris-berbaris (PBB), tata upacara bendera, Latihan Dasar Kepemimpinan (LDK), dan kader disiplin 5S.",
  },
  {
    id: "ekskul-rohis-upz",
    name: "Kerohanian Islam (Rohis) & Tadarus Al-Qur'an",
    type: "Pilihan",
    category: "Kepemimpinan & Karakter",
    schedule: "Kamis Sore",
    description: "Pembinaan akhlak mulia, tadarus Al-Qur'an, seni hadroh, dan pengelolaan kegiatan sosial Ramadhan Festive.",
  },
  {
    id: "ekskul-olahraga",
    name: "Futsal, Bola Voli, Basket & Senam Kebugaran",
    type: "Pilihan",
    category: "Olahraga",
    schedule: "Selasa & Kamis Sore",
    description: "Pembinaan fisik, turnamen futsal antar kelas, dan persiapan kontingen olahraga sekolah untuk POPDA dan O2SN.",
  },
  {
    id: "ekskul-seni",
    name: "Paduan Suara, Karawitan/Gamelan & Seni Budaya",
    type: "Pilihan",
    category: "Seni & Budaya",
    schedule: "Rabu Sore",
    description: "Olah vokal paduan suara, pelestarian busana adat dan seni budaya Jawa Tengah, serta persiapan lomba FLS2N.",
  },
  {
    id: "ekskul-literasi-p5",
    name: "Sastra Puisi, Literasi & Kewirausahaan Siswa",
    type: "Pilihan",
    category: "Sains & Literasi",
    schedule: "Selasa & Jumat Siang",
    description: "Pembinaan apresiasi sastra baca puisi, public speaking, dan pengembangan kreativitas kewirausahaan pelajar.",
  },
];
