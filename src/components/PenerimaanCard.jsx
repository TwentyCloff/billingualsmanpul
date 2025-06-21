import React from "react";

const ElegantPenerimaanPoster = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-[#0b111e] overflow-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Soft Tech Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(76,201,240,0.03)_0%,_transparent_70%)]" />
      
      {/* Subtle Circuit Pattern */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zM30 30h20v20H30zM60 60h20v20H60zM0 60h20v20H0zM60 0h20v20H60z' fill='none' stroke='%234cc9f0' stroke-width='0.5' stroke-linecap='round'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Elegant Header */}
        <header className="text-center mt-6">
          <div className="inline-block px-6 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-cyan-400/20 mb-4">
            <p className="text-cyan-300 font-medium text-sm tracking-[0.3em]">SMA NEGERI 10 PONTIANAK</p>
          </div>
          <h1 className="text-[3.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2 tracking-tight uppercase leading-[3.2rem]">
            PENERIMAAN<br />MURID BARU
          </h1>
          <div className="w-36 h-[2px] mx-auto bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mb-3" />
          <p className="text-[2.4rem] font-bold text-cyan-300 tracking-tight">2025</p>
        </header>

        {/* Sophisticated Cards */}
        <div className="mt-10 space-y-5 px-3">
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
              className={`bg-gradient-to-br from-${item.color}-500/12 to-${item.color}-600/10 border border-${item.color}-400/30 rounded-xl p-5 backdrop-blur-sm hover:backdrop-blur transition-all duration-300`}
              style={{ minHeight: '150px' }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-[1.5rem] font-bold text-${item.color}-300 mb-2`}>{item.title}</h3>
                  <p className="text-[1.1rem] text-white/90 font-medium mb-3">{item.date}</p>
                  <p className="text-[1.3rem] font-semibold text-white">{item.quota}</p>
                </div>
                <p className={`text-[1.8rem] font-bold text-${item.color}-300 ml-4`}>
                  {item.percent}
                </p>
              </div>
              {item.note && (
                <p className="text-[0.95rem] text-white/85 mt-3 italic leading-snug">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Refined Footer */}
        <footer className="mt-auto pt-8 text-center">
          <div className="text-xs text-cyan-400/70 tracking-[0.3em] mb-3">
            OFFICIAL WEBSITE • SOCIAL MEDIA
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent mb-4" />
          <div className="flex justify-center space-x-5">
            <span className="text-[1.05rem] text-cyan-300 font-medium">www.sman10-ptk.sch.id</span>
            <span className="text-cyan-400/30">|</span>
            <span className="text-[1.05rem] text-cyan-300 font-medium">@sman10ptk.official</span>
          </div>
        </footer>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
        
        body {
          background: #0b111e;
        }
      `}</style>
    </div>
  );
};

export default ElegantPenerimaanPoster;
