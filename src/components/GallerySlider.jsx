import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { smallSphere, stars } from "../assets";
import { LeftLine, RightLine } from "./design/Pricing";
import Heading from "./Heading";
import Section from "./Section";
import Button from "./Button";

// Import your sample images (you'll need to add these to your assets)
import sample1 from "../assets/hero/sample1.jpg";
import sample2 from "../assets/hero/sample2.jpg";

const GallerySlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Sample gallery data - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      image: sample1,
      title: "Moment Bahagia 1",
      description: "Kenangan indah bersama teman-teman kelas"
    },
    {
      id: 2,
      image: sample2,
      title: "Moment Bahagia 2",
      description: "Kegiatan seru di sekolah"
    },
    // Add more images as needed
    {
      id: 3,
      image: sample1, // Reusing sample1 as placeholder
      title: "Acara Kelas",
      description: "Foto bersama saat acara kelas"
    },
    {
      id: 4,
      image: sample2, // Reusing sample2 as placeholder
      title: "Study Tour",
      description: "Petualangan seru study tour"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoSlide(); // Restart auto-slide when user manually changes slide
  };

  return (
    <Section className="overflow-hidden" id="gallery">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1 pointer-events-none select-none"
            width={255}
            height={255}
            alt="Sphere"
          />

          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full animate-pulse pointer-events-none select-none"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Kenangan Indah"
          title="Gallery Kelas Kita"
        />

        <div className="relative">
          {/* Gallery Slider Container */}
          <div 
            className="relative w-full h-[500px] overflow-hidden rounded-3xl bg-n-7 shadow-lg"
            ref={sliderRef}
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            {/* Slides */}
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="h3 text-white">{item.title}</h3>
                  <p className="body-2 text-n-3">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-n-8/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-n-7 transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-n-8/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-n-7 transition-colors z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-primary-500 w-6' : 'bg-n-5 hover:bg-n-4'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-10">
          <Button
            className="w-[15rem]"
            onClick={() => navigate("/dashboard")}
            white={false}
          >
            Go To Dashboard
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default GallerySlider;
