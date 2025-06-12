import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import gambar
import sample1 from "../assets/hero/sample1.jpg";
import sample2 from "../assets/hero/sample2.jpg";

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Data gallery
  const slides = [
    {
      id: 1,
      image: sample1,
      title: "Kenangan Kelas",
      description: "Momen bahagia bersama teman-teman sekelas"
    },
    {
      id: 2,
      image: sample2,
      title: "Kegiatan Sekolah",
      description: "Belajar dan bermain bersama"
    },
    {
      id: 3,
      image: sample1,
      title: "Acara Tahunan",
      description: "Peringatan hari besar sekolah"
    },
    {
      id: 4,
      image: sample2,
      title: "Study Tour",
      description: "Petualangan seru di luar sekolah"
    }
  ];

  // Fungsi auto slide
  useEffect(() => {
    if (isAutoPlaying) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    clearTimeout(timeoutRef.current);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Handle touch untuk mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const difference = touchStartX.current - touchEndX.current;
    if (difference > 5) {
      goToNext(); // Swipe kiri
    } else if (difference < -5) {
      goToPrev(); // Swipe kanan
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
    resetAutoPlay();
  };

  return (
    <Section className="overflow-hidden" id="gallery">
      <div className="w-full min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Gallery */}
        <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Gallery Kenangan</h2>
          <p className="text-sm sm:text-xl text-gray-300">Momen berharga bersama teman-teman kelas</p>
        </div>

        {/* Main Slider */}
        <div className="max-w-6xl mx-auto relative group">
          {/* Slides */}
          <div 
            className="relative h-[50vh] sm:h-[70vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white text-center">
                  <h3 className="text-lg sm:text-3xl font-bold mb-1 sm:mb-2">{slide.title}</h3>
                  <p className="text-xs sm:text-lg opacity-90">{slide.description}</p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows - Tampil di desktop saja */}
            <button
              onClick={() => {
                goToPrev();
                resetAutoPlay();
              }}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                goToNext();
                resetAutoPlay();
              }}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6 sm:w-8' : 'bg-gray-600 w-3 sm:w-4 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter Slide */}
          <div className="text-center mt-4 text-gray-400 text-sm sm:text-base">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GallerySlider;
