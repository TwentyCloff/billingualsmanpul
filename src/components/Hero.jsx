import Typewriter from "typewriter-effect";
import { curve } from "../assets";
import blackholeVideo from "../assets/hero/animated.webm";
import Button from "./Button";
import Section from "./Section";

const Hero = () => {
  return (
    <Section
      id="hero"
      customPaddings
      className="pt-[12rem] -mt-[5.25rem] relative overflow-hidden"
    >
      {/* Modern gradient background */}
      <div
        className="absolute inset-0 z-[-20] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      />

      {/* Geometric pattern overlay */}
      <div 
        className="absolute inset-0 z-[-18] opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="blackhole-video absolute left-1/2 transform -translate-x-1/2 w-[130vw] h-[130vh] object-cover z-[-10] pointer-events-none
                   top-[-30%] sm:top-[-30%] md:top-[-20%] lg:top-[-15%] xl:top-[-12%] 2xl:top-[-10%]"
        style={{
          filter: "brightness(0.5) hue-rotate(180deg)",
          mixBlendMode: "screen"
        }}
      >
        <source src={blackholeVideo} type="video/webm" />
      </video>

      <style>
        {`
          @font-face {
            font-family: 'Orbitron';
            src: url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');
          }
          .futuristic-text {
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          @media (max-width: 640px) {
            .blackhole-video {
              top: -50% !important;
              filter: brightness(0.6) hue-rotate(180deg) !important;
            }
          }
          @media (min-width: 1920px) {
            .blackhole-video {
              top: -12% !important;
              transform: translateX(-50%) scale(1.1);
            }
          }
          @media (min-width: 2560px) {
            .blackhole-video {
              top: -10% !important;
              transform: translateX(-50%) scale(1.25);
            }
          }
          .typewriter-cursor {
            color: #3b82f6 !important;
            font-weight: bold !important;
          }
        `}
      </style>

      {/* Main content */}
      <div className="container relative z-10">
        <div className="relative max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
          <h1 className="h1 mb-6 text-white futuristic-text">
            Welcome to <span className="text-blue-400">SMANPUL</span>
            <br />
            <span className="text-[1.4rem] sm:text-[1.75rem] md:text-[2rem] leading-snug block mt-4">
              <Typewriter
                options={{
                  strings: [
                    "Bilingual Excellence",
                    "Future-Ready Education",
                    "Global Perspective",
                    "Innovative Learning",
                    "Digital Classroom",
                    "跨文化学习环境",
                    "双语教学先锋"
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                  cursorClassName: 'typewriter-cursor',
                  wrapperClassName: 'typewriter-wrapper futuristic-text'
                }}
              />
            </span>
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 text-gray-300">
            Experience the future of education at{" "}
            <span className="inline-block relative font-semibold text-blue-300 futuristic-text">
              SMANPUL
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
                style={{ filter: 'hue-rotate(180deg)' }}
              />
            </span>
            .edu - Where boundaries disappear
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="#admission" white className="futuristic-text">
              Join Now
            </Button>
            <Button href="#programs" className="futuristic-text bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              Explore Programs
            </Button>
          </div>
        </div>
      </div>

      {/* Animated gradient transition */}
      <div
        className="absolute bottom-0 left-0 w-full h-[12rem] z-[-5]"
        style={{
          background: "linear-gradient(to bottom, transparent, #0f172a)",
        }}
      />

      {/* Floating tech elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-blue-400 opacity-70 animate-float"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-cyan-300 opacity-50 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-indigo-400 opacity-60 animate-float animation-delay-3000"></div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </Section>
  );
};

export default Hero;
