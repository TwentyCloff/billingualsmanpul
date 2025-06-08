import React from 'react';
import { motion } from 'framer-motion';
import Section from "./Section";

// Luxe Mocha Color Theme
const colors = {
  dark: '#3E2C2C',
  medium: '#7B5E57',
  light: '#D6C3B3',
  accent: '#C4A484',
  text: '#F5F0E6'
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(62, 44, 44, 0.25)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(214, 195, 179, 0.18)'
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

// React Component with Futuristic UI
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
        className="rounded-xl p-4 mb-4"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.medium} 100%)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)'
        }}
        whileHover={{ 
          y: -5,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)'
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
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
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
        className="rounded-2xl p-6 h-full"
        style={{
          background: `linear-gradient(145deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
          ...glassStyle
        }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 
          className="font-semibold mb-4 text-lg uppercase tracking-wider"
          style={{ color: colors.accent }}
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
          className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
          style={{
            background: `linear-gradient(135deg, ${colors.dark} 0%, #2A1E1E 100%)`
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h1 
                className="text-5xl font-bold mb-4 tracking-tight"
                style={{ color: colors.light }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Class Structure
              </motion.h1>
              <div className="w-24 h-1 mx-auto mb-6" style={{ background: colors.accent }}></div>
            </div>

            {/* Teacher Section */}
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-6 uppercase tracking-wider"
                style={{ color: colors.accent }}
              >
                Wali Kelas
              </h2>
              <div 
                className="inline-block rounded-2xl px-8 py-6 mx-auto"
                style={{
                  background: `linear-gradient(145deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
                  ...glassStyle
                }}
              >
                <p 
                  className="text-2xl font-medium tracking-wide"
                  style={{ color: colors.light }}
                >
                  {this.classData.teacher.getFormattedName()}
                </p>
              </div>
            </motion.div>

            {/* Class Officers */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-8 text-center uppercase tracking-wider"
                style={{ color: colors.accent }}
              >
                Class Officers
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Class President */}
                {this.renderOfficerCard("Ketua Kelas", classPresident)}
                
                {/* Secretary */}
                {this.renderOfficerCard("Sekretaris", secretary)}
                
                {/* Treasurers */}
                <div 
                  className="rounded-2xl p-6 h-full"
                  style={{
                    background: `linear-gradient(145deg, rgba(62, 44, 44, 0.7) 0%, rgba(123, 94, 87, 0.7) 100%)`,
                    ...glassStyle
                  }}
                >
                  <h3 
                    className="font-semibold mb-4 text-lg uppercase tracking-wider"
                    style={{ color: colors.accent }}
                  >
                    Bendahara
                  </h3>
                  {treasurers.map((treasurer, index) => 
                    <div key={index} className="mb-3 last:mb-0">
                      {this.renderStudentCard(treasurer)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Regular Students */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-semibold mb-8 text-center uppercase tracking-wider"
                style={{ color: colors.accent }}
              >
                Students
              </h2>
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 rounded-3xl"
                style={{
                  background: `linear-gradient(145deg, rgba(62, 44, 44, 0.5) 0%, rgba(123, 94, 87, 0.5) 100%)`,
                  ...glassStyle
                }}
              >
                {regularStudents.map((student, index) => 
                  this.renderStudentCard(student, index)
                )}
              </div>
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
                className="text-xl font-semibold mb-8 text-center uppercase tracking-wider"
                style={{ color: colors.accent }}
              >
                Class Summary
              </h2>
              <div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl"
                style={{
                  background: `linear-gradient(145deg, rgba(62, 44, 44, 0.5) 0%, rgba(123, 94, 87, 0.5) 100%)`,
                  ...glassStyle
                }}
              >
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.dark} 100%)`
                  }}
                >
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: colors.accent }}>Total Students</p>
                  <p className="text-3xl font-bold" style={{ color: colors.light }}>{this.classData.getAllStudents().length}</p>
                </div>
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.dark} 100%)`
                  }}
                >
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: colors.accent }}>Class Officers</p>
                  <p className="text-3xl font-bold" style={{ color: colors.light }}>{this.classData.getAllStudents().length - regularStudents.length}</p>
                </div>
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.dark} 100%)`
                  }}
                >
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: colors.accent }}>Male Students</p>
                  <p className="text-3xl font-bold" style={{ color: colors.light }}>7</p>
                </div>
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.dark} 100%)`
                  }}
                >
                  <p className="text-sm uppercase tracking-wider mb-2" style={{ color: colors.accent }}>Female Students</p>
                  <p className="text-3xl font-bold" style={{ color: colors.light }}>18</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    );
  }
}

export default ClassInformation;
