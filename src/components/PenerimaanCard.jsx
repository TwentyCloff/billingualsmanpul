import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#001F3F] via-[#41729F] to-[#E1F1FF] text-white p-6 flex flex-col items-center font-sans">
      {/* TITLE */}
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase relative inline-block">
          Sistem Penerimaan Murid Baru 2025
          <span className="block w-full h-1 mt-2 bg-gradient-to-r from-cyan-400 to-blue-300 rounded-full shadow-lg" />
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-blue-100 font-medium">
          SMA Negeri 10 Pontianak
        </p>
      </div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4 mt-10">
        {/* CARD TEMPLATE */}
        {[
          {
            title: "Jalur Afirmasi",
            date: "16 - 17 Juni 2025",
            percent: "30%",
            quota: "107 Siswa",
            note: "*Sudah termasuk penyandang disabilitas sebesar 2%",
            border: "from-blue-500 to-cyan-400",
          },
          {
            title: "Jalur Mutasi",
            date: "16 - 17 Juni 2025",
            percent: "5%",
            quota: "18 Siswa",
            note: "*Anak Guru 2 Siswa\n18 - 2 = 16 Siswa",
            border: "from-green-400 to-teal-300",
          },
          {
            title: "Jalur Domisili",
            date: "24 - 26 Juni 2025",
            percent: "35%",
            quota: "126 Siswa",
            note: "",
            border: "from-purple-500 to-pink-400",
          },
          {
            title: "Jalur Prestasi",
            date: "7 - 9 Juli 2025",
            percent: "30%",
            quota: "108 Siswa",
            note: "",
            border: "from-yellow-400 to-orange-300",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-blue-200 hover:shadow-blue-300 transition-all duration-300`}
          >
            <div
              className={`text-center p-1 mb-4 bg-gradient-to-r ${item.border} text-lg font-bold rounded-full shadow`}
            >
              {item.title}
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-blue-100">{item.date}</p>
              <p className="text-xl font-bold text-white">{item.percent}</p>
              <p className="text-base text-blue-200 font-semibold">{item.quota}</p>
              {item.note && (
                <p className="text-xs text-blue-100 mt-2 whitespace-pre-line italic">{item.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-16 text-sm text-blue-200 opacity-70 text-center">
        www.sman10-ptk.sch.id <br />
        @sman10ptk.official — Smanpul Pontianak
      </div>
    </div>
  );
};

export default PenerimaanCard;
