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
      {/* Background gradient - subtle dark */}
      <div
        className="absolute inset-0 z-[-20] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #121212 0%, #000000 95%)",
        }}
      />

      {/* Soft black overlay - adjusted to 30% opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-[-9]" />

      {/* Blackhole video with adjusted brightness */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="blackhole-video absolute left-1/2 transform -translate-x-1/2 w-[130vw] h-[130vh] object-cover z-[-10] pointer-events-none
                   top-[-30%] sm:top-[-30%] md:top-[-20%] lg:top-[-15%] xl:top-[-12%] 2xl:top-[-10%]"
        style={{
          filter: "brightness(0.7)", // Slightly brighter than before
        }}
      >
        <source src={blackholeVideo} type="video/webm" />
      </video>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap');
          .tech-font {
            font-family: 'Orbitron', sans-serif;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .tech-font-light {
            font-family: 'Orbitron', sans-serif;
            font-weight: 500;
            letter-spacing: 0.05em;
          }
          .tech-font-bold {
            font-family: 'Orbitron', sans-serif;
            font-weight: 800;
            letter-spacing: 0.15em;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
          }
          @media (max-width: 640px) {
            .blackhole-video {
              width: auto !important;
              height: 55vh !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) !important;
            }
            .tech-font {
              font-size: 2.5rem;
            }
            .mobile-text {
              font-size: 0.9rem !important;
              line-height: 1.3 !important;
              letter-spacing: 0.03em !important;
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
        `}
      </style>

      {/* Main content */}
      <div className="container relative z-10">
        <div className="relative max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
          <h1 className="h1 mb-6 text-white tech-font-bold">
            BILINGUAL CLASS
            <br />
            <span className="text-[1.4rem] sm:text-[1.75rem] md:text-[2rem] leading-snug block tech-font-light">
              <Typewriter
                options={{
                  strings: [
                    "BILINGUAL EXCELLENCE",
                    "FUTURE EDUCATION",
                    "DIGITAL LEARNING",
                    "INNOVATIVE CLASSROOM"
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: "|",
                  delay: 50,
                  deleteSpeed: 30
                }}
              />
            </span>
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 text-gray-300 tech-font mobile-text">
            EXPERIENCE MODERN EDUCATION AT{" "}
            <span className="inline-block relative font-semibold text-white tech-font-bold mobile-text">
              SMANPUL
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </p>

          <Button href="#pricing" white className="tech-font-bold hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all">
            EXPLORE NOW
          </Button>
        </div>
      </div>

      {/* Bottom transition gradient - smoother */}
      <div
        className="absolute bottom-0 left-0 w-full h-[14rem] z-[-5]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7) 60%, #000 90%)",
        }}
      />
    </Section>
  );
};

export default Hero;
