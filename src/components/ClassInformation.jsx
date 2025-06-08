import React from 'react';
import { motion } from 'framer-motion';
import Section from "./Section";

// Enhanced Luxe Mocha Color Theme
const colors = {
  dark: '#3E2C2C',       // Deep mocha
  medium: '#9A7B6E',     // Enhanced medium mocha (lighter)
  light: '#E8D5C5',      // Brushed cream
  accent: '#D4A373',     // Warm gold accent
  text: '#F8F3ED',       // Soft ivory text
  background: '#000000'  // Deep dark background
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(62, 44, 44, 0.25)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(214, 195, 179, 0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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

// React Component with Enhanced Futuristic UI
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
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.medium} 100%)`,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)'
        }}
        whileHover={{ 
          y: -5,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
          background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.dark} 100%)`
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg" style={{ color: colors.light }}>{student.name}</h3>
          {student.position && (
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.light} 100%)`,
                color: colors.dark,
                boxShadow: '0 2px 12px rgba(212, 163, 115, 0.4)'
              }}
            >
              {student.position}
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  renderOfficerCard(title, officer) {
    return (
      <motion.div
        className="rounded-2xl p-6 h-full transition-all duration-300"
        style={{
          background: `linear-gradient(145deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
          ...glassStyle
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
        }}
      >
        <h3 
          className="font-semibold mb-4 text-lg uppercase tracking-wider"
          style={{ 
            color: colors.accent,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          {title}
        </h3>
        {officer && this.renderStudentCard(officer)}
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
            background: colors.background,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(154, 123, 110, 0.1) 0%, transparent 50%)'
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
                className="text-5xl font-bold mb-6 tracking-tight"
                style={{ 
                  color: colors.light,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Class Structure
              </motion.h1>
              <motion.div 
                className="w-32 h-1 mx-auto"
                style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.medium})` }}
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
                className="text-xl font-semibold mb-8 uppercase tracking-wider"
                style={{ 
                  color: colors.accent,
                  letterSpacing: '2px'
                }}
              >
                Wali Kelas
              </h2>
              <motion.div
                className="inline-block rounded-2xl px-10 py-8 mx-auto"
                style={{
                  background: `linear-gradient(145deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
                  ...glassStyle
                }}
                whileHover={{ scale: 1.03 }}
              >
                <p 
                  className="text-2xl font-medium tracking-wide"
                  style={{ 
                    color: colors.light,
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
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
                  color: colors.accent,
                  letterSpacing: '2px'
                }}
              >
                Class Officers
              </h2>
              
              <div className="grid md:grid-cols-3 gap-10">
                {/* Class President */}
                {this.renderOfficerCard("Ketua Kelas", classPresident)}
                
                {/* Secretary */}
                {this.renderOfficerCard("Sekretaris", secretary)}
                
                {/* Treasurers */}
                <motion.div 
                  className="rounded-2xl p-6 h-full"
                  style={{
                    background: `linear-gradient(145deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
                    ...glassStyle
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 
                    className="font-semibold mb-6 text-lg uppercase tracking-wider"
                    style={{ 
                      color: colors.accent,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Bendahara
                  </h3>
                  {treasurers.map((treasurer, index) => 
                    <div key={index} className="mb-4 last:mb-0">
                      {this.renderStudentCard(treasurer)}
                    </div>
                  )}
                </motion.div>
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
                  color: colors.accent,
                  letterSpacing: '2px'
                }}
              >
                Students
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 rounded-3xl"
                style={{
                  background: `linear-gradient(145deg, rgba(62, 44, 44, 0.4) 0%, rgba(123, 94, 87, 0.4) 100%)`,
                  ...glassStyle
                }}
                whileHover={{ scale: 1.005 }}
              >
                {regularStudents.map((student, index) => 
                  this.renderStudentCard(student, index)
                )}
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
                  color: colors.accent,
                  letterSpacing: '2px'
                }}
              >
                Class Summary
              </h2>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 rounded-3xl"
                style={{
                  background: `linear-gradient(145deg, rgba(62, 44, 44, 0.4) 0%, rgba(123, 94, 87, 0.4) 100%)`,
                  ...glassStyle
                }}
                whileHover={{ scale: 1.005 }}
              >
                {[
                  { label: "Total Students", value: this.classData.getAllStudents().length },
                  { label: "Class Officers", value: this.classData.getAllStudents().length - regularStudents.length },
                  { label: "Male Students", value: 7 },
                  { label: "Female Students", value: 18 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl p-6 text-center transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
                    }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: '0 8px 28px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    <p 
                      className="text-sm uppercase tracking-wider mb-3" 
                      style={{ 
                        color: colors.accent,
                        letterSpacing: '1px'
                      }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-3xl font-bold" 
                      style={{ 
                        color: colors.light,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
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
