import React from "react";

const PenerimaanPoster = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-[#0a0e17] overflow-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hexagon grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 25V75L50 100L0 75V25L50 0Z' fill='none' stroke='%234cc9f0' stroke-width='0.5'/%3E%3C/svg%3E")`
        }} />
        
        {/* Glowing tech particles */}
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: `radial-gradient(circle, ${['#4cc9f0', '#4895ef'][Math.floor(Math.random() * 2)]} 0%, transparent 70%)`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
        
        {/* Tech glow elements */}
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/5 to-transparent blur-xl" />
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/5 to-transparent blur-xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Header */}
        <header className="text-center mt-8">
          <div className="inline-block px-6 py-2 bg-white/5 backdrop-blur-md rounded-sm border border-cyan-400/30 mb-4">
            <p className="text-cyan-400 font-semibold text-sm tracking-[0.3em]">SMA NEGERI 10 PONTIANAK</p>
          </div>
          <h1 className="text-[3.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 tracking-tight uppercase leading-[3.5rem]">
            PENERIMAAN<br />MURID BARU
          </h1>
          <div className="w-40 h-[2px] mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-2" />
          <p className="text-[2.5rem] font-bold text-cyan-400 mt-2 tracking-tighter" style={{ textShadow: '0 0 10px rgba(76, 201, 240, 0.5)' }}>2025</p>
        </header>

        {/* Slim Vertical Cards Layout */}
        <div className="mt-8 space-y-4 px-2">
          {[
            {
              title: "JALUR AFIRMASI",
              date: "16 - 17 JUNI 2025",
              percent: "30% KUOTA",
              quota: "107 SISWA",
              note: "*Sudah termasuk penyandang disabilitas sebesar 2%",
              border: "border-cyan-400",
              bg: "bg-gradient-to-br from-cyan-500/10 to-blue-600/10",
              accent: "bg-cyan-400",
            },
            {
              title: "JALUR MUTASI",
              date: "16 - 17 JUNI 2025",
              percent: "5% KUOTA",
              quota: "18 SISWA",
              note: "*Anak Guru 2 Siswa\n18 - 2 = 16 Siswa",
              border: "border-emerald-400",
              bg: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
              accent: "bg-emerald-400",
            },
            {
              title: "JALUR DOMISILI",
              date: "24 - 26 JUNI 2025",
              percent: "35% KUOTA",
              quota: "126 SISWA",
              note: "",
              border: "border-purple-400",
              bg: "bg-gradient-to-br from-purple-500/10 to-fuchsia-600/10",
              accent: "bg-purple-400",
            },
            {
              title: "JALUR PRESTASI",
              date: "7 - 9 JULI 2025",
              percent: "30% KUOTA",
              quota: "108 SISWA",
              note: "",
              border: "border-amber-400",
              bg: "bg-gradient-to-br from-amber-500/10 to-orange-600/10",
              accent: "bg-amber-400",
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} ${item.border} border rounded-sm p-4 backdrop-blur-sm shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 relative overflow-hidden`}
              style={{ minHeight: '120px' }}
            >
              {/* Accent bar */}
              <div className={`${item.accent} h-[2px] w-full absolute top-0 left-0`} />
              
              {/* Content - Futuristic Layout */}
              <div className="flex justify-between h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-1">{item.title}</h3>
                  <p className="text-xs text-white/80 font-mono mb-2">{item.date}</p>
                  <p className="text-sm font-mono text-white/90">{item.quota}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-bold tracking-tighter">{item.percent}</p>
                </div>
              </div>
              
              {item.note && (
                <p className="text-[10px] text-white/70 mt-1 italic whitespace-pre-line leading-tight font-mono">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tech-inspired Footer */}
        <footer className="mt-auto pt-8 text-center">
          <div className="text-xs text-cyan-400/80 tracking-[0.3em] mb-2 font-mono">
            OFFICIAL WEBSITE • SOCIAL MEDIA
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-3" />
          <div className="flex justify-center space-x-4 font-mono">
            <span className="text-sm text-cyan-400/90">www.sman10-ptk.sch.id</span>
            <span className="text-cyan-400/30">|</span>
            <span className="text-sm text-cyan-400/90">@sman10ptk.official</span>
          </div>
        </footer>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PenerimaanPoster;
