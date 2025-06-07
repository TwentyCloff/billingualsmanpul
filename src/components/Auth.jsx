import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import blackholeVideo from "../assets/hero/animated2.webm";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          createdAt: new Date(),
          name: "",
          phone: "",
          discord: "",
          role: "user"
        });
      }
      navigate("/");
    } catch (err) {
      setError(
        err.message.includes("auth/email-already-in-use")
          ? "Email already in use"
          : err.message.includes("auth/invalid-credential")
          ? "Invalid email or password"
          : "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={blackholeVideo} type="video/webm" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-1"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-purple-200/80 font-light tracking-wider">
            {isLogin
              ? "Sign in to access your dashboard"
              : "Join us to get started"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-white/30 relative overflow-hidden"
        >
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-[1px] -z-1"></div>
          
          {/* Glass border effect */}
          <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 text-sm flex items-center backdrop-blur-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-5 relative z-10">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-300 group-hover:text-purple-200 transition-colors">
                <FiMail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent group-hover:border-white/30 transition-all duration-300"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-300 group-hover:text-purple-200 transition-colors">
                <FiLock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent group-hover:border-white/30 transition-all duration-300"
                placeholder="Password"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all duration-500 relative overflow-hidden group ${
                isLoading
                  ? "bg-purple-900/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600/70 to-indigo-600/70 hover:from-purple-500/70 hover:to-indigo-500/70"
              } text-white shadow-lg border border-white/20 hover:border-white/30`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isLogin ? (
                <>
                  Sign In <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Create Account <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-purple-200/80">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-purple-300 hover:text-white font-medium hover:underline underline-offset-4 decoration-purple-300/50 transition-all duration-300"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-purple-200/50">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
