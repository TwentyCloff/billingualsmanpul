import React from "react";

const PenerimaanCard = () => {
  return (
    <div className="relative w-full max-w-md h-[600px] bg-[#1a1a1a] text-white p-8 font-serif overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-amber-400" />
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-amber-600/10 blur-[50px]" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-amber-400/10 blur-[50px]" />
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Title section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400 mb-2">Herbal Compendium</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" />
        </header>

        {/* Herb cards */}
        <div className="space-y-10">
          {/* Curcuma Longa card */}
          <div className="bg-[#2a2a2a]/90 backdrop-blur-sm border border-amber-600/30 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Curcuma Longa</h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent my-3" />
            <p className="text-white/80 mb-3">
              Tubers (rhizomes) that are more than one year old can be used to medicine.
            </p>
            <p className="text-white/80 italic">
              Turmeric wine (rhizomes) are...
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
            <div className="absolute w-3 h-3 rotate-45 bg-amber-600" />
          </div>

          {/* Zingiber officinale card */}
          <div className="bg-[#2a2a2a]/90 backdrop-blur-sm border border-amber-600/30 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Zingiber officinale</h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent my-3" />
            <p className="text-white/80">
              Ginger is a plant whose rhizome is often used as a spice and raw material for traditional medicine. The rhizome is a special type of vegetable.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-6 text-center text-white/50 text-sm">
          <p>Traditional Herbal Knowledge</p>
        </footer>
      </div>
    </div>
  );
};

export default PenerimaanCard;
