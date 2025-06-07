import { FaGlobe, FaUsers, FaMicrophone, FaGraduationCap, FaHandshake, FaComments, FaBook, FaTrophy } from 'react-icons/fa';
import Section from "./Section";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/Collaboration";

const Features = () => {
  return (
    <Section 
      id="about"
      crosses
      className="pt-[4rem] -mt-[2rem]"
    >
      <div className="container lg:flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Content - Text */}
        <div className="lg:max-w-[30rem] text-center lg:text-left">
          <h2 className="h2 mb-6 md:mb-8 relative inline-block">
            <span className="relative z-10 text-white">
              About Us
            </span>
            <svg 
              className="absolute -bottom-2 left-0 w-full xl:-mt-2 pointer-events-none select-none"
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
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </h2>

          <p className="body-2 mb-8 text-n-2 lg:pr-8 text-gray-300">
            In our bilingual class, every day brings something new to discover. Learning in two languages makes things more exciting — not just in lessons, but in how we connect with each other.
            <br /><br />
            We work together, share ideas, and enjoy the process of growing as a team. The classroom feels lively, welcoming, and full of curiosity.
            <br /><br />
            Whether we're doing projects, having discussions, or just talking during breaks, there's always a sense of togetherness.
            <br /><br />
            It's a place where everyone feels comfortable, supported, and motivated to learn.
          </p>
        </div>

        {/* Right Content - Visual Element (kept from original) */}
        <div className="relative w-full max-w-[32rem] lg:w-[40rem] aspect-square mt-10 lg:mt-0">
          {/* Central Icon with Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40 rounded-xl bg-n-8 border-2 border-primary/30 flex items-center justify-center p-6 backdrop-blur-sm">
              <FaGlobe className="z-10 text-6xl text-primary" />
              <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 rounded-full border-2 border-n-6/50 opacity-30"></div>
          <div className="absolute inset-4 rounded-full border-2 border-n-6/30 opacity-20"></div>
          <div className="absolute inset-8 rounded-full border-2 border-n-6/10 opacity-10"></div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
