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

// Modern Color Theme
const colors = {
  primary: '#4361ee',
  secondary: '#3f37c9',
  accent: '#4895ef',
  danger: '#f72585',
  warning: '#f77f00',
  success: '#4cc9f0',
  dark: '#1b263b',
  light: '#f8f9fa',
  background: '#0a1128'
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(67, 97, 238, 0.15)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(63, 55, 201, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  borderRadius: '16px'
};

// Student data
const students = [
  "Alicia Shofi Destiani",
  "Dahlia Puspita Ghaniaty",
  "Dara Veronika Tariggas",
  "Fairuz Sahla Fallugah",
  "Farid Ulya Firjatullah",
  "Fathul Faigan Alfi",
  "Fredy Gabriell Tanjaya",
  "Kalinda Pradipa",
  "Kania Permata Widra",
  "Keisya Ramadhani Huuriyah",
  "Kenzo Alvaro Bautista",
  "Keysha Aulia",
  "Kiran Adhya Narisha",
  "Juliandika",
  "Muhammad Fakhar",
  "Nadine Rannu Gracia",
  "Rahadatul Aisy Hadraini",
  "Raden Mecca Puti A",
  "Raisya Permata Intania W",
  "Salsabiela Azzahra B",
  "Sandi Gunawan",
  "Shabrina Aqela",
  "Syaira Parifasha",
  "Syifa Azzahra Rifai",
  "Utin Muzfira Amira Fenisa"
];

// Status colors
const statusColors = {
  Hadir: '#4cc9f0',
  Sakit: '#f77f00',
  Izin: '#4361ee',
  Alpha: '#f72585',
  'Sudah Bayar': '#4cc9f0',
  'Belum Bayar': '#f72585',
  'Sudah Piket': '#4cc9f0',
  'Belum Piket': '#f72585'
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
  const [rekapPiket, setRekapPiket] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentWeek, setPaymentWeek] = useState('Minggu 1');
  const [totalKas, setTotalKas] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [saldoKas, setSaldoKas] = useState(0);

  // Firebase collections
  const absensiRef = collection(db, 'absensi');
  const uangKasRef = collection(db, 'uangKas');
  const piketRef = collection(db, 'piket');
  const historiAbsensiRef = collection(db, 'historiAbsensi');
  const historiUangKasRef = collection(db, 'historiUangKas');
  const kasRef = collection(db, 'kas');

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
          todayAbsensi[student] = 'Hadir';
        });
        setAbsensiHariIni(todayAbsensi);
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }

      // Initialize payments
      const uangKasData = {};
      students.forEach(student => {
        uangKasData[student] = {
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
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.type === 'pemasukan') {
          total += data.amount;
        } else {
          pengeluaran += data.amount;
        }
      });
      
      setTotalKas(total);
      setTotalPengeluaran(pengeluaran);
      setSaldoKas(total - pengeluaran);
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
      summary[student] = {
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
      summary[student] = {
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

  // Calculate cleaning schedule summary
  useEffect(() => {
    const summary = {};
    students.forEach(student => {
      summary[student] = {
        total: 0,
        weeks: {}
      };
    });

    daftarPiket.forEach(record => {
      if (summary[record.name]) {
        if (!summary[record.name].weeks[record.week]) {
          summary[record.name].weeks[record.week] = {
            Sudah: 0,
            Belum: 0
          };
        }
        summary[record.name].weeks[record.week][record.status === 'Sudah Piket' ? 'Sudah' : 'Belum']++;
        summary[record.name].total++;
      }
    });

    setRekapPiket(summary);
  }, [daftarPiket]);

  // Handle attendance submission
  const submitAbsensi = async () => {
    try {
      const batch = [];
      
      students.forEach(student => {
        const docRef = doc(historiAbsensiRef, `${currentDate}_${student}`);
        batch.push(
          setDoc(docRef, {
            student,
            status: absensiHariIni[student] || 'Hadir',
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
  const openPaymentModal = (student) => {
    setCurrentStudent(student);
    setPaymentAmount('');
    setPaymentWeek(uangKas[student]?.week || 'Minggu 1');
    setShowPaymentModal(true);
  };

  // Handle payment submission
  const submitUangKas = async () => {
    try {
      if (!paymentAmount || isNaN(paymentAmount)) {
        alert('Masukkan nominal yang valid');
        return;
      }
      
      const amount = parseInt(paymentAmount);
      const docId = `${Date.now()}_${currentStudent}`;
      
      await setDoc(doc(historiUangKasRef, docId), {
        student: currentStudent,
        status: 'Sudah Bayar',
        amount: amount,
        week: paymentWeek,
        timestamp: serverTimestamp()
      });
      
      // Add to kas
      await setDoc(doc(kasRef, docId), {
        type: 'pemasukan',
        amount: amount,
        description: `Pembayaran kas dari ${currentStudent} (${paymentWeek})`,
        timestamp: serverTimestamp()
      });
      
      setShowPaymentModal(false);
      alert('Pembayaran berhasil disimpan!');
    } catch (error) {
      console.error("Error saving payment:", error);
      alert('Gagal menyimpan pembayaran');
    }
  };

  // Handle expense submission
  const submitPengeluaran = async (amount, description) => {
    try {
      const docId = `expense_${Date.now()}`;
      await setDoc(doc(kasRef, docId), {
        type: 'pengeluaran',
        amount: parseInt(amount),
        description: description,
        timestamp: serverTimestamp()
      });
      alert('Pengeluaran berhasil dicatat!');
    } catch (error) {
      console.error("Error saving expense:", error);
      alert('Gagal mencatat pengeluaran');
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
        color: colors.light
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
          style={{ borderColor: colors.accent }}
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
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.light }}>
            Akses Ditolak
          </h2>
          <p className="mb-6" style={{ color: colors.light }}>
            Anda harus login terlebih dahulu untuk mengakses dashboard ini.
          </p>
          <a 
            href="/login" 
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: colors.light,
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
          <h1 className="text-2xl font-bold" style={{ color: colors.light }}>
            Dashboard Sekretaris XI-A Bilingual
          </h1>
          <button 
            onClick={() => signOut(auth)}
            className="px-4 py-2 rounded-lg text-sm"
            style={{ 
              background: `linear-gradient(135deg, ${colors.danger}, rgba(247, 37, 133, 0.8))`,
              color: colors.light
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
                  style={{ background: colors.accent }}
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl overflow-hidden" style={glassStyle}>
          {/* Attendance Tab */}
          {activeTab === 'absensi' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: colors.light }}>
                  Data Absensi Kelas
                </h2>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="px-3 py-1 rounded"
                    style={{ 
                      background: colors.dark,
                      color: colors.light,
                      borderColor: colors.accent
                    }}
                  />
                  {isSaved ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-1 rounded font-medium flex items-center gap-1"
                        style={{ 
                          background: colors.warning,
                          color: colors.light
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
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        color: colors.light
                      }}
                    >
                      Simpan Absensi
                    </button>
                  )}
                </div>
              </div>

              {/* Attendance Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Today's Attendance Card */}
                <div className="p-6 rounded-xl" style={{ background: colors.dark }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: colors.light }}>
                      Absensi Hari Ini
                    </h3>
                    <span className="text-sm" style={{ color: colors.accent }}>
                      {formatDate(currentDate)}
                    </span>
                  </div>
                  {isSaved ? (
                    <div className="text-center py-8">
                      <p style={{ color: colors.light }}>Absensi hari ini sudah dilakukan</p>
                      {editMode && (
                        <p className="text-xs mt-2" style={{ color: colors.warning }}>
                          Mode edit aktif. Perubahan akan mengganti data sebelumnya.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {students.map((student) => (
                        <div key={student} className="flex justify-between items-center">
                          <p style={{ color: colors.light }} className="truncate">{student}</p>
                          <select
                            value={absensiHariIni[student] || 'Hadir'}
                            onChange={(e) => setAbsensiHariIni({
                              ...absensiHariIni,
                              [student]: e.target.value
                            })}
                            className="px-2 py-1 rounded text-sm"
                            style={{ 
                              background: colors.background,
                              color: colors.light,
                              borderColor: colors.accent
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

                {/* Attendance Status Overview */}
                <div className="p-6 rounded-xl" style={{ background: colors.dark }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                    Status Absensi Hari Ini
                  </h3>
                  <div className="space-y-4">
                    {['Hadir', 'Sakit', 'Izin', 'Alpha'].map((status) => {
                      const count = isSaved 
                        ? historiAbsensi.filter(
                            record => record.date === currentDate && record.status === status
                          ).length
                        : Object.values(absensiHariIni).filter(val => val === status).length;
                      
                      return (
                        <div key={status} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: statusColors[status] }}
                            ></div>
                            <span style={{ color: colors.light }}>{status}</span>
                          </div>
                          <span style={{ color: colors.light }}>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-xl" style={{ background: colors.dark }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    {!isSaved && (
                      <button
                        onClick={submitAbsensi}
                        className="w-full py-2 rounded font-medium text-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          color: colors.light
                        }}
                      >
                        Simpan Absensi
                      </button>
                    )}
                    {isSaved && editMode && (
                      <button
                        onClick={editAbsensi}
                        className="w-full py-2 rounded font-medium text-sm"
                        style={{ 
                          background: colors.warning,
                          color: colors.light
                        }}
                      >
                        Simpan Perubahan
                      </button>
                    )}
                    {isSaved && !editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="w-full py-2 rounded font-medium text-sm flex items-center justify-center gap-2"
                        style={{ 
                          background: colors.warning,
                          color: colors.light
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Absensi
                      </button>
                    )}
                    <button
                      className="w-full py-2 rounded font-medium text-sm"
                      style={{ 
                        background: colors.dark,
                        color: colors.light,
                        border: `1px solid ${colors.accent}`
                      }}
                    >
                      Cetak Laporan
                    </button>
                  </div>
                </div>
              </div>

              {/* Attendance History */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Histori Absensi Terakhir
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Tanggal</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historiAbsensi.slice(0, 10).map((record, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            {new Date(record.date).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>{record.student}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={record.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Rekap Absensi
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Hadir</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Sakit</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Izin</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Alpha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.light }}>{student}</td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            {rekapAbsensi[student]?.Hadir || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            {rekapAbsensi[student]?.Sakit || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            {rekapAbsensi[student]?.Izin || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            {rekapAbsensi[student]?.Alpha || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'uang kas' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.light }}>
                Data Uang Kas Kelas
              </h2>
              
              {/* Kas Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl" style={{ background: colors.dark }}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: colors.light }}>
                      Total Kas
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.success}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold mt-2" style={{ color: colors.light }}>
                    Rp{totalKas.toLocaleString('id-ID')}
                  </p>
                </div>
                
                <div className="p-6 rounded-xl" style={{ background: colors.dark }}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: colors.light }}>
                      Total Pengeluaran
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.danger}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold mt-2" style={{ color: colors.light }}>
                    Rp{totalPengeluaran.toLocaleString('id-ID')}
                  </p>
                </div>
                
                <div className="p-6 rounded-xl" style={{ background: colors.dark }}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: colors.light }}>
                      Saldo Kas
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.accent}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold mt-2" style={{ color: colors.light }}>
                    Rp{saldoKas.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Current Payments */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: colors.light }}>
                    Pembayaran Siswa
                  </h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={paymentWeek}
                      onChange={(e) => setPaymentWeek(e.target.value)}
                      className="px-3 py-1 rounded text-sm"
                      style={{ 
                        background: colors.dark,
                        color: colors.light,
                        borderColor: colors.accent
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
                      p => p.student === student && p.week === paymentWeek
                    );
                    
                    return (
                      <div 
                        key={index} 
                        className="p-4 rounded-xl flex justify-between items-center"
                        style={{ 
                          background: colors.dark,
                          border: `1px solid ${payment ? colors.accent : colors.danger}`
                        }}
                      >
                        <div>
                          <p className="font-medium truncate" style={{ color: colors.light }}>
                            {student.split(' ')[0]}
                          </p>
                          <p className="text-xs" style={{ color: colors.light }}>
                            {paymentWeek}
                          </p>
                        </div>
                        {payment ? (
                          <div className="text-right">
                            <p className="text-sm font-medium" style={{ color: colors.light }}>
                              Rp{payment.amount.toLocaleString('id-ID')}
                            </p>
                            <StatusBadge status="Sudah Bayar" />
                          </div>
                        ) : (
                          <button
                            onClick={() => openPaymentModal(student)}
                            className="px-3 py-1 rounded text-sm"
                            style={{ 
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                              color: colors.light
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
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Histori Pembayaran Terakhir
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Tanggal</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Minggu</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historiUangKas.slice(0, 10).map((record, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            {new Date(record.timestamp?.seconds * 1000).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>{record.student}</td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>{record.week}</td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            Rp{record.amount?.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Rekap Uang Kas
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Total Pembayaran</th>
                        {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                          <th key={week} className="py-3 px-4 text-left" style={{ color: colors.light }}>{week}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.light }}>{student}</td>
                          <td className="py-3 px-4" style={{ color: colors.light }}>
                            Rp{(rekapUangKas[student]?.total || 0).toLocaleString('id-ID')}
                          </td>
                          {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                            <td key={week} className="py-3 px-4" style={{ color: colors.light }}>
                              {rekapUangKas[student]?.weeks[week] ? (
                                <span style={{ color: colors.success }}>
                                  Rp{rekapUangKas[student].weeks[week].toLocaleString('id-ID')}
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
            </div>
          )}

          {/* Cleaning Schedule Tab */}
          {activeTab === 'daftar piket' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.light }}>
                Daftar Piket Kelas
              </h2>
              
              {/* Current Schedule */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Jadwal Piket Saat Ini
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => {
                    const dayPiket = daftarPiket
                      .filter(item => item.day === day)
                      .sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0))
                      .slice(0, 5);
                    
                    const nonPiketStudents = students.filter(
                      student => !dayPiket.some(p => p.name === student)
                    );
                    
                    return (
                      <div key={day} className="rounded-xl overflow-hidden" style={{ background: colors.dark }}>
                        <div className="p-4" style={{ background: colors.primary }}>
                          <h3 className="font-bold" style={{ color: colors.light }}>{day}</h3>
                        </div>
                        <div className="p-4">
                          {dayPiket.map((item, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between py-2 border-b" 
                              style={{ borderColor: colors.medium }}
                            >
                              <div>
                                <p style={{ color: colors.light }}>{item.name}</p>
                                <p className="text-xs" style={{ color: colors.light }}>{item.week}</p>
                              </div>
                              <StatusBadge status={item.status} />
                            </div>
                          ))}
                          
                          {/* Non-piket students */}
                          {dayPiket.length < 5 && (
                            <div className="mt-4">
                              <p className="text-xs mb-2" style={{ color: colors.light }}>
                                Belum piket ({5 - dayPiket.length} orang):
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {nonPiketStudents.slice(0, 5).map((student, idx) => (
                                  <span 
                                    key={idx} 
                                    className="px-2 py-1 rounded text-xs"
                                    style={{ 
                                      background: colors.danger,
                                      color: colors.light
                                    }}
                                  >
                                    {student.split(' ')[0]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cleaning Schedule Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Rekap Piket
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Total Piket</th>
                        {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                          <th key={week} className="py-3 px-4 text-left" style={{ color: colors.light }}>{week}</th>
                        ))}
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Denda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => {
                        const totalPiket = rekapPiket[student]?.total || 0;
                        const denda = Math.max(0, 20 - totalPiket) * 5000; // 5000 per missed piket
                        
                        return (
                          <tr key={index} style={{ borderBottomColor: colors.dark }}>
                            <td className="py-3 px-4" style={{ color: colors.light }}>{student}</td>
                            <td className="py-3 px-4" style={{ color: colors.light }}>
                              {totalPiket}
                            </td>
                            {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                              <td key={week} className="py-3 px-4" style={{ color: colors.light }}>
                                {rekapPiket[student]?.weeks[week]?.Sudah || 0} / {rekapPiket[student]?.weeks[week]?.Belum || 0}
                              </td>
                            ))}
                            <td className="py-3 px-4">
                              {denda > 0 ? (
                                <div className="flex items-center gap-2">
                                  <span style={{ color: colors.danger }}>Rp{denda.toLocaleString('id-ID')}</span>
                                  <button 
                                    className="px-2 py-1 rounded text-xs"
                                    style={{ 
                                      background: colors.danger,
                                      color: colors.light
                                    }}
                                  >
                                    Bayar
                                  </button>
                                </div>
                              ) : (
                                <StatusBadge status="Lunas" />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.light }}>
                Pembayaran Kas untuk {currentStudent}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: colors.light }}>
                  Minggu
                </label>
                <select
                  value={paymentWeek}
                  onChange={(e) => setPaymentWeek(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={{ 
                    background: colors.background,
                    color: colors.light,
                    borderColor: colors.accent
                  }}
                >
                  {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map((week) => (
                    <option key={week} value={week}>{week}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: colors.light }}>
                  Nominal Pembayaran
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Masukkan nominal"
                  className="w-full px-3 py-2 rounded"
                  style={{ 
                    background: colors.background,
                    color: colors.light,
                    borderColor: colors.accent
                  }}
                />
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {[1000, 2000, 3000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setPaymentAmount(amount)}
                      className="px-2 py-1 rounded text-sm"
                      style={{ 
                        background: colors.background,
                        color: colors.light,
                        border: `1px solid ${colors.accent}`
                      }}
                    >
                      Rp{amount.toLocaleString('id-ID')}
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
                    color: colors.light
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={submitUangKas}
                  className="px-4 py-2 rounded"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: colors.light
                  }}
                >
                  Simpan Pembayaran
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
