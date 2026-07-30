// ============================================
// Kalkulator HPP — logic tambah bahan & hitung
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const daftarBahan = document.getElementById('daftar-bahan');
  const btnTambah = document.getElementById('btn-tambah');
  const btnHitung = document.getElementById('btn-hitung');
  const inputJumlahProduk = document.getElementById('jumlah-produk');
  const elTotal = document.getElementById('total');
  const elHpp = document.getElementById('nilai-hpp');
  const hasilSection = document.querySelector('.hasil-hpp');

  // Faktor konversi ke satuan dasar (gram / mili)
  const FAKTOR_SATUAN = {
    gram: 1,
    mili: 1,
    kilo: 1000,
    liter: 1000,
  };

  function formatRupiah(angka) {
    const bulat = Math.round(angka || 0);
    return 'Rp ' + bulat.toLocaleString('id-ID');
  }

  function buatBarisBahan() {
    const barisPertama = daftarBahan.querySelector('.item-bahan');
    const barisBaru = barisPertama.cloneNode(true);

    // kosongkan input pada baris baru
    barisBaru.querySelectorAll('input').forEach((input) => (input.value = ''));
    barisBaru.querySelector('select').selectedIndex = 0;

    // tambahkan tombol hapus jika belum ada
    if (!barisBaru.querySelector('.btn-hapus-bahan')) {
      const btnHapus = document.createElement('button');
      btnHapus.type = 'button';
      btnHapus.className = 'btn-hapus-bahan';
      btnHapus.textContent = 'Hapus';
      barisBaru.appendChild(btnHapus);
    }

    daftarBahan.appendChild(barisBaru);
  }

  // Hapus baris bahan (event delegation, supaya baris baru juga ikut ter-handle)
  daftarBahan.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-hapus-bahan')) {
      const semuaBaris = daftarBahan.querySelectorAll('.item-bahan');
      if (semuaBaris.length > 1) {
        e.target.closest('.item-bahan').remove();
      }
    }
  });

  function hitungHPP() {
    const semuaBaris = daftarBahan.querySelectorAll('.item-bahan');
    let totalModal = 0;

    semuaBaris.forEach((baris) => {
      const harga = parseFloat(baris.querySelector('.harga-bahan').value) || 0;
      const kapasitas = parseFloat(baris.querySelector('.kapasitas-bahan').value) || 0;
      const satuan = baris.querySelector('.satuan-bahan').value;
      const pemakaian = parseFloat(baris.querySelector('.jumlah-bahan').value) || 0;

      if (kapasitas <= 0) return; // lewati baris yang belum lengkap

      const faktor = FAKTOR_SATUAN[satuan] || 1;
      const kapasitasDasar = kapasitas * faktor; // dikonversi ke gram/mili
      const hargaPerSatuanDasar = harga / kapasitasDasar;

      totalModal += hargaPerSatuanDasar * pemakaian;
    });

    const jumlahProduk = parseFloat(inputJumlahProduk.value) || 1;
    const hppPerProduk = totalModal / jumlahProduk;

    elTotal.textContent = formatRupiah(totalModal);
    elHpp.textContent = formatRupiah(hppPerProduk);

    // trigger ulang animasi "cetak struk"
    hasilSection.classList.remove('dihitung');
    void hasilSection.offsetWidth; // reflow supaya animasi restart
    hasilSection.classList.add('dihitung');
  }

  btnTambah.addEventListener('click', buatBarisBahan);
  btnHitung.addEventListener('click', hitungHPP);
});
