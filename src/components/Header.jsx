import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FiUser, FiX, FiLogOut, FiMail } from "react-icons/fi";
import { auth } from "../config/firebaseConfig";
import MenuSvg from "../assets/svg/MenuSvg";
import { navigation } from "../constants";
import { HambugerMenu } from "../components/design/Header";

const Header = () => {
  const pathname = useLocation();
  const navigate = useNavigate();

  const [openNavigation, setOpenNavigation] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowProfilePopup(false);
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  // Glass Button Component for Sign In/Sign Up
  const GlassButton = ({ children, onClick, variant = "primary" }) => {
    const baseStyle = `
      relative overflow-hidden
      px-5 py-2 rounded-lg
      text-sm font-medium
      transition-all duration-200
      border border-white/20
      backdrop-blur-sm
      hover:shadow-lg
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-white/5 hover:bg-white/10
        text-white
      `,
      secondary: `
        bg-white/3 hover:bg-white/7
        text-white/90 hover:text-white
      `
    };

    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      {openNavigation && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300" />
      )}

      {/* Profile Popup */}
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-[#0f0a1a] border border-white/10 rounded-xl p-6 max-w-xs w-full relative">
            <button 
              onClick={() => setShowProfilePopup(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <FiUser size={24} className="text-white" />
              </div>
              
              <div className="flex items-center gap-2 text-white/80 mb-6">
                <FiMail size={16} />
                <span className="text-sm">{user?.email}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-lg bg-red-900/30 hover:bg-red-900/40 text-red-100 hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          openNavigation
            ? "bg-black/90 backdrop-blur-md"
            : "bg-transparent backdrop-blur-none"
        }`}
        style={{ height: "68px" }}
      >
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 py-3 h-full">
          {/* Logo */}
          <a
            className="block w-auto xl:mr-8 text-2xl font-medium text-white"
            href="#hero"
          >
            Qarvo
          </a>

          {/* Navigation */}
          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[68px] left-0 right-0 bottom-0 bg-[#0a0614] lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row lg:ml-20">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  onClick={handleClick}
                  className={`block relative font-medium text-lg text-white/80 transition-colors hover:text-white ${
                    item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-sm ${
                    item.url === pathname.hash
                      ? "z-2 lg:text-white"
                      : "lg:text-white/70"
                  } lg:leading-5 lg:hover:text-white xl:px-12`}
                >
                  {item.title}
                </a>
              ))}

              {/* Mobile buttons */}
              <div className="flex flex-col lg:hidden items-center gap-3 mt-4">
                {!user ? (
                  <>
                    <GlassButton onClick={handleLogin} variant="primary">
                      Sign In
                    </GlassButton>
                    <GlassButton onClick={handleSignUp} variant="secondary">
                      Sign Up
                    </GlassButton>
                  </>
                ) : (
                  <button
                    onClick={toggleProfilePopup}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <FiUser className="text-white" />
                  </button>
                )}
              </div>
            </div>

            <HambugerMenu />
          </nav>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {!user ? (
              <>
                <GlassButton onClick={handleLogin} variant="primary">
                  Sign In
                </GlassButton>
                <GlassButton onClick={handleSignUp} variant="secondary">
                  Sign Up
                </GlassButton>
              </>
            ) : (
              <button
                onClick={toggleProfilePopup}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <FiUser className="text-white" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleNavigation}
            className="ml-auto lg:hidden p-3 rounded-md hover:bg-white/10 transition-colors"
          >
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
