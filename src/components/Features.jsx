import Section from "./Section";
import Button from "./Button";

const Features = () => {
  return (
    <Section 
      id="about"
      crosses
      className="relative overflow-hidden py-[6rem]"
    >
      {/* Multi-layer Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-n-8/20 to-n-8/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-n-8/15 to-n-8/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-n-8/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-n-8/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-n-8/5 to-transparent"></div>
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
            {/* Floating gradient elements for depth */}
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-n-3/10 blur-3xl"></div>
            
            <div className="relative z-10 bg-n-8/20 backdrop-blur-md border border-n-7/30 rounded-2xl p-8 md:p-10 mx-auto max-w-[48rem]">
              <p className="body-1 text-n-2 leading-relaxed md:leading-loose text-left">
                In our bilingual class, every day feels like a new adventure. It's not just about learning in two languages — it's about growing together as one big, happy family. Laughter echoes through the room as we tackle lessons with enthusiasm and curiosity. Whether we're working on group projects or just sharing stories during break time, there's always a warm sense of togetherness that makes everything more fun. The vibe is cheerful, energetic, and full of support, making our class a place where everyone feels seen, heard, and excited to learn. It's seriously the best kind of classroom you could ask for!
              </p>
            </div>
          </div>

          <div className="mt-12 animate-float">
            <p className="body-2 text-n-3 mb-6">Like what you see?</p>
            <Button 
              className="mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              white
              glow
            >
              Join the Fun
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
