import Section from "./Section";

const Features = () => {
  return (
    <Section 
      id="about"
      crosses
      className="pt-[6rem] -mt-[2.5rem]"
    >
      <div className="container max-w-4xl mx-auto px-6">
        {/* Professional About Us Content */}
        <div className="text-center">
          <h2 className="h2 mb-8 relative inline-block">
            <span className="relative z-10 text-white font-bold tracking-wide">
              ABOUT US
            </span>
            <svg 
              className="absolute -bottom-3 left-0 w-full pointer-events-none select-none"
              width="624" 
              height="28" 
              viewBox="0 0 624 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00C9FF" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="#6E45E2" />
                </linearGradient>
              </defs>
              <path 
                d="M0 14C0 14 72.5 0 312 14C551.5 28 624 14 624 14" 
                stroke="url(#oceanGradient)" 
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-n-2 text-gray-300">
            <p className="font-medium">
              In our bilingual class, every day brings something new to discover. Learning in two languages makes things more exciting — not just in lessons, but in how we connect with each other.
            </p>
            
            <p>
              We work together, share ideas, and enjoy the process of growing as a team. The classroom feels lively, welcoming, and full of curiosity.
            </p>
            
            <p className="italic">
              Whether we're doing projects, having discussions, or just talking during breaks, there's always a sense of togetherness.
            </p>
            
            <p className="font-semibold">
              It's a place where everyone feels comfortable, supported, and motivated to learn.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
