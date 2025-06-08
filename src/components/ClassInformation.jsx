import React from 'react';
import { motion } from 'framer-motion';
import Section from "./Section";

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

// React Component to Display Class Information
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
        className="bg-white rounded-lg shadow-md p-4 mb-3"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-800">{student.name}</h3>
          {student.position && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {student.position}
            </span>
          )}
        </div>
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
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-8">Class Structure</h1>
            
            {/* Teacher Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Wali Kelas</h2>
              <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
                <p className="text-lg font-medium">{this.classData.teacher.getFormattedName()}</p>
              </div>
            </div>

            {/* Class Officers */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Class Officers</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Class President */}
                <div className="bg-green-50 rounded-lg p-6 shadow-sm">
                  <h3 className="font-medium text-green-800 mb-2">Ketua Kelas</h3>
                  {classPresident && this.renderStudentCard(classPresident)}
                </div>
                
                {/* Secretary */}
                <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
                  <h3 className="font-medium text-purple-800 mb-2">Sekretaris</h3>
                  {secretary && this.renderStudentCard(secretary)}
                </div>
                
                {/* Treasurers */}
                <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
                  <h3 className="font-medium text-yellow-800 mb-2">Bendahara</h3>
                  {treasurers.map((treasurer, index) => 
                    this.renderStudentCard(treasurer, index)
                  )}
                </div>
              </div>
            </div>

            {/* Regular Students */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Students</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularStudents.map((student, index) => 
                  this.renderStudentCard(student, index)
                )}
              </div>
            </div>

            {/* Class Summary */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Class Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold">{this.classData.getAllStudents().length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Class Officers</p>
                  <p className="text-2xl font-bold">{this.classData.getAllStudents().length - regularStudents.length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Male Students</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Female Students</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    );
  }
}

export default ClassInformation;
