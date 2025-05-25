import { useRef, useState, useEffect, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Section from "./Section";

const BentoTilt = ({ children, className = "", disableTiltOnMobile = true }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!itemRef.current || (isMobile && disableTiltOnMobile)) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 3;
    const tiltY = (relativeX - 0.5) * -3;
    
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.99, 0.99, 0.99)`
    );
  }, [isMobile, disableTiltOnMobile]);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle("");
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative transition-all duration-300 ease-out will-change-transform overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      onTouchStart={() => isMobile && setTransformStyle("scale(0.97)")}
      onTouchEnd={() => isMobile && setTransformStyle("")}
    >
      {children}
    </div>
  );
};

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setIsLoaded(true);
      video.play().catch(e => {
        console.log("Autoplay prevented, trying muted play");
        video.muted = true;
        video.play();
      });
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(e => console.log("Autoplay prevented:", e));
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('ended', handleEnded);
    
    video.preload = "auto";
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      className="absolute left-0 top-0 w-full h-full object-cover"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
};

const Services = () => {
  return (
    <Section id="how-to-use">
      <div className="bg-black pb-20 md:pb-32 circular-font">
        <div className="container mx-auto px-4 md:px-10">
          {/* Hero Section */}
          <div className="border-hsla relative mb-6 h-64 w-full overflow-hidden rounded-2xl md:h-[55vh] md:rounded-3xl md:mb-10">
            <div className="relative w-full h-full">
              <VideoPlayer src="/videos/feature-1.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="relative z-10 flex flex-col justify-between w-full h-full p-5 md:p-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                    radia<b className="font-semibold">n</b>t
                  </h1>
                  <p className="mt-3 text-sm md:text-lg text-gray-300 max-w-[200px] md:max-w-[280px] leading-snug md:leading-normal">
                    Cross-platform metagame app turning Web2/Web3 activities into rewards
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Bento Grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-6 mb-6">
              {/* Zigma - Left (6 columns) */}
              <div className="col-span-6 row-span-2 h-[400px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-2.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                        zig<b className="font-semibold">m</b>a
                      </h1>
                      <p className="mt-3 text-base text-gray-300 max-w-[240px] leading-snug">
                        Anime-inspired NFT collection with expansion potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Features - Right (6 columns) */}
              <div className="col-span-6 row-span-2 h-[400px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-5.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 p-6">
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                      More Features
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {['Leaderboards', 'Quests', 'Marketplace', 'Rewards', 'Achievements', 'Social'].map((feature) => (
                        <span
                          key={feature}
                          className="text-sm bg-white/10 text-white px-3 py-1.5 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Squares */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              {/* Azul - Left Square (6 columns) */}
              <div className="col-span-6 h-[300px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-4.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                        az<b className="font-semibold">u</b>l
                      </h1>
                      <p className="mt-2 text-base text-gray-300 max-w-[240px] leading-snug">
                        Cross-world AI Agent for enhanced gameplay
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nexus - Right Square (6 columns) */}
              <div className="col-span-6 h-[300px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-3.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                        n<b className="font-semibold">e</b>xus
                      </h1>
                      <p className="mt-2 text-base text-gray-300 max-w-[240px] leading-snug">
                        Gamified social hub for Web3 communities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon - Full Width */}
            <div className="h-[500px]">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <VideoPlayer src="/videos/feature-6.mp4" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="relative z-10 flex flex-col justify-between w-full h-full p-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                      M<b className="font-semibold">o</b>re co<b className="font-semibold">m</b>ing!
                    </h1>
                    <p className="mt-2 text-lg text-white/90 max-w-[400px]">
                      Exciting updates and new features launching soon
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex gap-3 text-2xl">
                      {['🎮', '✨', '🚀'].map((emoji, i) => (
                        <span key={i}>{emoji}</span>
                      ))}
                    </div>
                    <TiLocationArrow className="scale-[2.5] text-white/90" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-4">
              {/* Zigma */}
              <div className="h-64 w-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-2.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-5">
                    <div>
                      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        zig<b className="font-semibold">m</b>a
                      </h1>
                      <p className="mt-2 text-sm text-gray-300 max-w-[180px] leading-snug">
                        Anime-inspired NFT collection with expansion potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nexus */}
              <div className="h-64 w-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-3.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-5">
                    <div>
                      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        n<b className="font-semibold">e</b>xus
                      </h1>
                      <p className="mt-2 text-sm text-gray-300 max-w-[180px] leading-snug">
                        Gamified social hub for Web3 communities
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Azul */}
              <div className="h-64 w-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-4.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-5">
                    <div>
                      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        az<b className="font-semibold">u</b>l
                      </h1>
                      <p className="mt-2 text-sm text-gray-300 max-w-[180px] leading-snug">
                        Cross-world AI Agent for enhanced gameplay
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Features */}
              <div className="h-64 w-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-5.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 p-5">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                      More Features
                    </h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Leaderboards', 'Quests', 'Marketplace', 'Rewards'].map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-white/10 text-white px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coming Soon */}
              <div className="h-64 w-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <VideoPlayer src="/videos/feature-6.mp4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-between w-full h-full p-5">
                    <div>
                      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        M<b className="font-semibold">o</b>re co<b className="font-semibold">m</b>ing!
                      </h1>
                      <p className="mt-2 text-sm text-white/90 max-w-[200px]">
                        Exciting updates launching soon
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex gap-2">
                        {['🎮', '✨', '🚀'].map((emoji, i) => (
                          <span key={i}>{emoji}</span>
                        ))}
                      </div>
                      <TiLocationArrow className="scale-[1.8] text-white/90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Services;
