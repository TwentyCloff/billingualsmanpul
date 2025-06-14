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
    <section className="overflow-hidden bg-black w-full min-h-screen py-12 px-4" id="gallery">
      <div className="max-w-4xl mx-auto">
        {/* Gallery Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Our Gallery</h2>
          <p className="text-gray-300">It contains the memories that are in our class.</p>
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


ubah jadi style yang ada di kode ini, ukuran font dan fontnya samakan aja :


import React from 'react';
import { motion } from 'framer-motion';
import Section from "./Section";

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

// Main Class Structure
class SchoolClass {
  constructor(teacher, students) {
    this.teacher = teacher;
    this.students = students;
  }

  getClassPresident() {
    return this.students.find(student => student.position === 'Ketua Kelas');
  }

  getTreasurers() {
    return this.students.filter(student => student.position && student.position.includes('Bendahara'));
  }

  getSecretary() {
    return this.students.find(student => student.position === 'Sekretaris');
  }

  getRegularStudents() {
    return this.students.filter(student => !student.position);
  }

  getAllStudents() {
    return this.students;
  }
}

// Student Class
class Student {
  constructor(name, position = null) {
    this.name = name;
    this.position = position;
  }

  getRole() {
    return this.position || 'Siswa';
  }
}

// Teacher Class
class Teacher {
  constructor(name, qualification) {
    this.name = name;
    this.qualification = qualification;
  }

  getFormattedName() {
    return `${this.name} ${this.qualification}`;
  }
}

// React Component with Velvet Teal UI
class ClassInformation extends React.Component {
  constructor(props) {
    super(props);
    
    // Initialize class data
    const teacher = new Teacher("Amin Abdi Luhur", "S.pd");
    
    const students = [
      new Student("Alicia Shofi Destiani"),
      new Student("Dahlia Puspita Ghaniaty"),
      new Student("Dara Veronika Tariggas", "Bendahara 1"),
      new Student("Fairuz Sahla Fallugah"),
      new Student("Farid Ulya Firjatullah"),
      new Student("Fathul Faigan Alfi"),
      new Student("Fredy Gabriell Tanjaya"),
      new Student("Kalinda Pradipa", "Bendahara 2"),
      new Student("Kania Permata Widra", "Sekretaris"),
      new Student("Keisya Ramadhani Huuriyah"),
      new Student("Kenzo Alvaro Bautista"),
      new Student("Keysha Aulia"),
      new Student("Kiran Adhya Narisha"),
      new Student("Juliandika"),
      new Student("Muhammad Fakhar"),
      new Student("Nadine Rannu Gracia", "Ketua Kelas"),
      new Student("Rahadatul Aisy Hadraini"),
      new Student("Raden Mecca Puti A"),
      new Student("Raisya Permata Intania W"),
      new Student("Salsabiela Azzahra B"),
      new Student("Sandi Gunawan"),
      new Student("Shabrina Aqela"),
      new Student("Syaira Parifasha"),
      new Student("Syifa Azzahra Rifai"),
      new Student("Utin Muzfira Amira Fenisa")
    ];
    
    this.classData = new SchoolClass(teacher, students);
  }

  renderStudentCard(student, index) {
    return (
      <motion.div
        key={index}
        className="rounded-xl p-4 mb-4 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, rgba(31, 96, 96, 0.8) 100%)`,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)'
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ 
          y: -8,
          scale: 1.03,
          boxShadow: `0 12px 32px ${colors.medium}40`,
          background: `linear-gradient(135deg, rgba(31, 96, 96, 0.8) 0%, ${colors.dark} 100%)`
        }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg" style={{ 
            color: colors.text,
            fontFamily: '"Conthrax", sans-serif',
            fontWeight: 600
          }}>{student.name}</h3>
          {student.position && (
            <motion.span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.medium} 0%, ${colors.light} 100%)`,
                color: colors.dark,
                boxShadow: `0 2px 12px ${colors.medium}80`,
                fontFamily: '"Conthrax", sans-serif',
                fontWeight: 700
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {student.position}
            </motion.span>
          )}
        </div>
      </motion.div>
    );
  }

  renderOfficerCard(title, officer, isTreasurer = false) {
    return (
      <motion.div
        className="rounded-2xl p-6 h-full transition-all duration-300"
        style={{
          background: `linear-gradient(145deg, rgba(27, 66, 66, 0.7) 0%, rgba(31, 96, 96, 0.7) 100%)`,
          ...glassStyle
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: `0 12px 40px ${colors.medium}40`
        }}
        transition={{ duration: 0.5 }}
      >
        <h3 
          className="font-semibold mb-4 text-lg uppercase tracking-wider"
          style={{ 
            color: colors.light,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontFamily: '"Conthrax", sans-serif',
            fontWeight: 700,
            letterSpacing: '1.5px'
          }}
        >
          {title}
        </h3>
        {isTreasurer ? (
          officer.map((treasurer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {this.renderStudentCard(treasurer)}
            </motion.div>
          ))
        ) : (
          officer && this.renderStudentCard(officer)
        )}
      </motion.div>
    );
  }

  render() {
    const classPresident = this.classData.getClassPresident();
    const treasurers = this.classData.getTreasurers();
    const secretary = this.classData.getSecretary();
    const regularStudents = this.classData.getRegularStudents();

    return (
      <Section id="class-structure">
        <div 
          className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
          style={{
            background: colors.background
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-20">
              <motion.h1 
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
                CLASS STRUCTURE
              </motion.h1>
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
            </div>

            {/* Teacher Section */}
            <motion.div 
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-8 uppercase tracking-wider"
                style={{ 
                  color: colors.light,
                  letterSpacing: '2px',
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700
                }}
              >
                WALI KELAS
              </h2>
              <motion.div
                className="inline-block rounded-2xl px-10 py-8 mx-auto"
                style={{
                  background: `linear-gradient(145deg, rgba(27, 66, 66, 0.7) 0%, rgba(31, 96, 96, 0.7) 100%)`,
                  ...glassStyle
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <p 
                  className="text-2xl font-medium tracking-wide"
                  style={{ 
                    color: colors.text,
                    textShadow: `0 0 10px ${colors.medium}80`,
                    fontFamily: '"Conthrax", sans-serif',
                    fontWeight: 600
                  }}
                >
                  {this.classData.teacher.getFormattedName()}
                </p>
              </motion.div>
            </motion.div>

            {/* Class Officers */}
            <motion.div 
              className="mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-12 text-center uppercase tracking-wider"
                style={{ 
                  color: colors.light,
                  letterSpacing: '2px',
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700
                }}
              >
                CLASS OFFICERS
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Class President */}
                {this.renderOfficerCard("KETUA KELAS", classPresident)}
                
                {/* Secretary */}
                {this.renderOfficerCard("SEKRETARIS", secretary)}
                
                {/* Treasurers */}
                {this.renderOfficerCard("BENDAHARA", treasurers, true)}
              </div>
            </motion.div>

            {/* Regular Students */}
            <motion.div 
              className="mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-12 text-center uppercase tracking-wider"
                style={{ 
                  color: colors.light,
                  letterSpacing: '2px',
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700
                }}
              >
                STUDENTS
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 rounded-3xl"
                style={{
                  background: `linear-gradient(145deg, rgba(27, 66, 66, 0.4) 0%, rgba(31, 96, 96, 0.4) 100%)`,
                  ...glassStyle
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {regularStudents.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {this.renderStudentCard(student, index)}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Class Summary */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-12 text-center uppercase tracking-wider"
                style={{ 
                  color: colors.light,
                  letterSpacing: '2px',
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700
                }}
              >
                CLASS SUMMARY
              </h2>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-5 p-8 rounded-3xl"
                style={{
                  background: `linear-gradient(145deg, rgba(27, 66, 66, 0.4) 0%, rgba(31, 96, 96, 0.4) 100%)`,
                  ...glassStyle
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {[
                  { label: "TOTAL STUDENTS", value: this.classData.getAllStudents().length },
                  { label: "CLASS OFFICERS", value: this.classData.getAllStudents().length - regularStudents.length },
                  { label: "MALE STUDENTS", value: 7 },
                  { label: "FEMALE STUDENTS", value: 18 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl p-5 text-center transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, rgba(27, 66, 66, 0.7) 0%, rgba(31, 96, 96, 0.7) 100%)`,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.05,
                      boxShadow: `0 8px 28px ${colors.medium}40`
                    }}
                  >
                    <p 
                      className="text-sm uppercase tracking-wider mb-3" 
                      style={{ 
                        color: colors.light,
                        letterSpacing: '1px',
                        fontFamily: '"Conthrax", sans-serif',
                        fontWeight: 600
                      }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-3xl font-bold" 
                      style={{ 
                        color: colors.text,
                        textShadow: `0 0 10px ${colors.medium}80`,
                        fontFamily: '"Conthrax", sans-serif',
                        fontWeight: 800
                      }}
                    >
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    );
  }
}

export default ClassInformation;
