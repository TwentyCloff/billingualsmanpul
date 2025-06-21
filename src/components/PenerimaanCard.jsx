import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="relative w-[540px] h-[1170px] bg-[#0a0e17] overflow-hidden font-['Poppins']">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHBhdGggZD0iTTAgMEg1MFY1MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWYyNjQxIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-20" />
        
        {/* Glowing particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: `radial-gradient(circle, ${['#ff9a56', '#ff6b6b', '#4ecdc4', '#a18cd1'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Large decorative circles */}
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-br from-amber-600/10 to-transparent blur-xl" />
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-600/10 to-transparent blur-xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Header */}
        <header className="text-center mt-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500 mb-4 tracking-wider">
            HERBAL ARCHIVES
          </h1>
          <div className="w-40 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8" />
          <div className="inline-block px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-2">
            <p className="text-amber-300 font-medium text-sm tracking-widest">TRADITIONAL MEDICINE</p>
          </div>
        </header>

        {/* Main Cards */}
        <div className="mt-12 space-y-10">
          {/* Curcuma Longa Card */}
          <div className="relative bg-gradient-to-br from-[#1f2937]/80 to-[#111827]/90 backdrop-blur-md rounded-xl border border-amber-500/30 p-6 shadow-lg overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-amber-600/10 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-rose-600/10 blur-[60px]" />
            
            <h2 className="text-3xl font-bold text-amber-300 mb-3 flex items-center">
              <span className="mr-3">Curcuma Longa</span>
              <span className="text-sm px-3 py-1 bg-amber-600/30 rounded-full border border-amber-500/50">Turmeric</span>
            </h2>
            
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent my-4" />
            
            <p className="text-white/90 mb-4 leading-relaxed">
              Tubers (rhizomes) that are more than one year old can be used to medicine.
            </p>
            <p className="text-white/80 italic text-sm">
              Turmeric wine (rhizomes) are...
            </p>
            
            {/* Particle burst */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-400"
                  style={{
                    transform: `rotate(${i * 30}deg) translate(0, 20px)`,
                    opacity: 0.7
                  }}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex justify-center items-center my-8">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 p-1">
              <div className="w-full h-full rounded-full bg-[#0a0e17] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Zingiber officinale Card */}
          <div className="relative bg-gradient-to-br from-[#1f2937]/80 to-[#111827]/90 backdrop-blur-md rounded-xl border border-emerald-500/30 p-6 shadow-lg overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-emerald-600/10 blur-[60px]" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-cyan-600/10 blur-[60px]" />
            
            <h2 className="text-3xl font-bold text-emerald-300 mb-3 flex items-center">
              <span className="mr-3">Zingiber officinale</span>
              <span className="text-sm px-3 py-1 bg-emerald-600/30 rounded-full border border-emerald-500/50">Ginger</span>
            </h2>
            
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent my-4" />
            
            <p className="text-white/90 leading-relaxed">
              Ginger is a plant whose rhizome is often used as a spice and raw material for traditional medicine. The rhizome is a special type of vegetable.
            </p>
            
            {/* Particle burst */}
            <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-emerald-400"
                  style={{
                    transform: `rotate(${i * 30}deg) translate(0, 20px)`,
                    opacity: 0.7
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-10 text-center">
          <div className="text-xs text-white/50 tracking-widest mb-2">
            TRADITIONAL • MEDICINAL • HERBS
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
          <div className="flex justify-center space-x-6">
            {['🌿', '🍃', '🌱', '☘️'].map((emoji, i) => (
              <span key={i} className="text-xl opacity-70 hover:opacity-100 transition-opacity">
                {emoji}
              </span>
            ))}
          </div>
        </footer>
      </div>

      {/* Global styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PenerimaanCard;
