const tombolHitung = document.getElementById("btn-hitung");


tombolHitung.addEventListener("click", function(){

    // ambil data input
    let namaBahan = document.getElementById("nama-bahan").value;

    let hargaBeli = document.getElementById("harga-bahan").value;

    let kapasitas = document.getElementById("kapasitas-bahan").value;

    let pemakaian = document.getElementById("jumlah-bahan").value;


    // ubah string menjadi angka
    hargaBeli = Number(hargaBeli);
    kapasitas = Number(kapasitas);
    pemakaian = Number(pemakaian);


    // hitung HPP bahan
    let hargaSatuan = hargaBeli / kapasitas;

    let biayaBahan = hargaSatuan * pemakaian;


    // tampilkan hasil
    document.getElementById("total").innerHTML =
    "Rp " + biayaBahan.toLocaleString("id-ID");


});