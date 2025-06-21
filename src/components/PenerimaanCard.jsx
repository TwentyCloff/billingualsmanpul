import React from "react";

const PremiumPenerimaanPoster = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-[#050a15] overflow-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15V45L30 60L0 45V15L30 0Z' fill='none' stroke='%234cc9f0' stroke-width='0.8' stroke-dasharray='2,2'/%3E%3C/svg%3E")`
        }} />
        
        {/* Animated Energy Particles */}
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-energy-pulse"
            style={{
              background: `radial-gradient(circle, ${['#4cc9f0', '#4895ef', '#3f37c9'][i%3]} 0%, transparent 80%)`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 120}%`,
              animationDelay: `${Math.random() * 4}s`,
              filter: 'blur(0.8px)',
              opacity: 0
            }}
          />
        ))}
        
        {/* Neon Glow Effects */}
        <div className="absolute -right-1/4 -top-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(76,201,240,0.08)_0%,_transparent_70%)] animate-rotate-slow" />
        <div className="absolute -left-1/4 -bottom-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(111,66,193,0.06)_0%,_transparent_70%)] animate-rotate-slow-reverse" />
      </div>

      {/* Cyberpunk Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(135deg, rgba(76,201,240,0.03) 0%, rgba(76,201,240,0.01) 100%)`,
        mixBlendMode: 'screen'
      }} />

      {/* Main Content */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Holographic Header */}
        <header className="text-center mt-8 relative">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-lg rounded-full border border-cyan-400/40 mb-6 shadow-[0_0_20px_rgba(76,201,240,0.3)]">
            <p className="text-cyan-300 font-bold text-lg tracking-[0.4em]">SMA NEGERI 10 PONTIANAK</p>
          </div>
          
          <h1 className="text-[4rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tighter uppercase leading-[3.8rem]">
            <span className="text-outline">PENERIMAAN</span><br />
            <span className="text-outline">MURID BARU</span>
          </h1>
          
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4" />
          
          <p className="text-[3rem] font-black text-cyan-400 mt-4 tracking-tighter" style={{ 
            textShadow: '0 0 15px rgba(76, 201, 240, 0.7)',
            background: 'linear-gradient(90deg, #4cc9f0, #3a86ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>2025</p>
          
          {/* Holographic Ring */}
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full border-2 border-cyan-400/30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
            boxShadow: '0 0 60px rgba(76, 201, 240, 0.2)'
          }} />
        </header>

        {/* Cyber Cards Section */}
        <div className="mt-12 space-y-6 px-4">
          {[
            {
              title: "JALUR AFIRMASI",
              date: "16 - 17 JUNI 2025",
              percent: "30% KUOTA",
              quota: "107 SISWA",
              note: "*Sudah termasuk penyandang disabilitas sebesar 2%",
              border: "border-cyan-400/60",
              bg: "bg-gradient-to-br from-cyan-500/15 to-blue-600/15",
              glow: "shadow-[0_0_30px_rgba(76,201,240,0.2)]",
              accent: "from-cyan-400 to-blue-500"
            },
            {
              title: "JALUR MUTASI",
              date: "16 - 17 JUNI 2025",
              percent: "5% KUOTA",
              quota: "18 SISWA",
              note: "*Anak Guru 2 Siswa\n18 - 2 = 16 Siswa",
              border: "border-emerald-400/60",
              bg: "bg-gradient-to-br from-emerald-500/15 to-teal-600/15",
              glow: "shadow-[0_0_30px_rgba(72,187,120,0.2)]",
              accent: "from-emerald-400 to-teal-500"
            },
            {
              title: "JALUR DOMISILI",
              date: "24 - 26 JUNI 2025",
              percent: "35% KUOTA",
              quota: "126 SISWA",
              note: "",
              border: "border-purple-400/60",
              bg: "bg-gradient-to-br from-purple-500/15 to-fuchsia-600/15",
              glow: "shadow-[0_0_30px_rgba(167,139,250,0.2)]",
              accent: "from-purple-400 to-fuchsia-500"
            },
            {
              title: "JALUR PRESTASI",
              date: "7 - 9 JULI 2025",
              percent: "30% KUOTA",
              quota: "108 SISWA",
              note: "",
              border: "border-amber-400/60",
              bg: "bg-gradient-to-br from-amber-500/15 to-orange-600/15",
              glow: "shadow-[0_0_30px_rgba(251,191,36,0.2)]",
              accent: "from-amber-400 to-orange-500"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} ${item.border} ${item.glow} border rounded-xl p-6 backdrop-blur-md hover:backdrop-blur-lg transition-all duration-500 relative overflow-hidden`}
              style={{ minHeight: '160px' }}
            >
              {/* Animated Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-light-streak" />
              
              {/* Holographic Content */}
              <div className="flex justify-between h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-[1.6rem] font-extrabold uppercase tracking-tight mb-2" style={{
                    background: `linear-gradient(90deg, ${item.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {item.title}
                  </h3>
                  <p className="text-[1.1rem] text-white/90 font-medium mb-3">{item.date}</p>
                  <p className="text-[1.3rem] font-bold text-white">{item.quota}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-[1.8rem] font-black" style={{
                    background: `linear-gradient(90deg, ${item.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 0 10px rgba(${idx === 0 ? '76,201,240' : idx === 1 ? '72,187,120' : idx === 2 ? '167,139,250' : '251,191,36'}, 0.5)`
                  }}>
                    {item.percent}
                  </p>
                </div>
              </div>
              
              {item.note && (
                <p className="text-[1rem] text-white/90 mt-3 italic leading-tight font-medium" style={{
                  textShadow: '0 0 5px rgba(255,255,255,0.3)'
                }}>
                  {item.note}
                </p>
              )}
              
              {/* Holographic Grid Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-dasharray='2,2'/%3E%3C/svg%3E")`
              }} />
            </div>
          ))}
        </div>

        {/* Cyber Footer */}
        <footer className="mt-auto pt-10 text-center relative">
          <div className="text-sm text-cyan-300/80 tracking-[0.3em] mb-3 font-bold">
            OFFICIAL WEBSITE • SOCIAL MEDIA
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-4" />
          <div className="flex justify-center space-x-6">
            <span className="text-[1.1rem] text-cyan-300 font-medium">www.sman10-ptk.sch.id</span>
            <span className="text-cyan-400/30 text-xl">|</span>
            <span className="text-[1.1rem] text-cyan-300 font-medium">@sman10ptk.official</span>
          </div>
          
          {/* Energy Pulse */}
          <div className="absolute bottom-0 left-1/2 w-[200%] h-[1px] bg-cyan-400/20 transform -translate-x-1/2" style={{
            boxShadow: '0 0 20px 2px rgba(76, 201, 240, 0.6)',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
        </footer>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700;800&display=swap');
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes energy-pulse {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes light-streak {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .text-outline {
          -webkit-text-stroke: 1px rgba(76, 201, 240, 0.5);
          text-stroke: 1px rgba(76, 201, 240, 0.5);
        }
        
        .animate-energy-pulse {
          animation: energy-pulse 3s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 120s linear infinite;
        }
        
        .animate-rotate-slow-reverse {
          animation: rotate-slow-reverse 140s linear infinite;
        }
        
        .animate-light-streak {
          background-size: 200% 100%;
          animation: light-streak 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumPenerimaanPoster;
