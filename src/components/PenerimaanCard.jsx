import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6 flex flex-col items-center text-white font-sans">
      <div className="mt-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">SISTEM PENERIMAAN MURID BARU 2025</h1>
        <h2 className="text-xl sm:text-2xl mt-2">SMA NEGERI 10 PONTIANAK</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-6xl px-4">
        {/* Jalur Afirmasi */}
        <div className="bg-white text-black p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
          <h3 className="text-lg font-bold text-blue-700 mb-2">JALUR AFIRMASI</h3>
          <p className="text-sm font-semibold">16 - 17 JUNI 2025</p>
          <p className="mt-2 text-sm">AFIRMASI 30%<br />107 SISWA</p>
          <p className="text-xs mt-2 text-gray-600 italic">*Sudah termasuk penyandang disabilitas sebesar 2%</p>
        </div>

        {/* Jalur Mutasi */}
        <div className="bg-white text-black p-6 rounded-xl shadow-lg border-t-4 border-green-600">
          <h3 className="text-lg font-bold text-green-700 mb-2">JALUR MUTASI</h3>
          <p className="text-sm font-semibold">16 - 17 JUNI 2025</p>
          <p className="mt-2 text-sm">MUTASI 5%<br />18 SISWA</p>
          <p className="text-xs mt-2 text-gray-600 italic">*Anak guru 2 siswa<br />18 - 2 = 16 SISWA</p>
        </div>

        {/* Jalur Domisili */}
        <div className="bg-white text-black p-6 rounded-xl shadow-lg border-t-4 border-purple-600">
          <h3 className="text-lg font-bold text-purple-700 mb-2">JALUR DOMISILI</h3>
          <p className="text-sm font-semibold">24 - 26 JUNI 2025</p>
          <p className="mt-2 text-sm">DOMISILI 35%<br />126 SISWA</p>
        </div>

        {/* Jalur Prestasi */}
        <div className="bg-white text-black p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
          <h3 className="text-lg font-bold text-yellow-600 mb-2">JALUR PRESTASI</h3>
          <p className="text-sm font-semibold">7 - 9 JULI 2025</p>
          <p className="mt-2 text-sm">PRESTASI 30%<br />108 SISWA</p>
        </div>
      </div>

      {/* Footer (Optional) */}
      <div className="mt-16 text-xs text-white opacity-70">
        www.sman10-ptk.sch.id | @sman10ptk.official | Smanpul Pontianak
      </div>
    </div>
  );
};

export default PenerimaanCard;
