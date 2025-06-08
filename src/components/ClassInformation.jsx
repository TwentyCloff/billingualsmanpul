import React from 'react';
import { motion } from 'framer-motion';
import Section from "./Section";

// Dark Elegant Color Theme
const colors = {
  dark: '#1A1A2E',       // Deep navy
  medium: '#2A2A4A',     // Medium navy
  light: '#4E4E8D',      // Soft purple
  accent: '#D67AB1',     // Subtle pink accent
  text: '#F0F0F0',       // Off-white
  background: '#121212', // Dark but not pure black
  highlight: '#6A4C93',  // Soft highlight
};

// Glass Card Style
const cardStyle = {
  background: 'rgba(26, 26, 46, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(78, 78, 141, 0.2)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
};

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
}

class Student {
  constructor(name, position = null) {
    this.name = name;
    this.position = position;
  }
}

class Teacher {
  constructor(name, qualification) {
    this.name = name;
    this.qualification = qualification;
  }
}

class ClassInformation extends React.Component {
  constructor(props) {
    super(props);
    
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

  renderStudentItem(student, index) {
    return (
      <motion.div
        key={index}
        className="px-4 py-3 rounded-lg mb-2"
        style={{
          background: colors.medium,
          borderLeft: student.position ? `3px solid ${colors.accent}` : 'none'
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: colors.text }}>{student.name}</span>
          {student.position && (
            <span className="text-xs px-2 py-1 rounded" 
              style={{ 
                background: colors.highlight,
                color: colors.text
              }}>
              {student.position}
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  renderOfficerSection(title, officer) {
    return (
      <motion.div
        className="p-4 rounded-xl mb-6"
        style={cardStyle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h3 className="text-sm font-medium mb-3 uppercase tracking-wider" 
          style={{ color: colors.accent }}>
          {title}
        </h3>
        {officer && this.renderStudentItem(officer)}
      </motion.div>
    );
  }

  render() {
    const { teacher, students } = this.classData;
    const classPresident = this.classData.getClassPresident();
    const treasurers = this.classData.getTreasurers();
    const secretary = this.classData.getSecretary();
    const regularStudents = this.classData.getRegularStudents();

    return (
      <Section id="class-structure">
        <div className="py-12 px-4" style={{ background: colors.background }}>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-medium mb-4" style={{ color: colors.text }}>
                Struktur Kelas
              </h1>
              <div className="w-16 h-0.5 mx-auto" style={{ background: colors.accent }}></div>
            </motion.div>

            {/* Teacher */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-wider mb-3" style={{ color: colors.accent }}>
                Wali Kelas
              </h2>
              <div className="inline-block px-6 py-4 rounded-lg" style={cardStyle}>
                <p style={{ color: colors.text }}>{teacher.name} {teacher.qualification}</p>
              </div>
            </motion.div>

            {/* Officers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {this.renderOfficerSection("Ketua Kelas", classPresident)}
              {this.renderOfficerSection("Sekretaris", secretary)}
              
              {/* Treasurers */}
              <motion.div
                className="p-4 rounded-xl"
                style={cardStyle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="text-sm font-medium mb-3 uppercase tracking-wider" 
                  style={{ color: colors.accent }}>
                  Bendahara
                </h3>
                {treasurers.map((treasurer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {this.renderStudentItem(treasurer, index)}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Students List */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-medium mb-4 uppercase tracking-wider text-center" 
                style={{ color: colors.accent }}>
                Anggota Kelas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regularStudents.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {this.renderStudentItem(student, index)}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { label: "Total Siswa", value: students.length },
                { label: "Pengurus", value: students.length - regularStudents.length },
                { label: "Laki-laki", value: 7 },
                { label: "Perempuan", value: 18 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-3 rounded-lg text-center"
                  style={{ background: colors.medium }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs mb-1" style={{ color: colors.accent }}>{item.label}</p>
                  <p className="text-lg font-medium" style={{ color: colors.text }}>{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>
    );
  }
}

export default ClassInformation;
