import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../config/firebaseConfig";
import MenuSvg from "../assets/svg/MenuSvg";
import { navigation } from "../constants";
import { HambugerMenu } from "../components/design/Header";

const Header = () => {
  const pathname = useLocation();
  const navigate = useNavigate();

  const [openNavigation, setOpenNavigation] = useState(false);
  const [user, setUser] = useState(null);

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
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  // Minimalist Button Component
  const MinimalButton = ({ children, onClick, variant = "primary" }) => {
    const baseStyle = `
      relative overflow-hidden
      px-4 py-1.5 rounded
      text-sm font-medium
      transition-all duration-200
      hover:bg-white/10
      active:scale-[0.98]
    `;

    const variants = {
      primary: `text-white`,
      secondary: `text-white/80 hover:text-white`,
      dashboard: `text-indigo-100 hover:text-indigo-50`,
      logout: `text-pink-100 hover:text-pink-50`
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
                {user && (
                  <MinimalButton onClick={goToDashboard} variant="dashboard">
                    Dashboard
                  </MinimalButton>
                )}
                {!user ? (
                  <>
                    <MinimalButton onClick={handleLogin} variant="primary">
                      Sign In
                    </MinimalButton>
                    <MinimalButton onClick={handleSignUp} variant="secondary">
                      Sign Up
                    </MinimalButton>
                  </>
                ) : (
                  <MinimalButton onClick={handleLogout} variant="logout">
                    Logout
                  </MinimalButton>
                )}
              </div>
            </div>

            <HambugerMenu />
          </nav>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {user && (
              <MinimalButton onClick={goToDashboard} variant="dashboard">
                Dashboard
              </MinimalButton>
            )}
            {!user ? (
              <>
                <MinimalButton onClick={handleLogin} variant="primary">
                  Sign In
                </MinimalButton>
                <MinimalButton onClick={handleSignUp} variant="secondary">
                  Sign Up
                </MinimalButton>
              </>
            ) : (
              <MinimalButton onClick={handleLogout} variant="logout">
                Logout
              </MinimalButton>
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
