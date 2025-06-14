import { motion } from 'framer-motion';
import { socials } from "../constants";
import Section from "./Section";

// Velvet Teal Color Theme
const colors = {
  dark: '#1B4242',       // Deep teal
  medium: '#4FBDBA',     // Vibrant teal
  light: '#CDEED6',      // Light mint
  accent: '#4FBDBA',     // Teal accent
  text: '#FFFFFF',       // Pure white
  background: '#000000'  // Pure black
};

// Glassmorphism Effect
const glassStyle = {
  background: 'rgba(27, 66, 66, 0.25)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(79, 189, 186, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
};

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-0" id="footer">
      <footer 
        className="w-full py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: colors.background }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Section */}
            <motion.div 
              className="footer-about"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-3xl font-bold mb-6"
                style={{ 
                  color: colors.medium,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 800,
                  textShadow: `0 0 10px ${colors.medium}80`
                }}
              >
                XI-A Bilingual
              </h2>
              <p 
                className="text-lg mb-6"
                style={{ 
                  color: colors.light,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 500
                }}
              >
                Explore Our Social Media
              </p>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <motion.a
                    href={social.url}
                    key={social.id}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.title}
                    className="flex items-center justify-center w-12 h-12 rounded-full transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${colors.dark} 0%, rgba(31, 96, 96, 0.8) 100%)`,
                      ...glassStyle
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      background: `linear-gradient(135deg, ${colors.medium} 0%, ${colors.light} 100%)`
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img
                      src={social.iconUrl}
                      alt={social.title}
                      width={20}
                      height={20}
                      className="filter brightness-0 invert"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div 
              className="footer-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-xl font-semibold mb-6 uppercase tracking-wider"
                style={{ 
                  color: colors.medium,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1.5px'
                }}
              >
                Quick Links
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About Us", href: "#about" },
                  { name: "Structure", href: "#class-structure" },
                  { name: "Gallery", href: "#gallery" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href} 
                      className="text-lg transition-all flex items-center"
                      style={{ 
                        color: colors.light,
                        fontFamily: '"Conthrax", sans-serif',
                        fontWeight: 500
                      }}
                      whileHover={{ 
                        color: colors.medium,
                        x: 5
                      }}
                    >
                      <span className="mr-2" style={{ color: colors.medium }}>›</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Resources */}
            <motion.div 
              className="footer-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-xl font-semibold mb-6 uppercase tracking-wider"
                style={{ 
                  color: colors.medium,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1.5px'
                }}
              >
                Resources
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Blog", href: "#" },
                  { name: "Documentation", href: "#" },
                  { name: "Support", href: "#" },
                  { name: "FAQ", href: "#" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href} 
                      className="text-lg transition-all flex items-center"
                      style={{ 
                        color: colors.light,
                        fontFamily: '"Conthrax", sans-serif',
                        fontWeight: 500
                      }}
                      whileHover={{ 
                        color: colors.medium,
                        x: 5
                      }}
                    >
                      <span className="mr-2" style={{ color: colors.medium }}>›</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact */}
            <motion.div 
              className="footer-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-xl font-semibold mb-6 uppercase tracking-wider"
                style={{ 
                  color: colors.medium,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1.5px'
                }}
              >
                Contact
              </h3>
              <ul className="space-y-4">
                {[
                  { 
                    content: <a href="mailto:test@gmail.com">test@gmail.com</a>, 
                    icon: "✉️" 
                  },
                  { 
                    content: <a href="tel:+6208123456789">+62-081-2345-6789</a>, 
                    icon: "📞" 
                  },
                  { content: "Asia", icon: "🌏" },
                  { content: "Pontianak, Indonesia", icon: "📍" }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-lg"
                    style={{ 
                      color: colors.light,
                      fontFamily: '"Conthrax", sans-serif',
                      fontWeight: 500
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="mr-3" style={{ color: colors.medium }}>{item.icon}</span>
                    <span>{item.content}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Copyright */}
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-800 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p 
              className="text-lg mb-4"
              style={{ 
                color: colors.light,
                fontFamily: '"Conthrax", sans-serif',
                fontWeight: 500
              }}
            >
              <span 
                style={{ 
                  color: colors.medium,
                  fontWeight: 700
                }}
              >
                &copy; {new Date().getFullYear()} Qarvo
              </span>. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-lg px-4 py-2 rounded-lg transition-all"
                  style={{ 
                    color: colors.light,
                    fontFamily: '"Conthrax", sans-serif',
                    fontWeight: 500
                  }}
                  whileHover={{ 
                    color: colors.medium,
                    scale: 1.05,
                    textShadow: `0 0 8px ${colors.medium}`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </Section>
  );
};

export default Footer;
