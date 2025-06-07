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
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter drop-shadow-lg">
            Sign Up Restricted
          </h1>
          <p className="text-white/80 font-light tracking-wider drop-shadow-md">
            Account creation is invite-only
          </p>
        </div>

        <div className="bg-white/10 p-8 rounded-xl shadow-2xl hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all duration-500 relative">
          {/* White border effect */}
          <div className="absolute inset-0 rounded-xl border border-white/80 pointer-events-none"></div>

          <div className="text-center space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Request Access
              </h3>
              <p className="text-gray-600 text-sm">
                New accounts require administrator approval. Please contact the system administrator to request access.
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 group"
            >
              <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
