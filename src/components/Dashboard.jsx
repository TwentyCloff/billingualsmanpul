import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  where,
  deleteDoc
} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Original Velvet Teal Color Theme
const colors = {
  dark: '#1B4242',
  medium: '#4FBDBA',
  light: '#CDEED6',
  text: '#FFFFFF',
  background: '#000000',
  success: '#2ECC71',
  warning: '#F39C12',
  danger: '#E74C3C',
  info: '#3498DB'
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(27, 66, 66, 0.25)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(79, 189, 186, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  borderRadius: '16px'
};

// Student data with numbers
const students = [
  { name: "1. Alicia Shofi Destiani", number: 1 },
  { name: "2. Dahlia Puspita Ghaniaty", number: 2 },
  { name: "3. Dara Veronika Tariggas", number: 3 },
  { name: "4. Fairuz Sahla Fallugah", number: 4 },
  { name: "5. Farid Ulya Firjatullah", number: 5 },
  { name: "6. Fathul Faigan Alfi", number: 6 },
  { name: "7. Fredy Gabriell Tanjaya", number: 7 },
  { name: "8. Kalinda Pradipa", number: 8 },
  { name: "9. Kania Permata Widra", number: 9 },
  { name: "10. Keisya Ramadhani Huuriyah", number: 10 },
  { name: "11. Kenzo Alvaro Bautista", number: 11 },
  { name: "12. Keysha Aulia", number: 12 },
  { name: "13. Kiran Adhya Narisha", number: 13 },
  { name: "14. Juliandika", number: 14 },
  { name: "15. Muhammad Fakhar", number: 15 },
  { name: "16. Nadine Rannu Gracia", number: 16 },
  { name: "17. Rahadatul Aisy Hadraini", number: 17 },
  { name: "18. Raden Mecca Puti A", number: 18 },
  { name: "19. Raisya Permata Intania W", number: 19 },
  { name: "20. Salsabiela Azzahra B", number: 20 },
  { name: "21. Sandi Gunawan", number: 21 },
  { name: "22. Shabrina Aqela", number: 22 },
  { name: "23. Syaira Parifasha", number: 23 },
  { name: "24. Syifa Azzahra Rifai", number: 24 },
  { name: "25. Utin Muzfira Amira Fenisa", number: 25 }
];

// Status colors
const statusColors = {
  Hadir: colors.success,
  Sakit: colors.warning,
  Izin: colors.info,
  Alpha: colors.danger,
  'Sudah Bayar': colors.success,
  'Belum Bayar': colors.danger,
  'Sudah Piket': colors.success,
  'Belum Piket': colors.danger
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('absensi');
  const [absensiHariIni, setAbsensiHariIni] = useState({});
  const [historiAbsensi, setHistoriAbsensi] = useState([]);
  const [rekapAbsensi, setRekapAbsensi] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [uangKas, setUangKas] = useState({});
  const [historiUangKas, setHistoriUangKas] = useState([]);
  const [rekapUangKas, setRekapUangKas] = useState({});
  const [daftarPiket, setDaftarPiket] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentWeek, setPaymentWeek] = useState('Minggu 1');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [totalKas, setTotalKas] = useState(0);
  const [kasHariIni, setKasHariIni] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [selectedPiketDay, setSelectedPiketDay] = useState('Senin');
  const [searchStudent, setSearchStudent] = useState('');

  // Firebase collections
  const absensiRef = collection(db, 'absensi');
  const uangKasRef = collection(db, 'uangKas');
  const piketRef = collection(db, 'piket');
  const historiAbsensiRef = collection(db, 'historiAbsensi');
  const historiUangKasRef = collection(db, 'historiUangKas');
  const kasRef = collection(db, 'kas');

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return 'Rp0';
    return 'Rp' + parseInt(value).toLocaleString('id-ID');
  };

  // Parse currency input
  const parseCurrency = (value) => {
    return parseInt(value.replace(/\D/g, '')) || 0;
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Initialize data on first load
  useEffect(() => {
    if (!user) return;

    const initializeData = async () => {
      // Check if today's attendance already exists
      const todayQuery = query(historiAbsensiRef, where('date', '==', currentDate));
      const todaySnapshot = await getDocs(todayQuery);
      
      if (todaySnapshot.empty) {
        // Initialize today's attendance
        const todayAbsensi = {};
        students.forEach(student => {
          todayAbsensi[student.name] = 'Hadir';
        });
        setAbsensiHariIni(todayAbsensi);
        setIsSaved(false);
      } else {
        setIsSaved(true);
        // Load today's attendance
        const todayAbsensi = {};
        todaySnapshot.forEach(doc => {
          todayAbsensi[doc.data().student] = doc.data().status;
        });
        setAbsensiHariIni(todayAbsensi);
      }

      // Initialize payments
      const uangKasData = {};
      students.forEach(student => {
        uangKasData[student.name] = {
          status: 'Belum Bayar',
          amount: 0,
          week: 'Minggu 1'
        };
      });
      setUangKas(uangKasData);
    };

    initializeData();
  }, [user, currentDate]);

  // Load real-time data
  useEffect(() => {
    if (!user) return;

    // Load attendance history
    const unsubHistoriAbsensi = onSnapshot(
      query(historiAbsensiRef, orderBy('date', 'desc')), 
      (snapshot) => {
        setHistoriAbsensi(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    // Load payment history
    const unsubHistoriUangKas = onSnapshot(
      query(historiUangKasRef, orderBy('timestamp', 'desc')), 
      (snapshot) => {
        setHistoriUangKas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    // Load cleaning schedule
    const unsubPiket = onSnapshot(piketRef, (snapshot) => {
      setDaftarPiket(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Load kas summary
    const unsubKas = onSnapshot(kasRef, (snapshot) => {
      let total = 0;
      let pengeluaran = 0;
      let todayIncome = 0;
      const today = new Date().toISOString().split('T')[0];
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const docDate = new Date(data.timestamp?.seconds * 1000).toISOString().split('T')[0];
        
        if (data.type === 'pemasukan') {
          total += data.amount;
          if (docDate === today) {
            todayIncome += data.amount;
          }
        } else {
          pengeluaran += data.amount;
          total -= data.amount;
        }
      });
      
      setTotalKas(total);
      setTotalPengeluaran(pengeluaran);
      setKasHariIni(todayIncome);
    });

    return () => {
      unsubHistoriAbsensi();
      unsubHistoriUangKas();
      unsubPiket();
      unsubKas();
    };
  }, [user]);

  // Calculate attendance summary
  useEffect(() => {
    const summary = {};
    students.forEach(student => {
      summary[student.name] = {
        Hadir: 0,
        Sakit: 0,
        Izin: 0,
        Alpha: 0
      };
    });

    historiAbsensi.forEach(record => {
      if (summary[record.student]) {
        summary[record.student][record.status]++;
      }
    });

    setRekapAbsensi(summary);
  }, [historiAbsensi]);

  // Calculate payment summary
  useEffect(() => {
    const summary = {};
    students.forEach(student => {
      summary[student.name] = {
        total: 0,
        weeks: {}
      };
    });

    historiUangKas.forEach(record => {
      if (summary[record.student] && record.status === 'Sudah Bayar') {
        summary[record.student].total += record.amount;
        if (!summary[record.student].weeks[record.week]) {
          summary[record.student].weeks[record.week] = 0;
        }
        summary[record.student].weeks[record.week] += record.amount;
      }
    });

    setRekapUangKas(summary);
  }, [historiUangKas]);

  // Handle attendance submission
  const submitAbsensi = async () => {
    try {
      const batch = [];
      
      students.forEach(student => {
        const docRef = doc(historiAbsensiRef, `${currentDate}_${student.name}`);
        batch.push(
          setDoc(docRef, {
            student: student.name,
            status: absensiHariIni[student.name] || 'Hadir',
            date: currentDate,
            timestamp: serverTimestamp()
          })
        );
      });

      await Promise.all(batch);
      setIsSaved(true);
      alert('Absensi berhasil disimpan!');
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert('Gagal menyimpan absensi');
    }
  };

  // Handle edit attendance
  const editAbsensi = async () => {
    try {
      // Delete existing records for this date
      const q = query(historiAbsensiRef, where('date', '==', currentDate));
      const querySnapshot = await getDocs(q);
      
      const deleteBatch = [];
      querySnapshot.forEach((doc) => {
        deleteBatch.push(deleteDoc(doc.ref));
      });
      
      await Promise.all(deleteBatch);
      
      // Save new records
      await submitAbsensi();
      setEditMode(false);
    } catch (error) {
      console.error("Error editing attendance:", error);
      alert('Gagal mengedit absensi');
    }
  };

  // Open payment modal
  const openPaymentModal = (student, week) => {
    setCurrentStudent(student);
    setPaymentAmount('');
    setPaymentWeek(week);
    setShowPaymentModal(true);
  };

  // Handle payment submission
  const submitUangKas = async () => {
    try {
      if (!paymentAmount) {
        alert('Masukkan nominal yang valid');
        return;
      }
      
      const amount = parseCurrency(paymentAmount);
      if (amount <= 0) {
        alert('Nominal harus lebih dari 0');
        return;
      }
      
      const docId = `${Date.now()}_${currentStudent}`;
      
      await setDoc(doc(historiUangKasRef, docId), {
        student: currentStudent,
        status: 'Sudah Bayar',
        amount: amount,
        week: paymentWeek,
        timestamp: serverTimestamp()
      };
      
      // Add to kas
      await setDoc(doc(kasRef, docId), {
        type: 'pemasukan',
        amount: amount,
        description: `Pembayaran kas dari ${currentStudent} (${paymentWeek})`,
        timestamp: serverTimestamp()
      };
      
      setShowPaymentModal(false);
      alert('Pembayaran berhasil disimpan!');
    } catch (error) {
      console.error("Error saving payment:", error);
      alert('Gagal menyimpan pembayaran');
    }
  };

  // Handle expense submission
  const submitPengeluaran = async () => {
    try {
      if (!expenseAmount || !expenseDescription) {
        alert('Masukkan nominal dan keterangan yang valid');
        return;
      }
      
      const amount = parseCurrency(expenseAmount);
      if (amount <= 0) {
        alert('Nominal harus lebih dari 0');
        return;
      }
      
      const docId = `expense_${Date.now()}`;
      
      await setDoc(doc(kasRef, docId), {
        type: 'pengeluaran',
        amount: amount,
        description: expenseDescription,
        timestamp: serverTimestamp()
      };
      
      setShowExpenseModal(false);
      setExpenseAmount('');
      setExpenseDescription('');
      alert('Pengeluaran berhasil dicatat!');
    } catch (error) {
      console.error("Error saving expense:", error);
      alert('Gagal mencatat pengeluaran');
    }
  };

  // Handle belum piket submission
  const submitBelumPiket = async (day, student) => {
    try {
      const docId = `${day}_${Date.now()}_${student}`;
      
      await setDoc(doc(piketRef, docId), {
        name: student,
        day: day,
        status: 'Belum Piket',
        timestamp: serverTimestamp()
      };
      
      setShowStudentModal(false);
      setSearchStudent('');
      alert(`${student} belum piket pada hari ${day}`);
    } catch (error) {
      console.error("Error saving belum piket:", error);
      alert('Gagal menyimpan data belum piket');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Status badge component
  const StatusBadge = ({ status }) => (
    <span 
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: statusColors[status] || colors.dark,
        color: colors.text
      }}
    >
      {status}
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: colors.background }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-t-transparent"
          style={{ borderColor: colors.medium }}
        ></motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ background: colors.background }}>
        <motion.div 
          className="p-8 rounded-2xl text-center max-w-md w-full"
          style={glassStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
            Akses Ditolak
          </h2>
          <p className="mb-6" style={{ color: colors.light }}>
            Anda harus login terlebih dahulu untuk mengakses dashboard ini.
          </p>
          <a 
            href="/login" 
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ 
              background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
              color: colors.text,
              display: 'inline-block'
            }}
          >
            Ke Halaman Login
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      {/* Header */}
      <header className="p-6" style={glassStyle}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            Dashboard Sekretaris XI-A Bilingual
          </h1>
          <button 
            onClick={() => signOut(auth)}
            className="px-4 py-2 rounded-lg text-sm"
            style={{ 
              background: `linear-gradient(135deg, ${colors.dark}, rgba(31, 96, 96, 0.8))`,
              color: colors.text
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex mb-8 border-b" style={{ borderColor: colors.dark }}>
          {['absensi', 'uang kas', 'daftar piket'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium text-sm uppercase tracking-wider relative ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: colors.medium }}
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Attendance Tab */}
          {activeTab === 'absensi' && (
            <>
              {/* Today's Attendance Card */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                    Absensi Hari Ini ({formatDate(currentDate)})
                  </h2>
                  <div className="flex items-center gap-4">
                    <input
                      type="date"
                      value={currentDate}
                      onChange={(e) => setCurrentDate(e.target.value)}
                      className="px-3 py-1 rounded"
                      style={{ 
                        background: colors.dark,
                        color: colors.text,
                        borderColor: colors.medium
                      }}
                    />
                    {isSaved ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditMode(true)}
                          className="px-4 py-1 rounded font-medium flex items-center gap-1"
                          style={{ 
                            background: colors.warning,
                            color: colors.text
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={submitAbsensi}
                        className="px-4 py-1 rounded font-medium"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
                          color: colors.text
                        }}
                      >
                        Simpan Absensi
                      </button>
                    )}
                  </div>
                </div>

                {isSaved ? (
                  <div className="text-center py-8">
                    <p style={{ color: colors.text }}>Absensi hari ini sudah dilakukan</p>
                    {editMode && (
                      <p className="text-xs mt-2" style={{ color: colors.warning }}>
                        Mode edit aktif. Perubahan akan mengganti data sebelumnya.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
                    {students.map((student) => (
                      <div 
                        key={student.name} 
                        className="p-3 rounded-lg flex justify-between items-center"
                        style={{ background: colors.dark }}
                      >
                        <p style={{ color: colors.text }}>{student.name}</p>
                        <select
                          value={absensiHariIni[student.name] || 'Hadir'}
                          onChange={(e) => setAbsensiHariIni({
                            ...absensiHariIni,
                            [student.name]: e.target.value
                          })}
                          className="px-2 py-1 rounded text-sm"
                          style={{ 
                            background: colors.background,
                            color: colors.text,
                            borderColor: colors.medium
                          }}
                        >
                          {['Hadir', 'Sakit', 'Izin', 'Alpha'].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attendance History Card */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
                  Histori Absensi ({formatDate(currentDate)})
                </h2>
                {historiAbsensi.filter(record => record.date === currentDate).length === 0 ? (
                  <div className="text-center py-8" style={{ color: colors.text }}>
                    Belum Ada Histori Absensi Hari Ini
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottomColor: colors.dark }}>
                          <th className="py-3 px-4 text-left" style={{ color: colors.text }}>No</th>
                          <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Nama Siswa</th>
                          <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historiAbsensi
                          .filter(record => record.date === currentDate)
                          .map((record, index) => (
                            <tr key={index} style={{ borderBottomColor: colors.dark }}>
                              <td className="py-3 px-4" style={{ color: colors.text }}>
                                {index + 1}
                              </td>
                              <td className="py-3 px-4" style={{ color: colors.text }}>{record.student}</td>
                              <td className="py-3 px-4">
                                <StatusBadge status={record.status} />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Attendance Summary Card */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
                  Rekap Absensi
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>No</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Hadir</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Sakit</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Izin</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Alpha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student.number}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student.name}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student.name]?.Hadir || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student.name]?.Sakit || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student.name]?.Izin || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student.name]?.Alpha || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Payment Tab */}
          {activeTab === 'uang kas' && (
            <>
              {/* Kas Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl" style={glassStyle}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                      Total Kas
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.success}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold mt-2" style={{ color: colors.text }}>
                    {formatCurrency(totalKas)}
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl" style={glassStyle}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                      Kas Masuk Hari Ini
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.success}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold mt-2" style={{ color: colors.text }}>
                    {formatCurrency(kasHariIni)}
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl" style={glassStyle}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                      Total Pengeluaran
                    </h3>
                    <button
                      onClick={() => setShowExpenseModal(true)}
                      className="p-1 rounded-full"
                      style={{ 
                        background: colors.danger,
                        color: colors.text
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-2xl font-bold mt-2" style={{ color: colors.text }}>
                    {formatCurrency(totalPengeluaran)}
                  </p>
                </div>
              </div>

              {/* Current Payments */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                    Pembayaran Siswa
                  </h2>
                  <div className="flex items-center gap-2">
                    <select
                      value={paymentWeek}
                      onChange={(e) => setPaymentWeek(e.target.value)}
                      className="px-3 py-1 rounded text-sm"
                      style={{ 
                        background: colors.dark,
                        color: colors.text,
                        borderColor: colors.medium
                      }}
                    >
                      {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map((week) => (
                        <option key={week} value={week}>{week}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {students.map((student, index) => {
                    const payment = historiUangKas.find(
                      p => p.student === student.name && p.week === paymentWeek
                    );
                    
                    return (
                      <div 
                        key={index} 
                        className="p-4 rounded-xl flex justify-between items-center"
                        style={{ 
                          background: colors.dark,
                          border: `1px solid ${payment ? colors.medium : colors.danger}`
                        }}
                      >
                        <div>
                          <p className="font-medium truncate" style={{ color: colors.text }}>
                            {student.name.split(' ')[0]}
                          </p>
                          <p className="text-xs" style={{ color: colors.text }}>
                            {paymentWeek}
                          </p>
                        </div>
                        {payment ? (
                          <div className="text-right">
                            <p className="text-sm font-medium" style={{ color: colors.text }}>
                              {formatCurrency(payment.amount)}
                            </p>
                            <StatusBadge status="Sudah Bayar" />
                          </div>
                        ) : (
                          <button
                            onClick={() => openPaymentModal(student.name, paymentWeek)}
                            className="px-3 py-1 rounded text-sm"
                            style={{ 
                              background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
                              color: colors.text
                            }}
                          >
                            Bayar
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment History */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
                  Histori Pembayaran
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Tanggal</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Minggu</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historiUangKas.slice(0, 10).map((record, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {new Date(record.timestamp?.seconds * 1000).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{record.student}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{record.week}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {formatCurrency(record.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
                  Rekap Uang Kas
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>No</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Total Pembayaran</th>
                        {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                          <th key={week} className="py-3 px-4 text-left" style={{ color: colors.text }}>{week}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student.number}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student.name}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {formatCurrency(rekapUangKas[student.name]?.total || 0)}
                          </td>
                          {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                            <td key={week} className="py-3 px-4" style={{ color: colors.text }}>
                              {rekapUangKas[student.name]?.weeks[week] ? (
                                <span style={{ color: colors.success }}>
                                  {formatCurrency(rekapUangKas[student.name].weeks[week])}
                                </span>
                              ) : (
                                <span style={{ color: colors.danger }}>Belum Bayar</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Cleaning Schedule Tab */}
          {activeTab === 'daftar piket' && (
            <>
              {/* Daily Piket Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => {
                  const dayPiket = daftarPiket
                    .filter(item => item.day === day && item.status === 'Sudah Piket')
                    .sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0))
                    .slice(0, 5);
                  
                  return (
                    <div key={day} className="p-6 rounded-2xl" style={glassStyle}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                          Piket {day}
                        </h3>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {dayPiket.map((item, index) => (
                          <div 
                            key={index} 
                            className="p-2 rounded"
                            style={{ 
                              background: colors.dark,
                              border: `1px solid ${colors.medium}`
                            }}
                          >
                            <p style={{ color: colors.text }}>{item.name}</p>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedPiketDay(day);
                          setShowStudentModal(true);
                        }}
                        className="w-full py-2 rounded font-medium"
                        style={{ 
                          background: colors.danger,
                          color: colors.text
                        }}
                      >
                        + Tambah Belum Piket
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Piket History */}
              <div className="p-6 rounded-2xl" style={glassStyle}>
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
                  Histori Belum Piket
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Tanggal</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Hari</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.text }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daftarPiket
                        .filter(item => item.status === 'Belum Piket')
                        .sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0))
                        .map((item, index) => (
                          <tr key={index} style={{ borderBottomColor: colors.dark }}>
                            <td className="py-3 px-4" style={{ color: colors.text }}>
                              {new Date(item.timestamp?.seconds * 1000).toLocaleDateString('id-ID')}
                            </td>
                            <td className="py-3 px-4" style={{ color: colors.text }}>{item.day}</td>
                            <td className="py-3 px-4" style={{ color: colors.text }}>{item.name}</td>
                            <td className="py-3 px-4">
                              <StatusBadge status={item.status} />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full max-w-md p-6 rounded-xl"
              style={{ background: colors.dark }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
                Pembayaran Kas untuk {currentStudent}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: colors.text }}>
                  Minggu
                </label>
                <select
                  value={paymentWeek}
                  onChange={(e) => setPaymentWeek(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={{ 
                    background: colors.background,
                    color: colors.text,
                    borderColor: colors.medium
                  }}
                >
                  {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map((week) => (
                    <option key={week} value={week}>{week}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: colors.text }}>
                  Nominal Pembayaran
                </label>
                <input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^Rp\d{0,3}(\.\d{3})*$/.test(value.replace(/Rp/g, ''))) {
                      setPaymentAmount(value);
                    }
                  }}
                  onBlur={(e) => {
                    const num = parseCurrency(e.target.value);
                    setPaymentAmount(formatCurrency(num));
                  }}
                  placeholder="Rp0"
                  className="w-full px-3 py-2 rounded"
                  style={{ 
                    background: colors.background,
                    color: colors.text,
                    borderColor: colors.medium
                  }}
                />
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {[10000, 20000, 30000, 50000, 100000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setPaymentAmount(formatCurrency(amount))}
                      className="px-2 py-1 rounded text-sm"
                      style={{ 
                        background: colors.background,
                        color: colors.text,
                        border: `1px solid ${colors.medium}`
                      }}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded"
                  style={{ 
                    background: colors.danger,
                    color: colors.text
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={submitUangKas}
                  className="px-4 py-2 rounded"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
                    color: colors.text
                  }}
                >
                  Simpan Pembayaran
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expense Modal */}
      <AnimatePresence>
        {showExpenseModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full max-w-md p-6 rounded-xl"
              style={{ background: colors.dark }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
                Tambah Pengeluaran
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: colors.text }}>
                  Nominal Pengeluaran
                </label>
                <input
                  type="text"
                  value={expenseAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^Rp\d{0,3}(\.\d{3})*$/.test(value.replace(/Rp/g, ''))) {
                      setExpenseAmount(value);
                    }
                  }}
                  onBlur={(e) => {
                    const num = parseCurrency(e.target.value);
                    setExpenseAmount(formatCurrency(num));
                  }}
                  placeholder="Rp0"
                  className="w-full px-3 py-2 rounded"
                  style={{ 
                    background: colors.background,
                    color: colors.text,
                    borderColor: colors.medium
                  }}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: colors.text }}>
                  Keterangan
                </label>
                <input
                  type="text"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                  placeholder="Masukkan keterangan"
                  className="w-full px-3 py-2 rounded"
                  style={{ 
                    background: colors.background,
                    color: colors.text,
                    borderColor: colors.medium
                  }}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 rounded"
                  style={{ 
                    background: colors.danger,
                    color: colors.text
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={submitPengeluaran}
                  className="px-4 py-2 rounded"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
                    color: colors.text
                  }}
                >
                  Simpan Pengeluaran
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Selection Modal */}
      <AnimatePresence>
        {showStudentModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full max-w-md p-6 rounded-xl"
              style={{ background: colors.dark }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
                Pilih Siswa untuk Hari {selectedPiketDay}
              </h3>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Cari nama siswa..."
                  className="w-full px-3 py-2 rounded mb-2"
                  style={{ 
                    background: colors.background,
                    color: colors.text,
                    borderColor: colors.medium
                  }}
                />
                
                <div className="max-h-60 overflow-y-auto">
                  {students
                    .filter(student => 
                      student.name.toLowerCase().includes(searchStudent.toLowerCase())
                    )
                    .map((student) => (
                      <div 
                        key={student.name}
                        className="p-2 rounded mb-1 flex justify-between items-center"
                        style={{ 
                          background: colors.dark,
                          border: `1px solid ${colors.medium}`
                        }}
                      >
                        <span style={{ color: colors.text }}>{student.name}</span>
                        <button
                          onClick={() => submitBelumPiket(selectedPiketDay, student.name)}
                          className="px-3 py-1 rounded text-sm"
                          style={{ 
                            background: colors.danger,
                            color: colors.text
                          }}
                        >
                          Belum Piket
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowStudentModal(false);
                    setSearchStudent('');
                  }}
                  className="px-4 py-2 rounded"
                  style={{ 
                    background: colors.danger,
                    color: colors.text
                  }}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
