const info = {
  id: 1,
  nama_aplikasi: 'Aplikasi Presensi',
  nama_singkat_aplikasi: 'Presensi',
  logo: 'http://103.100.27.59/storage/gambar/logo/e7de10be-f01a-4b96-9921-59376b3b9f63.png',
  daerah: 'Global Intermedia',
  deskripsi: 'Aplikasi untuk presensi',
  warna: '#ffffff',
  koordinat: [
    {
      id: 1,
      urai_lokasi: 'Gedung A',
      koordinat: '-7.813111492789422, 110.37669583357997',
    },
    {
      id: 2,
      urai_lokasi: 'Gedung B',
      koordinat: '-7.813111492789422, 110.37669583357997',
    },
  ],
  waktu_lokal: '+8',
  today: 'Selasa, 17 Oktober 2023',
};

//Presensi aksi
//tambah parameter id gedung

const login_result = {
  status: true,
  user: {
    id: 14,
    name: 'Test User',
    username: '123456',
    email: 'tes@gmail.com',
    email_verified_at: null,
    created_at: '2023-10-03T06:32:00.000000Z',
    updated_at: '2023-10-03T06:32:00.000000Z',
    deleted_at: null,
    kodeakses: 8,
    foto: null,
    kodeskpd: null,
    waktu_masuk: '08:00',
    waktu_keluar: '17:00',
  },
  token: 'ZZ5sIGUvLsnqVQ3QYJR3XW5mlZ5LL6JmwJqPlEIr',
  message: 'Login Berhasil',
};

const user_info = {
  id: 14,
  name: 'Test User',
  username: '123456',
  email: 'tes@gmail.com',
  email_verified_at: null,
  created_at: '2023-10-03T06:32:00.000000Z',
  updated_at: '2023-10-03T06:32:00.000000Z',
  deleted_at: null,
  kodeakses: 8,
  foto: null,
  kodeskpd: null,
  waktu_masuk: '08:00',
  waktu_keluar: '17:00',
};
//cek keterlamnatan
//post token

const terlambat = {
  terlambat: true,
  durasi: +5,
  message: 'Anda terlambat 5 menit',
};

const belum = {
  terlambat: false,
  durasi: -5,
  message: '5 menit sebelum terlambat',
};

const siang = {
  terlambat: false,
  durasi: null,
  message: 'Selamat berkerja.',
};

const malam = {
  terlambat: false,
  durasi: null,
  message: 'Selamat istirahat.',
};

const libur = {
  terlambat: false,
  durasi: null,
  message: 'Selamat berlibur.',
};

//RIWAYAT
const riwayat = {
  total: 13,
  data: [
    {
      id: 23,
      tipe: 2,
      foto: '3d8c1fa0-ff5f-452d-9a21-20e3967b6844.jpg',
      koordinat: '-7.863937072618491, 110.35698928267081',
      keterangan: 'Ini keterangan',
      created_at: '2023-10-19T04:44:43.000000Z',
      updated_at: '2023-10-19T04:44:43.000000Z',
      terlambat: null,
      created_by: 14,
      updated_by: null,
    },
  ],
};

const riwayat_terlambat = {
  total: 13,
  data: [
    {
      id: 23,
      tipe: 2,
      foto: '3d8c1fa0-ff5f-452d-9a21-20e3967b6844.jpg',
      koordinat: '-7.863937072618491, 110.35698928267081',
      keterangan: 'Ini keterangan',
      created_at: '2023-10-19T04:44:43.000000Z',
      updated_at: '2023-10-19T04:44:43.000000Z',
      terlambat: +5,
      created_by: 14,
      updated_by: null,
    },
  ],
};
