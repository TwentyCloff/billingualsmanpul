import React from "react";

const ElitePenerimaanPoster = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-[#0a0e17] overflow-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(76,201,240,0.03)_0%,_transparent_70%)]" />
      
      {/* Grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%234cc9f0' stroke-width='0.3'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col">
        {/* Header */}
        <header className="text-center mt-4">
          <div className="inline-block px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-3">
            <p className="text-cyan-300 font-semibold text-xs tracking-[0.3em]">SMA NEGERI 10 PONTIANAK</p>
          </div>
          <h1 className="text-[2.8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 tracking-tight uppercase leading-[3rem]">
            PENERIMAAN<br />MURID BARU
          </h1>
          <div className="w-32 h-[2px] mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-1" />
          <p className="text-[2rem] font-bold text-cyan-400 tracking-tighter">2025</p>
        </header>

        {/* Cards */}
        <div className="mt-8 space-y-4 px-2">
          {[
            {
              title: "JALUR AFIRMASI",
              date: "16 - 17 JUNI 2025",
              percent: "30% KUOTA",
              quota: "107 SISWA",
              note: "*Sudah termasuk penyandang disabilitas sebesar 2%",
              color: "cyan"
            },
            {
              title: "JALUR MUTASI",
              date: "16 - 17 JUNI 2025",
              percent: "5% KUOTA",
              quota: "18 SISWA",
              note: "*Anak Guru 2 Siswa\n18 - 2 = 16 Siswa",
              color: "emerald"
            },
            {
              title: "JALUR DOMISILI",
              date: "24 - 26 JUNI 2025",
              percent: "35% KUOTA",
              quota: "126 SISWA",
              note: "",
              color: "purple"
            },
            {
              title: "JALUR PRESTASI",
              date: "7 - 9 JULI 2025",
              percent: "30% KUOTA",
              quota: "108 SISWA",
              note: "",
              color: "amber"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/10 border border-${item.color}-400/40 rounded-lg p-4 backdrop-blur-sm`}
              style={{ minHeight: '130px' }}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className={`text-xl font-bold text-${item.color}-300 mb-1`}>{item.title}</h3>
                  <p className="text-sm text-white/80 mb-2">{item.date}</p>
                  <p className="text-lg font-semibold text-white">{item.quota}</p>
                </div>
                <p className={`text-2xl font-bold text-${item.color}-300 self-center`}>
                  {item.percent}
                </p>
              </div>
              {item.note && (
                <p className="text-[0.85rem] text-white/80 mt-2 italic leading-tight">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-6 text-center">
          <div className="text-xs text-cyan-400/80 tracking-[0.3em] mb-2">
            OFFICIAL WEBSITE • SOCIAL MEDIA
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-3" />
          <div className="flex justify-center space-x-4">
            <span className="text-sm text-cyan-300">www.sman10-ptk.sch.id</span>
            <span className="text-cyan-400/30">|</span>
            <span className="text-sm text-cyan-300">@sman10ptk.official</span>
          </div>
        </footer>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');
      `}</style>
    </div>
  );
};

export default ElitePenerimaanPoster;
