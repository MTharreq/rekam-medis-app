import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const kehamilanFormSchema = z.object({
  generalInformation: z.object({
    noIbu: z.string().max(50).optional(),
    namaLengkap: z.string().min(2, {
      message: 'Nama lengkap harus lebih dari 2 karakter.',
    }),
    namaSuami: z
      .string()
      .min(2, {
        message: 'Nama suami harus lebih dari 2 karakter.',
      })
      .optional(),
    tanggalLahir: z.date({
      required_error: 'A date of birth is required.',
    }),
    umur: z.coerce.number(), //idk why cant use number :/
    alamatDomisili: z.string().optional(),
    rtrw: z.string().optional(),
    desa: z.string().optional(),
    kecamatan: z.string().optional(),
    kabupaten: z.string().optional(),
    provinsi: z.string().optional(),
    pendidikan: z.string().optional(),
    agama: z.string().optional(),
    pekerjaan: z.string().optional(),
    tanggalRegister: z.date({
      required_error: 'A date of birth is required.',
    }),
  }),
  section2: z.object({
    posyandu: z.string().optional(),
    jamkesmas: z.enum(['true', 'false']),
    namaKader: z.string().optional(),
    golDarah: z.enum(['', 'A', 'B', 'AB', 'O']),
    namaDukun: z.string().optional(),
    noTelp: z.string().regex(phoneRegex, 'Invalid Number!').optional(),
    riwayatObstetrik: z.object({
      gravida: z.string().optional(),
      partus: z.string().optional(),
      abortus: z.string().optional(),
      hidup: z.string().optional(),
    }),
    pemeriksaanBidan: z.object({
      tanggalPeriksa: z.date({
        required_error: 'Tanggal periksa is required.',
      }),
      tanggalHPHT: z.date({
        required_error: 'Tanggal HPHT is required.',
      }),
      taksiranPersalinan: z.date({
        required_error: 'Taksiran persalinan is required.',
      }),
      persalinanSebelumnya: z.coerce.number({
        required_error: 'Persalinan sebelumnya is required.',
      }),
      bbSebelumHamil: z.coerce.number().optional(),
      tb: z.coerce.number().optional(),
      bukuKIA: z.string().optional(),
      riwayatKomplikasiKebidanan: z.string().optional(),
      penyakitKronisDanAlergi: z.string().optional(),
    }),
  }),
  rencanaPersalinan: z.array(
    z.object({
      tanggal: z.date().optional(),
      penolong: z.string().optional(),
      tempat: z.string().optional(),
      pendamping: z.string().optional(),
      transportasi: z.string().optional(),
      pendonor: z.string().optional(),
    }),
  ),
  riwayatKehamilan: z.object({
    g: z.string().optional(),
    p: z.string().optional(),
    a: z.string().optional(),
    data: z.array(
      z.object({
        tahun: z.string().optional(),
        jenisKelamin: z.string().optional(),
        hasilPersalinan: z.string().optional(),
        jenisPersalinan: z.string().optional(),
        keadaanSaatLahir: z.string().optional(),
        bbl: z.string().optional(),
        lamaMenyusui: z.string().optional(),
        penolongPersalinan: z.string().optional(),
        penyulit: z.string().optional(),
        keterangan: z.string().optional(),
      }),
    ),
  }),
  persalinan: z.object({
    kalaIAktif: z.object({
      tanggal: z.string().optional(),
      jam: z.string().optional(),
    }),
    kalaII: z.object({
      tanggal: z.string().optional(),
      jam: z.string().optional(),
    }),
    bayiLahir: z.object({
      tanggal: z.string().optional(),
      jam: z.string().optional(),
    }),
    plasentaLahir: z.object({
      tanggal: z.string().optional(),
      jam: z.string().optional(),
    }),
    usiaKehamilan: z.string().optional(),
    usiaHPHT: z.string().optional(),
    keadaanIbu: z.string().optional(),
    keadaanBayi: z.string().optional(),
    beratBayi: z.string().optional(),
    perdarahanKalaIV: z.string().optional(),
    presentasi: z.string().optional(),
    tempat: z.string().optional(),
    penolong: z.string().optional(),
    caraPersalinan: z.string().optional(),
    manajemenAktifKalaIII: z.string().optional(),
    pelayanan: z.string().optional(),
    integrasiProgram: z.string().optional(),
    komplikasi: z.string().optional(),
    dirujukKe: z.string().optional(),
    keadaanTiba: z.string().optional(),
    keadaanPulang: z.string().optional(),
    alamatBersalin: z.string().optional(),
  }),
  pemeriksaanPNC: z.object({
    tanggal: z.string().optional(),
    hariKeKF: z.string().optional(),
    tandaVital: z.object({
      td: z.string().optional(),
      suhu: z.string().optional(),
    }),
    pelayanan: z.object({
      catatDiBukuKIA: z.string().optional(),
      fe: z.string().optional(),
      vitA: z.string().optional(),
    }),
    integrasiProgram: z.object({
      cd4: z.string().optional(),
      antiMalaria: z.string().optional(),
      antiTB: z.string().optional(),
      fotoThorax: z.string().optional(),
    }),
    komplikasi: z.object({
      ppp: z.string().optional(),
      infeksi: z.string().optional(),
      hdk: z.string().optional(),
      lainnya: z.string().optional(),
    }),
    ditujukKe: z.object({
      pkm: z.string().optional(),
      rb: z.string().optional(),
      rsia: z.string().optional(),
      rs: z.string().optional(),
      lainnya: z.string().optional(),
    }),
    keadaan: z.object({
      tiba: z.string().optional(),
      pulang: z.string().optional(),
    }),
  }),
  kunjunganNifas: z.object({
    mal: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    kondom: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    pil: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    suntik: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    akdr: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    inplant: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    mow: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
    mop: z.object({
      rencana: z.string().optional(),
      pelaksanaan: z.string().optional(),
    }),
  }),
  mendeteksiFaktorResikoDanResikoTinggi: z.object({
    faktorResiko: z.object({
      umur: z.enum(['true', 'false']),
      paritas: z.enum(['true', 'false']),
      spasing: z.enum(['true', 'false']),
      bb: z.enum(['true', 'false']),
      tb: z.enum(['true', 'false']),
      sakitKronis: z.enum(['true', 'false']),
      abortus: z.enum(['true', 'false']),
      sc: z.enum(['true', 'false']),
      hpp: z.enum(['true', 'false']),
      bayiBesar: z.enum(['true', 'false']),
      hb: z.enum(['true', 'false']),
    }),
    resikoTinggi: z.object({
      kpd: z.enum(['true', 'false']),
      perdarahan: z.enum(['true', 'false']),
      infeksi: z.enum(['true', 'false']),
      preeklamsi: z.enum(['true', 'false']),
      hb: z.enum(['true', 'false']),
      kelainanLetak: z.enum(['true', 'false']),
      anakBesarHidramnion: z.enum(['true', 'false']),
      ancamanPrematur: z.enum(['true', 'false']),
      infeksiDBD: z.enum(['true', 'false']),
      distocia: z.enum(['true', 'false']),
      terdapat2FaktroResiko: z.enum(['true', 'false']),
    }),
  }),
  resikoTinggi: z.object({
    ditemukanTanggal: z.string().optional(),
    jenisResiko: z.string().optional(),
  }),
});

// This can come from your database or API.
export const defaultValues: Partial<z.infer<typeof kehamilanFormSchema>> = {
  generalInformation: {
    noIbu: '',
    namaLengkap: 'Firda', //DELETE THIS
    namaSuami: 'Hilmy', //DELETE THIS
    tanggalLahir: new Date('1999-1-1'),
    umur: 0,
    alamatDomisili: '',
    rtrw: '',
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    pendidikan: '',
    agama: '',
    pekerjaan: '',
    tanggalRegister: new Date(),
  },
  section2: {
    posyandu: '',
    jamkesmas: 'true',
    namaKader: '',
    golDarah: '',
    namaDukun: '',
    noTelp: '08123456789',
    riwayatObstetrik: {
      gravida: '',
      partus: '',
      abortus: '',
      hidup: '',
    },
    pemeriksaanBidan: {
      tanggalPeriksa: new Date(),
      tanggalHPHT: new Date(),
      taksiranPersalinan: new Date(),
      persalinanSebelumnya: 1999,
      bbSebelumHamil: 0,
      tb: 0,
      // bukuKIA: '', (Tidak perlu default value based on shadcn)
      riwayatKomplikasiKebidanan: '',
      penyakitKronisDanAlergi: '',
    },
  },
  rencanaPersalinan: [
    {
      tanggal: new Date(),
      penolong: '',
      tempat: '',
      pendamping: '',
      transportasi: '',
      pendonor: '',
    },
  ],
  riwayatKehamilan: {
    g: '',
    p: '',
    a: '',
    data: [
      {
        tahun: '',
        jenisKelamin: '',
        hasilPersalinan: '',
        jenisPersalinan: '',
        keadaanSaatLahir: '',
        bbl: '',
        lamaMenyusui: '',
        penolongPersalinan: '',
        penyulit: '',
        keterangan: '',
      },
    ],
  },
  persalinan: {
    kalaIAktif: {
      tanggal: '',
      jam: '',
    },
    kalaII: {
      tanggal: '',
      jam: '',
    },
    bayiLahir: {
      tanggal: '',
      jam: '',
    },
    plasentaLahir: {
      tanggal: '',
      jam: '',
    },
    usiaKehamilan: '',
    usiaHPHT: '',
    keadaanIbu: '',
    keadaanBayi: '',
    beratBayi: '',
    perdarahanKalaIV: '',
    presentasi: '',
    tempat: '',
    penolong: '',
    caraPersalinan: '',
    manajemenAktifKalaIII: '',
    pelayanan: '',
    integrasiProgram: '',
    komplikasi: '',
    dirujukKe: '',
    keadaanTiba: '',
    keadaanPulang: '',
    alamatBersalin: '',
  },
  pemeriksaanPNC: {
    tanggal: '',
    hariKeKF: '',
    tandaVital: {
      td: '',
      suhu: '',
    },
    pelayanan: {
      catatDiBukuKIA: '',
      fe: '',
      vitA: '',
    },
    integrasiProgram: {
      cd4: '',
      antiMalaria: '',
      antiTB: '',
      fotoThorax: '',
    },
    komplikasi: {
      ppp: '',
      infeksi: '',
      hdk: '',
      lainnya: '',
    },
    ditujukKe: {
      pkm: '',
      rb: '',
      rsia: '',
      rs: '',
      lainnya: '',
    },
    keadaan: {
      tiba: '',
      pulang: '',
    },
  },
  kunjunganNifas: {
    mal: {
      rencana: '',
      pelaksanaan: '',
    },
    kondom: {
      rencana: '',
      pelaksanaan: '',
    },
    pil: {
      rencana: '',
      pelaksanaan: '',
    },
    suntik: {
      rencana: '',
      pelaksanaan: '',
    },
    akdr: {
      rencana: '',
      pelaksanaan: '',
    },
    inplant: {
      rencana: '',
      pelaksanaan: '',
    },
    mow: {
      rencana: '',
      pelaksanaan: '',
    },
    mop: {
      rencana: '',
      pelaksanaan: '',
    },
  },
  mendeteksiFaktorResikoDanResikoTinggi: {
    faktorResiko: {
      umur: 'false',
      paritas: 'false',
      spasing: 'false',
      bb: 'false',
      tb: 'false',
      sakitKronis: 'false',
      abortus: 'false',
      sc: 'false',
      hpp: 'false',
      bayiBesar: 'false',
      hb: 'false',
    },
    resikoTinggi: {
      kpd: 'false',
      perdarahan: 'false',
      infeksi: 'false',
      preeklamsi: 'false',
      hb: 'false',
      kelainanLetak: 'false',
      anakBesarHidramnion: 'false',
      ancamanPrematur: 'false',
      infeksiDBD: 'false',
      distocia: 'false',
      terdapat2FaktroResiko: 'false',
    },
  },
  resikoTinggi: {
    ditemukanTanggal: '',
    jenisResiko: '',
  },
};
