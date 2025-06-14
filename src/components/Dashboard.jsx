import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, doc, setDoc, updateDoc, onSnapshot, getDocs } from 'firebase/firestore';
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
  const [absensi, setAbsensi] = useState([]);
  const [uangKas, setUangKas] = useState([]);
  const [piket, setPiket] = useState([]);
  const [newPiket, setNewPiket] = useState({
    name: '',
    status: 'Belum Piket',
    week: 'Minggu 1',
    day: 'Senin'
  });

  // Firebase collections
  const absensiRef = collection(db, 'absensi');
  const uangKasRef = collection(db, 'uangKas');
  const piketRef = collection(db, 'piket');

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
      // Initialize attendance
      const absensiSnapshot = await getDocs(absensiRef);
      if (absensiSnapshot.empty) {
        for (const student of students) {
          await setDoc(doc(absensiRef), {
            name: student,
            status: 'Hadir'
          });
        }
      }

      // Initialize payments
      const uangKasSnapshot = await getDocs(uangKasRef);
      if (uangKasSnapshot.empty) {
        for (const student of students) {
          await setDoc(doc(uangKasRef), {
            name: student,
            status: 'Belum Bayar',
            amount: 0,
            week: 'Minggu 1'
          });
        }
      }
    };

    initializeData();
  }, [user]);

  // Load real-time data
  useEffect(() => {
    if (!user) return;

    const unsubAbsensi = onSnapshot(absensiRef, (snapshot) => {
      setAbsensi(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubUangKas = onSnapshot(uangKasRef, (snapshot) => {
      setUangKas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubPiket = onSnapshot(piketRef, (snapshot) => {
      setPiket(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubAbsensi();
      unsubUangKas();
      unsubPiket();
    };
  }, [user]);

  // Update functions
  const updateAbsensi = async (id, status) => {
    await updateDoc(doc(db, 'absensi', id), { status });
  };

  const updateUangKas = async (id, data) => {
    await updateDoc(doc(db, 'uangKas', id), data);
  };

  const addPiket = async () => {
    if (!newPiket.name) return;
    await setDoc(doc(piketRef), {
      ...newPiket,
      timestamp: new Date()
    });
    setNewPiket({
      name: '',
      status: 'Belum Piket',
      week: 'Minggu 1',
      day: 'Senin'
    });
  };

  const updatePiket = async (id, status) => {
    await updateDoc(doc(db, 'piket', id), { status });
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
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
                Data Absensi Kelas
              </h2>
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
                    {absensi.map((item, index) => (
                      <tr key={item.id} style={{ borderBottomColor: colors.dark }}>
                        <td className="py-3 px-4" style={{ color: colors.text }}>{index + 1}</td>
                        <td className="py-3 px-4" style={{ color: colors.text }}>{item.name}</td>
                        <td className="py-3 px-4">
                          <select
                            value={item.status}
                            onChange={(e) => updateAbsensi(item.id, e.target.value)}
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
          )}

          {/* Payment Tab */}
          {activeTab === 'uang kas' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
                Data Uang Kas Kelas
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottomColor: colors.dark }}>
                      <th className="py-3 px-4 text-left" style={{ color: colors.light }}>No</th>
                      <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nama Siswa</th>
                      <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Minggu</th>
                      <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Status</th>
                      <th className="py-3 px-4 text-left" style={{ color: colors.light }}>Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uangKas.map((item, index) => (
                      <tr key={item.id} style={{ borderBottomColor: colors.dark }}>
                        <td className="py-3 px-4" style={{ color: colors.text }}>{index + 1}</td>
                        <td className="py-3 px-4" style={{ color: colors.text }}>{item.name}</td>
                        <td className="py-3 px-4">
                          <select
                            value={item.week || 'Minggu 1'}
                            onChange={(e) => updateUangKas(item.id, { ...item, week: e.target.value })}
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
                            value={item.status || 'Belum Bayar'}
                            onChange={(e) => updateUangKas(item.id, { 
                              ...item, 
                              status: e.target.value,
                              amount: e.target.value === 'Sudah Bayar' ? item.amount || 0 : 0
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
                            value={item.amount || 0}
                            onChange={(e) => updateUangKas(item.id, { ...item, amount: parseInt(e.target.value) || 0 })}
                            className="px-3 py-1 rounded w-24"
                            style={{ 
                              background: colors.dark,
                              color: colors.text,
                              borderColor: colors.medium
                            }}
                            disabled={item.status !== 'Sudah Bayar'}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cleaning Schedule Tab */}
          {activeTab === 'daftar piket' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text, fontFamily: '"Conthrax", sans-serif' }}>
                Daftar Piket Kelas
              </h2>
              
              {/* Add New Schedule */}
              <div className="flex flex-wrap gap-4 mb-8">
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

              {/* Schedule List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => (
                  <div key={day} className="rounded-xl overflow-hidden" style={{ background: colors.dark }}>
                    <div className="p-4" style={{ background: colors.medium }}>
                      <h3 className="font-bold" style={{ color: colors.text }}>{day}</h3>
                    </div>
                    <div className="p-4">
                      {piket
                        .filter(item => item.day === day)
                        .sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0))
                        .slice(0, 5)
                        .map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: colors.medium }}>
                            <div>
                              <p style={{ color: colors.text }}>{item.name}</p>
                              <p className="text-xs" style={{ color: colors.light }}>{item.week}</p>
                            </div>
                            <select
                              value={item.status}
                              onChange={(e) => updatePiket(item.id, e.target.value)}
                              className="px-2 py-1 rounded text-sm"
                              style={{ 
                                background: colors.dark,
                                color: colors.text,
                                borderColor: colors.medium
                              }}
                            >
                              {['Sudah Piket', 'Belum Piket'].map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
