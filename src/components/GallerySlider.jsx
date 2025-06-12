import React, { useState, useEffect, useRef } from 'react';

// Import images - make sure these paths are correct
import sample1 from "../assets/hero/sample1.jpg";
import sample2 from "../assets/hero/sample2.jpg";

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Gallery data
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
    }
  ];

  // Auto slide function
  const startAutoSlide = () => {
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, 5000);
  };

  // Clear timeout on unmount
  useEffect(() => {
    startAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    clearTimeout(timeoutRef.current);
    startAutoSlide();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoSlide();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) goToNext(); // Swipe left
    if (diff < -50) goToPrev(); // Swipe right
  };

  return (
    <section className="overflow-hidden bg-black w-full min-h-screen py-12 px-4" id="gallery">
      <div className="max-w-4xl mx-auto">
        {/* Gallery Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Gallery Kenangan</h2>
          <p className="text-gray-300">Momen berharga bersama teman-teman kelas</p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Slides */}
          <div 
            className="relative h-[60vh] rounded-xl overflow-hidden shadow-lg"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={startAutoSlide}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                  <p className="text-gray-300">{slide.description}</p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                goToPrev();
                clearTimeout(timeoutRef.current);
                startAutoSlide();
              }}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                goToNext();
                clearTimeout(timeoutRef.current);
                startAutoSlide();
              }}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
