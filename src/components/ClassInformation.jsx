import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Import images - make sure these paths are correct
import sample1 from "../assets/hero/sample1.jpg";
import sample2 from "../assets/hero/sample2.jpg";

// Velvet Teal Color Theme
const colors = {
  dark: '#1B4242',       // Deep teal
  medium: '#4FBDBA',     // Vibrant teal
  light: '#CDEED6',      // Light mint
  accent: '#4FBDBA',     // Teal accent
  text: '#FFFFFF',       // Pure white
  background: '#000000'  // Pure black
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(27, 66, 66, 0.25)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(79, 189, 186, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
};

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
    }, 4000);
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
    <section 
      className="overflow-hidden w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8" 
      style={{ background: colors.background }}
      id="gallery"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Gallery Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-bold mb-6 tracking-tight"
            style={{ 
              color: colors.text,
              textShadow: `0 0 15px ${colors.medium}80`,
              fontFamily: '"Conthrax", sans-serif',
              fontWeight: 800,
              letterSpacing: '-0.5px'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            OUR GALLERY
          </motion.h2>
          <motion.div 
            className="w-32 h-1 mx-auto"
            style={{ 
              background: `linear-gradient(90deg, ${colors.medium}, ${colors.light})`,
              boxShadow: `0 0 10px ${colors.medium}`
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          ></motion.div>
          <motion.p 
            className="mt-6 text-lg"
            style={{ 
              color: colors.light,
              fontFamily: '"Conthrax", sans-serif',
              fontWeight: 500
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            It contains the memories that are in our class.
          </motion.p>
        </div>

        {/* Slider Container */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Slides */}
          <div 
            className="relative h-[60vh] rounded-2xl overflow-hidden"
            style={glassStyle}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => {
              clearTimeout(timeoutRef.current);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              startAutoSlide();
              setIsHovered(false);
            }}
          >
            {slides.map((slide, index) => (
              <motion.div
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
                <div 
                  className="absolute bottom-0 left-0 right-0 p-8"
                  style={{
                    background: `linear-gradient(to top, rgba(27, 66, 66, 0.9) 0%, transparent 100%)`
                  }}
                >
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ 
                      color: colors.text,
                      fontFamily: '"Conthrax", sans-serif',
                      fontWeight: 700
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ 
                      color: colors.light,
                      fontFamily: '"Conthrax", sans-serif',
                      fontWeight: 500
                    }}
                  >
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Navigation Arrows - Fixed Animation */}
            <motion.button
              onClick={() => {
                goToPrev();
                clearTimeout(timeoutRef.current);
                startAutoSlide();
              }}
              className="hidden sm:block absolute left-6 top-1/2 -translate-y-1/2 text-white w-12 h-12 rounded-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.dark} 0%, rgba(31, 96, 96, 0.8) 100%)`,
                ...glassStyle
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20
              }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ 
                scale: 1.1,
                background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.light} 100%)`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => {
                goToNext();
                clearTimeout(timeoutRef.current);
                startAutoSlide();
              }}
              className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 text-white w-12 h-12 rounded-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.dark} 0%, rgba(31, 96, 96, 0.8) 100%)`,
                ...glassStyle
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 20
              }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ 
                scale: 1.1,
                background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.light} 100%)`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Slide Indicators */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50'
                }`}
                style={{
                  background: index === currentIndex ? colors.medium : colors.light,
                  boxShadow: `0 0 8px ${index === currentIndex ? colors.medium : colors.light}`
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Gallery Description */}
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto p-8 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, rgba(27, 66, 66, 0.4) 0%, rgba(31, 96, 96, 0.4) 100%)`,
            ...glassStyle
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ 
              color: colors.text,
              fontFamily: '"Conthrax", sans-serif',
              fontWeight: 700
            }}
          >
            Memories That Last Forever
          </h3>
          <p 
            className="text-lg"
            style={{ 
              color: colors.light,
              fontFamily: '"Conthrax", sans-serif',
              fontWeight: 500
            }}
          >
            Every moment captured here tells a story of our journey together as a class. 
            From classroom activities to special events, these memories will be cherished for years to come.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GallerySlider;
