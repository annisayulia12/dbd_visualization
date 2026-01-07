import nyamukImg from "../assets/nyamuk.jpg"; 

export default function Infromation() {
  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <img
          src={nyamukImg}
          alt="Ilustrasi Nyamuk"
          className="w-60 h-auto"
        />
        <div>
          <h1 className="text-4xl font-bold text-red-600">
            Informasi Demam Berdarah (DBD)
          </h1>
          <p className=" text-gray-600 mt-2 max-w-xl">
            Mengenal, mencegah, dan mengendalikan demam berdarah dengue di
            Kabupaten Bojonegoro.
          </p>
        </div>
      </div>

      {/* Apa itu DBD */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Apa itu Demam Berdarah?</h2>
        <p className="text-gray-700 leading-relaxed">
          Demam berdarah dengue (DBD) adalah penyakit infeksi yang disebabkan oleh virus dengue dan ditularkan melalui gigitan nyamuk Aedes aegypti atau Aedes albopictus. 
          Penyakit ini umum terjadi di daerah tropis dan subtropis di seluruh dunia.
          Gejala utama DBD meliputi demam tinggi yang mendadak, disertai gejala menyerupai flu, 
          seperti nyeri otot, nyeri sendi, sakit kepala, dan ruam kulit.
          Pada kasus DBD berat, dapat terjadi perdarahan spontan, kebocoran plasma, 
          hingga syok akibat penurunan tekanan darah yang signifikan (dengue shock syndrome), yang berpotensi mengancam nyawa.
          Setiap tahunnya, jutaan kasus DBD dilaporkan di seluruh dunia, dengan insidensi tertinggi di Asia Tenggara, 
          Kepulauan Pasifik Barat, Amerika Latin, dan Afrika.
          Dalam beberapa tahun terakhir, DBD juga mulai ditemukan di wilayah baru, 
          termasuk beberapa negara di Eropa dan bagian selatan Amerika Serikat.
          Pencegahan terbaik terhadap infeksi virus dengue adalah dengan menghindari gigitan nyamuk, 
          menggunakan kelambu, serta melakukan upaya pengendalian vektor, seperti menguras, menutup, 
          dan mendaur ulang tempat penampungan air guna mengurangi populasi nyamuk penyebar virus.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Penyebab</h2>
        <p className="text-gray-700 leading-relaxed">
          Penyebab DBD adalah virus dengue yang ditularkan kepada manusia melalui nyamuk Aedes aegypti. 
          Ketika nyamuk tersebut menggigit manusia, virus masuk ke dalam tubuh manusia. 
          Nyamuk Aedes aegypti umumnya berukuran kecil dengan tubuh berwarna hitam pekat, 
          memiliki dua garis vertikal putih di punggung dan garis-garis putih horizontal pada kaki. 
          Nyamuk ini aktif terutama pada pagi hingga sore hari, meskipun kadang-kadang mereka juga menggigit pada malam hari. 
          Mereka lebih sering ditemukan di dalam rumah yang gelap dan sejuk dibandingkan di luar rumah yang panas.
          Faktor risiko seseorang terkena demam berdarah dengue antara lain tinggal atau bepergian ke daerah tropis. 
          Tinggal atau berada di daerah tropis dan subtropis meningkatkan risiko terkena virus dengue.
          Daerah yang berisiko meliputi Asia Tenggara, pulau-pulau di Pasifik Barat, Amerika Latin, dan Afrika. 
          Selain itu, memiliki riwayat terinfeksi virus dengue sebelumnya juga meningkatkan risiko mengalami gejala yang lebih parah ketika terkena DBD. 
          Usia di bawah 15 tahun juga memiliki risiko lebih tinggi terkena demam dengue dan demam berdarah dengue.
        </p>
      </section>

      {/* Gejala */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Gejala DBD</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 text-center border rounded-lg shadow">
            <span className="text-3xl">🤒</span>
            <h3 className="text-lg font-semibold">Demam Tinggi</h3>
            <p className="mt-2 font-medium text-justify">
              Suhu hingga 39–40°C.
              <br />Berlangsung terus-menerus selama 2-7 hari dan turun dengan cepat.
            </p>
          </div>

          <div className="p-4 text-center border rounded-lg shadow">
            <span className="text-3xl">🤕</span>
            <h3 className="text-lg font-semibold">Nyeri Otot dan Sendi</h3>
            <p className="mt-2 font-medium text-justify">
              Pegal-pegal hebat, terutama di punggung, lutut, atau bahu.
              <br />Disertai sakit kepala berat.
            </p>
          </div>
          <div className="p-4 text-center border rounded-lg shadow">
            <span className="text-3xl">🩸</span>
            <h3 className="text-lg font-semibold">Ruam atau Bintik Merah</h3>
            <p className="mt-2 font-medium text-justify">
              Bintik-bintik kecil akibat pendarahan di bawah kulit (petechiae).
              <br />Muncul di wajah, leher, dada, lalu menyebar ke lengan dan kaki.
            </p>
          </div>
          <div className="p-4 text-center border rounded-lg shadow">
            <span className="text-3xl">🤢</span>
            <h3 className="text-lg font-semibold">Mual, Muntah, dan Nafsu Makan Menurun</h3>
            <p className="mt-2 font-medium text-justify">
              Seperti sakit maag atau keracunan makanan.
              <br />Sering terjadi pada pada fase awal penyakit
            </p>
          </div>
        </div>
      </section>

      {/* Pencegahan */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Pencegahan (3M Plus)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 text-center border rounded-lg shadow bg-green-50">
            <span className="text-3xl">💧</span>
            <h3 className="text-lg font-semibold">Menguras</h3>
            <p className="mt-2 font-medium text-justify">
              Membersihkan dan menguras penampungan air
              <br />Gosok dan bersihkan semua dinding bak hingga bersih
            </p>
          </div>
          <div className="p-4 text-center border rounded-lg shadow bg-green-50">
            <span className="text-3xl">🚪</span>
            <h3 className="text-lg font-semibold">Menutup</h3>
            <p className="mt-2 font-medium text-justify">
              Tutup rapat-rapat semua tempat penampungan air.
              <br />Kubur barang-barang bekas di dalam tanah.
            </p>
          </div>
          <div className="p-4 text-center border rounded-lg shadow bg-green-50">
            <span className="text-3xl">♻️</span>
            <h3 className="text-lg font-semibold">Mendaur Ulang</h3>
            <p className="mt-2 font-medium text-justify">
              Memanfaatkan kembali barang-barang bekas yang bernilai ekonomis
              <br />Buang barang-barang yang tidak terpakai ke tempat sampah.
            </p>
          </div>
          <div className="p-4 text-center border rounded-lg shadow bg-green-50">
            <span className="text-3xl">🦟</span>
            <h3 className="text-lg font-semibold">Hindari Gigitan Nyamuk</h3>
            <p className="mt-2 font-medium text-justify">
              Menggunakan lotion dan obat nyamuk
              <br />Memasang kasa pada jendela dan kelambu
              <br />mengenakan pakaian lengan panjang dan celana panjang
              <br />Memanfaatkan kipas angin dan menanam tanaman pengusir nyamuk
            </p>
          </div>
        </div>
      </section>

      {/* Data Lokal */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Situasi DBD di Bojonegoro</h2>
        <p className="text-gray-700 leading-relaxed">
          Pantau data kasus, grafik, dan peta risiko demam berdarah di halaman{" "}
          <a href="/peta" className="text-blue-600 font-medium">
            Peta
          </a>{" "}
          dan <a href="/grafik" className="text-blue-600 font-medium">
            Grafik
          </a>{" "}
          untuk informasi terbaru.
        </p>
      </section>
    </div>
  );
}
