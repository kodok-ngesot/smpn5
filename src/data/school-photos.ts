export interface SchoolPhoto {
  id: string;
  src: string;
  title: string;
  category:
    | "Gelar Karya P5 & Kewirausahaan"
    | "Upacara & Kepemimpinan OSIS"
    | "Ramadhan Festive & Sosial"
    | "Seni Budaya & Literasi"
    | "Olahraga & Kesiswaan"
    | "Kegiatan Guru & DWP";
  caption: string;
  locationLabel: string;
  isPlaceholder: boolean;
}

export const schoolPhotos: SchoolPhoto[] = [
  {
    id: "foto-p5-kewirausahaan",
    src: "/images/school/real-p5-kewirausahaan.jpg",
    title: "Gelar Karya P5 Tema Kewirausahaan Bersama Kepala Sekolah",
    category: "Gelar Karya P5 & Kewirausahaan",
    caption:
      "Kepala SMPN 5 Purbalingga, Bapak Slamet Sriyanto, bersama guru dan siswi memamerkan produk olahan pangan dan minuman hasil Projek Penguatan Profil Pelajar Pancasila (P5) Tema Kewirausahaan.",
    locationLabel: "Panggung Utama SMPN 5 Purbalingga",
    isPlaceholder: false,
  },
  {
    id: "foto-upacara-bendera",
    src: "/images/school/real-upacara-bendera.jpg",
    title: "Khidmat Pengibaran Bendera Merah Putih",
    category: "Upacara & Kepemimpinan OSIS",
    caption:
      "Pasukan Pengibar Bendera (Paskibra) SMPN 5 Purbalingga melaksanakan tugas pengibaran bendera Merah Putih dengan tertib dan disiplin pada upacara hari Senin.",
    locationLabel: "Lapangan Upacara SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-bazar-p5-8g",
    src: "/images/school/real-bazar-p5-8g.jpg",
    title: "Tinjauan Stand Bazar Kuliner Siswa Kelas 8G",
    category: "Gelar Karya P5 & Kewirausahaan",
    caption:
      "Kepala Sekolah memberikan apresiasi kepada siswa-siswi kelas 8G yang menyajikan kreasi Es Lumut, Cheese Roll, dan jajanan sehat pada kegiatan Bazar P5.",
    locationLabel: "Halaman Bazar Sekolah",
    isPlaceholder: false,
  },
  {
    id: "foto-upz-zakat",
    src: "/images/school/real-upz-zakat.jpg",
    title: "Unit Pengumpul Zakat (UPZ) & Ramadhan Festive",
    category: "Ramadhan Festive & Sosial",
    caption:
      "Kepala Sekolah bersama perwakilan siswa-siswi menunjukkan paket beras zakat fitrah yang dihimpun melalui Unit Pengumpul Zakat (UPZ) SMP Negeri 5 Purbalingga.",
    locationLabel: "Selasar UPZ SMPN 5 Purbalingga",
    isPlaceholder: false,
  },
  {
    id: "foto-ldk-osis",
    src: "/images/school/real-ldk-osis.jpg",
    title: "Latihan Dasar Kepemimpinan (LDK) Pengurus OSIS",
    category: "Upacara & Kepemimpinan OSIS",
    caption:
      "Kegiatan Latihan Dasar Kepemimpinan (LDK) OSIS SMP Negeri 5 Purbalingga untuk membentuk generasi yang berkarakter Profil Pelajar Pancasila dan berakhlak mulia.",
    locationLabel: "Ruang Laboratorium & Pelatihan",
    isPlaceholder: false,
  },
  {
    id: "foto-juara-futsal",
    src: "/images/school/real-juara-futsal.jpg",
    title: "Penyerahan Piala Juara Turnamen Futsal Antar Kelas",
    category: "Olahraga & Kesiswaan",
    caption:
      "Tim juara turnamen futsal putra menerima piala kejuaraan didampingi oleh bapak dan ibu guru pembina olahraga pada puncak kegiatan classmeeting.",
    locationLabel: "Lapangan Olahraga SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-kartini-fashion",
    src: "/images/school/real-kartini-fashion.jpg",
    title: "Parade Busana Adat & Kebaya Peringatan Hari Kartini",
    category: "Seni Budaya & Literasi",
    caption:
      "Siswi-siswi beserta ibu guru tampil anggun mengenakan busana kebaya dan kain batik tradisional di lapangan utama dalam rangka melestarikan budaya nasional.",
    locationLabel: "Lapangan Utama SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-senam-bersama",
    src: "/images/school/real-senam-bersama.jpg",
    title: "Gebyar Senam Pagi Bersama Seluruh Warga Sekolah",
    category: "Olahraga & Kesiswaan",
    caption:
      "Ratusan peserta didik kelas VII, VIII, dan IX mengikuti kegiatan senam kebugaran jasmani pagi secara serentak di lapangan utama SMPN 5 Purbalingga.",
    locationLabel: "Lapangan Basket & Voli",
    isPlaceholder: false,
  },
  {
    id: "foto-pelepasan-siswa",
    src: "/images/school/real-pelepasan-siswa.jpg",
    title: "Persembahan Paduan Suara 'Terimakasihku' Pelepasan Siswa",
    category: "Seni Budaya & Literasi",
    caption:
      "Penampilan haru siswa-siswi kelas IX menyanyikan lagu Terimakasihku di panggung utama sebagai ungkapan syukur dan penghormatan kepada bapak serta ibu guru.",
    locationLabel: "Panggung Wisuda & Pelepasan",
    isPlaceholder: false,
  },
  {
    id: "foto-zakat-1",
    src: "/images/school/real-zakat-1.jpg",
    title: "Penyaluran Zakat Fitrah kepada Warga Sekitar Sekolah",
    category: "Ramadhan Festive & Sosial",
    caption:
      "Perwakilan pengurus OSIS menyerahkan secara langsung paket beras zakat fitrah kepada warga masyarakat dan pekerja di sekitar lingkungan Kelurahan Bancar.",
    locationLabel: "Gerbang Utama Jl. Letjend S. Parman",
    isPlaceholder: false,
  },
  {
    id: "foto-zakat-2",
    src: "/images/school/real-zakat-2.jpg",
    title: "Berbagi Kebahagiaan di Bulan Suci Ramadhan",
    category: "Ramadhan Festive & Sosial",
    caption:
      "Siswi SMPN 5 Purbalingga menyalurkan amanah zakat fitrah dalam rangkaian kegiatan Ramadhan Festive (Tadarus Al-Qur'an, Zakat Fitrah, dan Bakti Sosial).",
    locationLabel: "Gerbang Depan SMPN 5 Purbalingga",
    isPlaceholder: false,
  },
  {
    id: "foto-bazar-paguyuban",
    src: "/images/school/real-bazar-paguyuban.jpg",
    title: "Sinergi Paguyuban Orang Tua pada Bazar Sekolah",
    category: "Gelar Karya P5 & Kewirausahaan",
    caption:
      "Kolaborasi hangat antara Kepala Sekolah dan Paguyuban Orang Tua/Wali Murid yang turut meramaikan stand kuliner tradisional pada acara gelar karya sekolah.",
    locationLabel: "Area Stand Paguyuban",
    isPlaceholder: false,
  },
  {
    id: "foto-pembina-upacara",
    src: "/images/school/real-pembina-upacara.jpg",
    title: "Amanat Pembina Upacara & Barisan Dewan Guru",
    category: "Upacara & Kepemimpinan OSIS",
    caption:
      "Ibu guru pembina upacara menyampaikan amanat penguatan disiplin dan motivasi belajar, diikuti dengan khidmat oleh jajaran dewan guru berseragam KORPRI dan seluruh siswa.",
    locationLabel: "Lapangan Upacara SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-gerbang-5s",
    src: "/images/school/real-gerbang-5s.jpg",
    title: "Budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) di Gerbang Sekolah",
    category: "Upacara & Kepemimpinan OSIS",
    caption:
      "Pengurus OSIS dan tim penegak disiplin menyambut kedatangan rekan-rekan siswa di gerbang depan SMPN 5 Purbalingga yang berpredikat Sekolah Ramah Anak.",
    locationLabel: "Gerbang Sekolah Ramah Anak",
    isPlaceholder: false,
  },
  {
    id: "foto-literasi-puisi-1",
    src: "/images/school/real-literasi-puisi-1.jpg",
    title: "Lomba Baca Puisi & Apresiasi Sastra Siswa",
    category: "Seni Budaya & Literasi",
    caption:
      "Penampilan siswi membacakan puisi dengan penuh penghayatan di hadapan warga sekolah, berlatar tugu nilai karakter Keimanan, Keteladanan, dan Ketertiban.",
    locationLabel: "Lapangan Utama SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-literasi-puisi-2",
    src: "/images/school/real-literasi-puisi-2.jpg",
    title: "Ekspresi Literasi di Lapangan Berlogo SMP Negeri 5",
    category: "Seni Budaya & Literasi",
    caption:
      "Siswi unjuk keberanian dan keterampilan berbicara di depan umum melalui pembacaan karya sastra di tengah lapangan utama berlogo resmi SMP Negeri 5 Purbalingga.",
    locationLabel: "Lapangan Utama SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-peragaan-kebaya",
    src: "/images/school/real-peragaan-kebaya.jpg",
    title: "Lomba Peragaan Busana Tradisional Antar Kelas",
    category: "Seni Budaya & Literasi",
    caption:
      "Peserta nomor urut 1 memperagakan busana kebaya beludru merah marun dan jarik batik di atas karpet peragaan pada lomba peringatan hari besar nasional.",
    locationLabel: "Arena Catwalk Lapangan Sekolah",
    isPlaceholder: false,
  },
  {
    id: "foto-tadarus-lapangan",
    src: "/images/school/real-tadarus-lapangan.jpg",
    title: "Kegiatan Pembinaan Rohani & Tadarus Pagi Bersama",
    category: "Ramadhan Festive & Sosial",
    caption:
      "Seluruh siswa-siswi berkumpul dengan tertib di lapangan sekolah untuk mengikuti doa pagi, tausiyah keagamaan, dan gerakan tadarus Al-Qur'an bersama.",
    locationLabel: "Lapangan Utama SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-classmeeting-lomba",
    src: "/images/school/real-classmeeting-lomba.jpg",
    title: "Keseruan Lomba Ketangkasan & Kerja Sama Regu Classmeeting",
    category: "Olahraga & Kesiswaan",
    caption:
      "Suasana ceria para siswi mengikuti lomba estafet ketangkasan di koridor taman sekolah untuk mempererat kekompakan antar kelas seusai pekan ujian semester.",
    locationLabel: "Koridor Taman Kelas",
    isPlaceholder: false,
  },
  {
    id: "foto-senam-guru-siswa",
    src: "/images/school/real-senam-guru-siswa.jpg",
    title: "Senam Sehat Bersama Dewan Guru dan Peserta Didik",
    category: "Olahraga & Kesiswaan",
    caption:
      "Ibu-ibu guru turut berbaur memimpin gerakan senam pagi bersama para siswa di bawah sinar matahari pagi untuk menjaga kebugaran warga sekolah.",
    locationLabel: "Halaman Olahraga Sekolah",
    isPlaceholder: false,
  },
  {
    id: "foto-senam-instruktur",
    src: "/images/school/real-senam-instruktur.jpg",
    title: "Pemandu Gerakan Senam & Semangat Pagi Siswa",
    category: "Olahraga & Kesiswaan",
    caption:
      "Antusiasme dan senyum ceria peserta didik mengikuti irama gerakan senam pagi yang dipandu dari podium lapangan utama.",
    locationLabel: "Lapangan Utama SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-osis-gerbang",
    src: "/images/school/real-osis-gerbang.jpg",
    title: "Kebersamaan Pengurus OSIS & Kader Disiplin Sekolah",
    category: "Upacara & Kepemimpinan OSIS",
    caption:
      "Potret kebersamaan siswa-siswi pengurus OSIS dan petugas piket gerbang usai melaksanakan tugas pagi penyambutan siswa.",
    locationLabel: "Gerbang Utama SMPN 5",
    isPlaceholder: false,
  },
  {
    id: "foto-dwp-penghargaan",
    src: "/images/school/real-dwp-penghargaan.jpg",
    title: "Penyerahan Piagam Dharma Wanita Persatuan (DWP) Dindikbud",
    category: "Kegiatan Guru & DWP",
    caption:
      "Jajaran pengurus Dharma Wanita Persatuan (DWP) unit SMPN 5 Purbalingga menerima cendera mata dan apresiasi dari DWP Dinas Pendidikan dan Kebudayaan Kabupaten Purbalingga.",
    locationLabel: "Ruang Tamu & Pertemuan DWP",
    isPlaceholder: false,
  },
  {
    id: "foto-dwp-sosialisasi",
    src: "/images/school/real-dwp-sosialisasi.jpg",
    title: "Partisipasi Aktif pada Raker & Sosialisasi AD/ART DWP Kab. Purbalingga",
    category: "Kegiatan Guru & DWP",
    caption:
      "Keikutsertaan perwakilan Dharma Wanita Persatuan dalam Rapat Kerja dan Sosialisasi AD/ART dalam rangka HUT DWP Kabupaten Purbalingga.",
    locationLabel: "Aula Pertemuan DWP Purbalingga",
    isPlaceholder: false,
  },
  {
    id: "foto-kriya-konektor",
    src: "/images/school/real-kriya-konektor.jpg",
    title: "Keterampilan Kriya Rajut & Pembuatan Konektor Masker",
    category: "Kegiatan Guru & DWP",
    caption:
      "Kreativitas anggota Dharma Wanita dan pendidik dalam memproduksi hasil karya rajutan tangan yang dipamerkan dengan latar perangkat gamelan sekolah.",
    locationLabel: "Ruang Seni & Gamelan Sekolah",
    isPlaceholder: false,
  },
];
