import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  where
} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Velvet Teal Color Theme
const colors = {
  dark: '#1B4242',
  medium: '#4FBDBA',
  light: '#CDEED6',
  text: '#FFFFFF',
  background: '#000000'
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(27, 66, 66, 0.25)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(79, 189, 186, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
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
  const [newPiket, setNewPiket] = useState({
    name: '',
    status: 'Belum Piket',
    week: 'Minggu 1',
    day: 'Senin'
  });
  const [rekapPiket, setRekapPiket] = useState({});

  // Firebase collections
  const absensiRef = collection(db, 'absensi');
  const uangKasRef = collection(db, 'uangKas');
  const piketRef = collection(db, 'piket');
  const historiAbsensiRef = collection(db, 'historiAbsensi');
  const historiUangKasRef = collection(db, 'historiUangKas');

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
      // Initialize today's attendance
      const todayAbsensi = {};
      students.forEach(student => {
        todayAbsensi[student] = 'Hadir';
      });
      setAbsensiHariIni(todayAbsensi);

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
  }, [user]);

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

    return () => {
      unsubHistoriAbsensi();
      unsubHistoriUangKas();
      unsubPiket();
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
      alert('Absensi berhasil disimpan!');
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert('Gagal menyimpan absensi');
    }
  };

  // Handle payment submission
  const submitUangKas = async (student) => {
    try {
      await setDoc(doc(historiUangKasRef, `${Date.now()}_${student}`), {
        student,
        ...uangKas[student],
        timestamp: serverTimestamp()
      };
      alert('Pembayaran berhasil disimpan!');
    } catch (error) {
      console.error("Error saving payment:", error);
      alert('Gagal menyimpan pembayaran');
    }
  };

  // Add new cleaning schedule
  const addPiket = async () => {
    try {
      if (!newPiket.name) {
        alert('Pilih siswa terlebih dahulu');
        return;
      }
      
      await setDoc(doc(piketRef, `${newPiket.day}_${newPiket.week}_${newPiket.name}`), {
        ...newPiket,
        timestamp: serverTimestamp()
      };
      
      setNewPiket({
        name: '',
        status: 'Belum Piket',
        week: 'Minggu 1',
        day: 'Senin'
      });
      
      alert('Piket berhasil ditambahkan!');
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert('Gagal menambahkan piket');
    }
  };

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
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
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
          <h1 className="text-2xl font-bold" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
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
              style={{ fontFamily: '"Conthrax", sans-serif' }}
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
        <div className="rounded-2xl overflow-hidden" style={glassStyle}>
          {/* Attendance Tab */}
          {activeTab === 'absensi' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
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
                      color: colors.text,
                      borderColor: colors.medium
                    }}
                  />
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
                </div>
              </div>

              {/* Today's Attendance */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Absensi Hari Ini ({new Date(currentDate).toLocaleDateString('id-ID')})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>No</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{index + 1}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student}</td>
                          <td className="py-3 px-4">
                            <select
                              value={absensiHariIni[student] || 'Hadir'}
                              onChange={(e) => setAbsensiHariIni({
                                ...absensiHariIni,
                                [student]: e.target.value
                              })}
                              className="px-3 py-1 rounded"
                              style={{ 
                                background: colors.dark,
                                color: colors.text,
                                borderColor: colors.medium
                              }}
                            >
                              {['Hadir', 'Sakit', 'Izin', 'Alpha'].map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance History */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Histori Absensi
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
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {new Date(record.date).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{record.student}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{record.status}</td>
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
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student]?.Hadir || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student]?.Sakit || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapAbsensi[student]?.Izin || 0}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
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
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
                Data Uang Kas Kelas
              </h2>
              
              {/* Current Payments */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Pembayaran Terkini
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.dark }}>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>No</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Minggu</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Status</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nominal</th>
                        <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{index + 1}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student}</td>
                          <td className="py-3 px-4">
                            <select
                              value={uangKas[student]?.week || 'Minggu 1'}
                              onChange={(e) => setUangKas({
                                ...uangKas,
                                [student]: {
                                  ...uangKas[student],
                                  week: e.target.value
                                }
                              })}
                              className="px-3 py-1 rounded"
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
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={uangKas[student]?.status || 'Belum Bayar'}
                              onChange={(e) => setUangKas({
                                ...uangKas,
                                [student]: {
                                  ...uangKas[student],
                                  status: e.target.value
                                }
                              })}
                              className="px-3 py-1 rounded"
                              style={{ 
                                background: colors.dark,
                                color: colors.text,
                                borderColor: colors.medium
                              }}
                            >
                              {['Sudah Bayar', 'Belum Bayar'].map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={uangKas[student]?.amount || 0}
                              onChange={(e) => setUangKas({
                                ...uangKas,
                                [student]: {
                                  ...uangKas[student],
                                  amount: parseInt(e.target.value) || 0
                                }
                              })}
                              className="px-3 py-1 rounded w-24"
                              style={{ 
                                background: colors.dark,
                                color: colors.text,
                                borderColor: colors.medium
                              }}
                              disabled={uangKas[student]?.status !== 'Sudah Bayar'}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => submitUangKas(student)}
                              className="px-3 py-1 rounded text-sm"
                              style={{ 
                                background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
                                color: colors.text
                              }}
                            >
                              Simpan
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment History */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Histori Pembayaran
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
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {new Date(record.timestamp?.seconds * 1000).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{record.student}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{record.week}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
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
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            Rp{(rekapUangKas[student]?.total || 0).toLocaleString('id-ID')}
                          </td>
                          {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                            <td key={week} className="py-3 px-4" style={{ color: colors.text }}>
                              Rp{(rekapUangKas[student]?.weeks[week] || 0).toLocaleString('id-ID')}
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
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
                Daftar Piket Kelas
              </h2>
              
              {/* Current Schedule */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Jadwal Piket Saat Ini
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => (
                    <div key={day} className="rounded-xl overflow-hidden" style={{ background: colors.dark }}>
                      <div className="p-4" style={{ background: colors.medium }}>
                        <h3 className="font-bold" style={{ color: colors.text }}>{day}</h3>
                      </div>
                      <div className="p-4">
                        {daftarPiket
                          .filter(item => item.day === day)
                          .sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0))
                          .slice(0, 5)
                          .map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b" style={{ borderColor: colors.medium }}>
                              <div>
                                <p style={{ color: colors.text }}>{item.name}</p>
                                <p className="text-xs" style={{ color: colors.light }}>{item.week}</p>
                              </div>
                              <span 
                                className="px-2 py-1 rounded text-xs"
                                style={{ 
                                  background: item.status === 'Sudah Piket' ? colors.medium : colors.dark,
                                  color: colors.text
                                }}
                              >
                                {item.status}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Schedule */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>
                  Tambah Piket Baru
                </h3>
                <div className="flex flex-wrap gap-4">
                  <select
                    value={newPiket.name}
                    onChange={(e) => setNewPiket({...newPiket, name: e.target.value})}
                    className="px-4 py-2 rounded"
                    style={{ 
                      background: colors.dark,
                      color: colors.text,
                      borderColor: colors.medium
                    }}
                  >
                    <option value="">Pilih Siswa</option>
                    {students.map((student) => (
                      <option key={student} value={student}>{student}</option>
                    ))}
                  </select>
                  <select
                    value={newPiket.day}
                    onChange={(e) => setNewPiket({...newPiket, day: e.target.value})}
                    className="px-4 py-2 rounded"
                    style={{ 
                      background: colors.dark,
                      color: colors.text,
                      borderColor: colors.medium
                    }}
                  >
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <select
                    value={newPiket.week}
                    onChange={(e) => setNewPiket({...newPiket, week: e.target.value})}
                    className="px-4 py-2 rounded"
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
                  <select
                    value={newPiket.status}
                    onChange={(e) => setNewPiket({...newPiket, status: e.target.value})}
                    className="px-4 py-2 rounded"
                    style={{ 
                      background: colors.dark,
                      color: colors.text,
                      borderColor: colors.medium
                    }}
                  >
                    <option value="Sudah Piket">Sudah Piket</option>
                    <option value="Belum Piket">Belum Piket</option>
                  </select>
                  <button
                    onClick={addPiket}
                    className="px-6 py-2 rounded font-medium"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`,
                      color: colors.text
                    }}
                    disabled={!newPiket.name}
                  >
                    Tambah
                  </button>
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
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} style={{ borderBottomColor: colors.dark }}>
                          <td className="py-3 px-4" style={{ color: colors.text }}>{student}</td>
                          <td className="py-3 px-4" style={{ color: colors.text }}>
                            {rekapPiket[student]?.total || 0}
                          </td>
                          {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map(week => (
                            <td key={week} className="py-3 px-4" style={{ color: colors.text }}>
                              {rekapPiket[student]?.weeks[week]?.Sudah || 0} / {rekapPiket[student]?.weeks[week]?.Belum || 0}
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
