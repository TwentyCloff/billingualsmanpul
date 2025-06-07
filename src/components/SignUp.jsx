import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import blackholeVideo from "../assets/hero/animated2.webm";

const SignUp = () => {
  const navigate = useNavigate();

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
            Sign Up Restricted
          </h1>
          <p className="text-purple-200/80 font-light tracking-wider">
            You don't have access to sign up directly
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-white/30 relative overflow-hidden">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-[1px] -z-1"></div>
          
          {/* Glass border effect */}
          <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></div>

          <div className="text-center space-y-6 relative z-10">
            <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium text-red-200 mb-2">
                Access Restricted
              </h3>
              <p className="text-red-100/80 text-sm">
                You don't have permission to create an account. Please contact the developer for access.
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium bg-purple-600/70 hover:bg-purple-500/70 text-white border border-white/20 hover:border-white/30 transition-all duration-500 group"
            >
              <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
