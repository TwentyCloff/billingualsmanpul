import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#41729F] to-[#E1F1FF] text-white font-sans flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Glow Element */}
      <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-[#41729F] opacity-20 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#E1F1FF] opacity-10 blur-2xl rounded-full z-0"></div>

      {/* Header */}
      <div className="relative z-10 text-center mt-16 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md">
          SISTEM PENERIMAAN MURID BARU 2025
        </h1>
        <p className="text-lg md:text-xl mt-2 text-[#E1F1FF]/80 font-medium">
          SMA NEGERI 10 PONTIANAK
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 relative z-10">
        {/* Card Template */}
        {[
          {
            title: "JALUR AFIRMASI",
            date: "16 - 17 JUNI 2025",
            percent: "AFIRMASI 30%",
            siswa: "107 SISWA",
            footnote: "*Sudah termasuk penyandang disabilitas sebesar 2%",
            color: "from-blue-800 to-blue-400",
            icon: "🎯"
          },
          {
            title: "JALUR MUTASI",
            date: "16 - 17 JUNI 2025",
            percent: "MUTASI 5%",
            siswa: "18 SISWA",
            footnote: "*Anak guru 2 siswa\n18 - 2 = 16 SISWA",
            color: "from-cyan-700 to-cyan-300",
            icon: "🔁"
          },
          {
            title: "JALUR DOMISILI",
            date: "24 - 26 JUNI 2025",
            percent: "DOMISILI 35%",
            siswa: "126 SISWA",
            footnote: "",
            color: "from-indigo-700 to-indigo-300",
            icon: "📍"
          },
          {
            title: "JALUR PRESTASI",
            date: "7 - 9 JULI 2025",
            percent: "PRESTASI 30%",
            siswa: "108 SISWA",
            footnote: "",
            color: "from-yellow-600 to-yellow-300 text-black",
            icon: "🏅"
          }
        ].map((item, i) => (
          <div key={i} className={`bg-gradient-to-br ${item.color} p-5 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-30 relative overflow-hidden`}>
            <div className="absolute top-2 right-3 text-2xl opacity-40">{item.icon}</div>
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-sm opacity-80 mb-2">{item.date}</p>
            <div className="text-lg font-semibold">{item.percent}</div>
            <div className="text-lg font-semibold">{item.siswa}</div>
            {item.footnote && (
              <p className="text-xs mt-2 whitespace-pre-line opacity-70 italic">{item.footnote}</p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 text-sm opacity-60 z-10">
        🌐 www.sman10-ptk.sch.id &nbsp; | &nbsp; 📸 @sman10ptk.official &nbsp; | &nbsp; 🏫 Smanpul Pontianak
      </div>
    </div>
  );
};

export default PenerimaanCard;
