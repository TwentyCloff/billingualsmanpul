import React from 'react';
import { motion } from 'framer-motion';
import Section from "./Section";

// Sophisticated Plum Color Theme
const colors = {
  dark: '#1E1E2F',       // Deep plum
  medium: '#4C2A59',     // Royal purple
  light: '#9E4B8A',      // Vibrant plum
  accent: '#D67AB1',     // Subtle pink accent
  text: '#FFFFFF',       // Pure white
  background: '#121212', // Dark background
  highlight: '#C792DF',  // Soft highlight
  subtleGlow: 'rgba(214, 122, 177, 0.15)' // Subtle glow effect
};

// Refined Glassmorphism Effect
const glassStyle = {
  background: 'rgba(30, 30, 47, 0.2)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(158, 75, 138, 0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  borderRadius: '16px'
};

// Modern card style
const cardStyle = {
  background: `linear-gradient(145deg, rgba(30, 30, 47, 0.8) 0%, rgba(76, 42, 89, 0.8) 100%)`,
  ...glassStyle
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

// React Component with Professional UI
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
    const isTreasurer = student.position && student.position.includes('Bendahara');
    
    return (
      <motion.div
        key={index}
        className="rounded-xl p-4 mb-4 transition-all duration-300"
        style={{
          background: isTreasurer 
            ? `linear-gradient(135deg, ${colors.medium} 0%, ${colors.dark} 100%)`
            : `linear-gradient(135deg, ${colors.dark} 0%, ${colors.medium} 100%)`,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          border: isTreasurer ? `1px solid ${colors.accent}` : '1px solid transparent'
        }}
        whileHover={{ 
          y: -5,
          boxShadow: `0 8px 24px ${colors.subtleGlow}`,
          scale: isTreasurer ? 1.02 : 1.01
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg" style={{ 
            color: colors.text,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500
          }}>{student.name}</h3>
          {student.position && (
            <motion.span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: isTreasurer 
                  ? `linear-gradient(90deg, ${colors.accent} 0%, ${colors.light} 100%)`
                  : `linear-gradient(90deg, ${colors.light} 0%, ${colors.accent} 100%)`,
                color: colors.dark,
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600
              }}
              whileHover={{ scale: 1.05 }}
            >
              {student.position}
            </motion.span>
          )}
        </div>
      </motion.div>
    );
  }

  renderOfficerCard(title, officer) {
    return (
      <motion.div
        className="rounded-2xl p-6 h-full transition-all duration-300"
        style={cardStyle}
        whileHover={{ 
          scale: 1.02,
          boxShadow: `0 12px 28px ${colors.subtleGlow}`
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 
          className="font-semibold mb-4 text-lg uppercase tracking-wider"
          style={{ 
            color: colors.accent,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px'
          }}
        >
          {title}
        </h3>
        {officer && this.renderStudentCard(officer)}
      </motion.div>
    );
  }

  renderTreasurerSection() {
    const treasurers = this.classData.getTreasurers();
    
    return (
      <motion.div 
        className="rounded-2xl p-6 h-full"
        style={cardStyle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h3 
          className="font-semibold mb-6 text-lg uppercase tracking-wider"
          style={{ 
            color: colors.accent,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px'
          }}
        >
          BENDAHARA
        </h3>
        <div className="space-y-4">
          {treasurers.map((treasurer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
            >
              {this.renderStudentCard(treasurer, index)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  render() {
    const classPresident = this.classData.getClassPresident();
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-20">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ 
                  color: colors.text,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                CLASS STRUCTURE
              </motion.h1>
              <motion.div 
                className="w-24 h-1 mx-auto"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.accent}, ${colors.light})`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              ></motion.div>
            </div>

            {/* Teacher Section */}
            <motion.div 
              className="mb-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-lg font-semibold mb-8 uppercase tracking-wider"
                style={{ 
                  color: colors.accent,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600
                }}
              >
                WALI KELAS
              </h2>
              <motion.div
                className="inline-block rounded-2xl px-8 py-6 mx-auto"
                style={cardStyle}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p 
                  className="text-xl md:text-2xl font-medium"
                  style={{ 
                    color: colors.text,
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500
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
                className="text-lg font-semibold mb-12 text-center uppercase tracking-wider"
                style={{ 
                  color: colors.accent,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600
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
                {this.renderTreasurerSection()}
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
                className="text-lg font-semibold mb-12 text-center uppercase tracking-wider"
                style={{ 
                  color: colors.accent,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600
                }}
              >
                STUDENTS
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 rounded-3xl"
                style={cardStyle}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3 }}
              >
                {regularStudents.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
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
                className="text-lg font-semibold mb-12 text-center uppercase tracking-wider"
                style={{ 
                  color: colors.accent,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600
                }}
              >
                CLASS SUMMARY
              </h2>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-5 p-8 rounded-3xl"
                style={cardStyle}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3 }}
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
                      background: `linear-gradient(135deg, rgba(30, 30, 47, 0.8) 0%, rgba(76, 42, 89, 0.8) 100%)`,
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                    }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: `0 8px 24px ${colors.subtleGlow}`
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <p 
                      className="text-xs uppercase tracking-wider mb-3" 
                      style={{ 
                        color: colors.accent,
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-2xl font-bold" 
                      style={{ 
                        color: colors.text,
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600
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
