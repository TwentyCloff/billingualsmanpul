import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-[#0a0e17] overflow-hidden font-['Poppins']">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHBhdGggZD0iTTAgMEg1MFY1MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWYyNjQxIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-20" />
        
        {/* Glowing particles */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: `radial-gradient(circle, ${['#4cc9f0', '#4895ef', '#4361ee', '#3f37c9'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Large decorative circles */}
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/10 to-transparent blur-xl" />
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/10 to-transparent blur-xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Header */}
        <header className="text-center mt-6">
          <div className="inline-block px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-4">
            <p className="text-blue-300 font-medium text-sm tracking-widest">SMA NEGERI 10 PONTIANAK</p>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-wider">
            PENERIMAAN<br />MURID BARU
          </h1>
          <div className="w-40 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4" />
          <p className="text-2xl font-bold text-white/90">TAHUN AJARAN 2025</p>
        </header>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          {[
            {
              title: "Jalur Afirmasi",
              date: "16 - 17 Juni 2025",
              percent: "30%",
              quota: "107 Siswa",
              note: "*Sudah termasuk penyandang disabilitas sebesar 2%",
              border: "border-cyan-400",
              bg: "bg-gradient-to-br from-cyan-500/10 to-blue-600/10",
              accent: "bg-cyan-400",
              emoji: "✨"
            },
            {
              title: "Jalur Mutasi",
              date: "16 - 17 Juni 2025",
              percent: "5%",
              quota: "18 Siswa",
              note: "*Anak Guru 2 Siswa\n18 - 2 = 16 Siswa",
              border: "border-emerald-400",
              bg: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
              accent: "bg-emerald-400",
              emoji: "🔄"
            },
            {
              title: "Jalur Domisili",
              date: "24 - 26 Juni 2025",
              percent: "35%",
              quota: "126 Siswa",
              note: "",
              border: "border-purple-400",
              bg: "bg-gradient-to-br from-purple-500/10 to-fuchsia-600/10",
              accent: "bg-purple-400",
              emoji: "🏠"
            },
            {
              title: "Jalur Prestasi",
              date: "7 - 9 Juli 2025",
              percent: "30%",
              quota: "108 Siswa",
              note: "",
              border: "border-amber-400",
              bg: "bg-gradient-to-br from-amber-500/10 to-orange-600/10",
              accent: "bg-amber-400",
              emoji: "🏆"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} ${item.border} border rounded-xl p-4 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-48`}
            >
              {/* Accent bar */}
              <div className={`${item.accent} h-1 w-full absolute top-0 left-0`} />
              
              {/* Emoji decoration */}
              <div className="absolute -top-3 -right-3 text-4xl opacity-20">
                {item.emoji}
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-xs text-white/80 mb-2">{item.date}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-xl font-bold">{item.percent}</p>
                  <p className="text-sm font-semibold text-white/90">{item.quota}</p>
                </div>
                <div className={`${item.accent} w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm`}>
                  {item.percent.split('%')[0]}
                </div>
              </div>
              
              {item.note && (
                <p className="text-[10px] text-white/70 mt-2 italic whitespace-pre-line leading-tight">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-bold text-cyan-300 mb-2">INFORMASI PENTING</h3>
          <ul className="text-xs text-white/80 space-y-1">
            <li>• Pendaftaran dibuka pukul 08.00 - 15.00 WIB</li>
            <li>• Verifikasi dokumen dilakukan secara online</li>
            <li>• Pengumuman melalui website sekolah</li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-8 text-center">
          <div className="text-xs text-white/50 tracking-widest mb-2">
            OFFICIAL WEBSITE • SOCIAL MEDIA
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />
          <div className="flex justify-center space-x-4">
            <span className="text-sm font-medium text-white/80">www.sman10-ptk.sch.id</span>
            <span className="text-white/50">|</span>
            <span className="text-sm font-medium text-white/80">@sman10ptk.official</span>
          </div>
        </footer>
      </div>

      {/* Global styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PenerimaanCard;
