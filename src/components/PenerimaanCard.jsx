import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-gradient-to-br from-[#0a192f] via-[#172a45] to-[#303a52] text-white p-8 overflow-hidden font-sans">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-cyan-400/10 blur-[60px]" />
      <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-purple-500/10 blur-[60px]" />
      
      {/* Glowing dots */}
      <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_5px_rgba(34,211,238,0.5)]" />
      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_5px_rgba(96,165,250,0.5)]" />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="text-center mt-12 mb-8">
          <div className="inline-block px-6 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 mb-4">
            <p className="text-blue-300 font-medium text-sm">SMA Negeri 10 Pontianak</p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PENERIMAAN<br />MURID BARU
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </div>
          <p className="mt-6 text-2xl font-bold text-white/90">TAHUN AJARAN 2025</p>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 mt-8 flex-grow">
          {[
            {
              title: "Jalur Afirmasi",
              date: "16 - 17 Juni 2025",
              percent: "30% Kuota",
              quota: "107 Siswa",
              note: "*Sudah termasuk penyandang disabilitas sebesar 2%",
              border: "border-cyan-400",
              bg: "bg-gradient-to-br from-cyan-500/10 to-blue-600/10",
              accent: "bg-cyan-400",
            },
            {
              title: "Jalur Mutasi",
              date: "16 - 17 Juni 2025",
              percent: "5% Kuota",
              quota: "18 Siswa",
              note: "*Anak Guru 2 Siswa\n18 - 2 = 16 Siswa",
              border: "border-emerald-400",
              bg: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
              accent: "bg-emerald-400",
            },
            {
              title: "Jalur Domisili",
              date: "24 - 26 Juni 2025",
              percent: "35% Kuota",
              quota: "126 Siswa",
              note: "",
              border: "border-purple-400",
              bg: "bg-gradient-to-br from-purple-500/10 to-fuchsia-600/10",
              accent: "bg-purple-400",
            },
            {
              title: "Jalur Prestasi",
              date: "7 - 9 Juli 2025",
              percent: "30% Kuota",
              quota: "108 Siswa",
              note: "",
              border: "border-amber-400",
              bg: "bg-gradient-to-br from-amber-500/10 to-orange-600/10",
              accent: "bg-amber-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} ${item.border} border rounded-xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
            >
              {/* Accent bar */}
              <div className={`${item.accent} h-1 w-full absolute top-0 left-0`} />
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/80 mb-3">{item.date}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{item.percent}</p>
                  <p className="text-lg font-semibold text-white/90">{item.quota}</p>
                </div>
                <div className={`${item.accent} w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg`}>
                  {item.percent.split('%')[0]}
                </div>
              </div>
              
              {item.note && (
                <p className="text-xs text-white/70 mt-3 italic whitespace-pre-line">{item.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-white/60 text-sm">
          <div className="mb-2">
            <span className="font-medium text-white/80">www.sman10-ptk.sch.id</span>
          </div>
          <p>@sman10ptk.official — Smanpul Pontianak</p>
        </footer>
      </div>
    </div>
  );
};

export default PenerimaanCard;
