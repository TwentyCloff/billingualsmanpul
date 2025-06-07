import Section from "./Section";
import Button from "./Button";

const Features = () => {
  return (
    <Section 
      id="about"
      crosses
      className="relative overflow-hidden py-[6rem]"
    >
      {/* Enhanced Gradient Layers (Top to Bottom) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Layer 1: 100% to 70% opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-n-8 via-n-8/70 to-transparent h-[40%]"></div>
        
        {/* Layer 2: 70% to 50% opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-n-8/70 via-n-8/50 to-transparent h-[60%] mt-[10%]"></div>
        
        {/* Layer 3: 50% to 30% opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-n-8/50 via-n-8/30 to-transparent h-[80%] mt-[20%]"></div>
        
        {/* Layer 4: 30% to 0% opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-n-8/30 to-transparent h-full mt-[30%]"></div>
        
        {/* Original Background Preservation */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('/assets/background.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-[50rem] mx-auto text-center">
          <h2 className="h2 mb-8 relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-n-1 via-n-3 to-n-1">
              About Our Class
            </span>
            <svg 
              className="absolute -bottom-3 left-0 w-full"
              width="624" 
              height="28" 
              viewBox="0 0 624 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0 14C0 14 72.5 0 312 14C551.5 28 624 14 624 14" 
                stroke="url(#textUnderline)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="textUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-n-3)" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--color-n-3)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </h2>

          <div className="relative">
            <div className="relative z-10 bg-n-8/30 backdrop-blur-lg border border-n-7/40 rounded-2xl p-8 md:p-10 mx-auto max-w-[48rem]">
              <p className="body-1 text-n-2 leading-relaxed md:leading-loose">
                In our bilingual class, every day feels like a new adventure. It's not just about learning in two languages — it's about growing together as one big, happy family. Laughter echoes through the room as we tackle lessons with enthusiasm and curiosity. Whether we're working on group projects or just sharing stories during break time, there's always a warm sense of togetherness that makes everything more fun. The vibe is cheerful, energetic, and full of support, making our class a place where everyone feels seen, heard, and excited to learn. It's seriously the best kind of classroom you could ask for!
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="body-2 text-n-3 mb-6">Want to experience this yourself?</p>
            <Button 
              className="mx-auto transform transition-all duration-300 hover:scale-105"
              white
              glow
            >
              Join Us Today
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
