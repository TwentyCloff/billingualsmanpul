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
      {/* Ultra-minimal gradient */}
      <div className="absolute inset-0 z-[-20] bg-black" />

      {/* Abstract grid overlay */}
      <div 
        className="absolute inset-0 z-[-18] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 transform -translate-x-1/2 w-full h-[150vh] object-cover z-[-10] opacity-40"
        style={{
          filter: "blur(1px) contrast(120%)"
        }}
      >
        <source src={blackholeVideo} type="video/webm" />
      </video>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');
          .futur-text {
            font-family: 'Rajdhani', sans-serif;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }
          .typewriter-cursor {
            color: #00f0ff !important;
            font-weight: bold !important;
          }
        `}
      </style>

      {/* Main content - ultra minimal */}
      <div className="container relative z-10">
        <div className="relative max-w-[50rem] mx-auto text-center py-[8rem]">
          <h1 className="text-5xl sm:text-6xl mb-8 text-white futur-text">
            SMANPUL
          </h1>
          
          <div className="text-xl sm:text-2xl text-cyan-300 mb-12 h-8 futur-text">
            <Typewriter
              options={{
                strings: ["Future Education", "Digital Learning", "Beyond Limits"],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 40,
                cursorClassName: 'typewriter-cursor'
              }}
            />
          </div>

          <Button href="#join" white className="futur-text">
            EXPLORE
          </Button>
        </div>
      </div>

      {/* Glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_5px_rgba(0,240,255,0.5)]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </Section>
  );
};

export default Hero;
