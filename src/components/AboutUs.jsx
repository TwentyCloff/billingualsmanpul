import { motion } from 'framer-motion';
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

const AboutUs = () => {
  return (
    <Section 
      id="about"
      crosses
      className="pt-[6rem] -mt-[2.5rem]"
    >
      <div 
        className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: colors.background }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl font-bold mb-6 tracking-tight relative"
              style={{ 
                color: colors.text,
                textShadow: `0 0 15px ${colors.medium}80`,
                fontFamily: '"Conthrax", sans-serif',
                fontWeight: 800,
                letterSpacing: '-0.5px'
              }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ABOUT US
              <motion.div 
                className="w-64 h-1 mx-auto mt-4"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.medium}, ${colors.light})`,
                  boxShadow: `0 0 10px ${colors.medium}`
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              ></motion.div>
            </motion.h2>

            {/* Content */}
            <motion.div 
              className="max-w-4xl mx-auto p-8 rounded-2xl space-y-8"
              style={{
                background: `linear-gradient(145deg, rgba(27, 66, 66, 0.4) 0%, rgba(31, 96, 96, 0.4) 100%)`,
                ...glassStyle
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-xl leading-relaxed"
                style={{ 
                  color: colors.light,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 600
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                In our bilingual class, every day brings something new to discover. Learning in two languages makes things more exciting — not just in lessons, but in how we connect with each other.
              </motion.p>
              
              <motion.p 
                className="text-xl leading-relaxed"
                style={{ 
                  color: colors.light,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 500
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                We work together, share ideas, and enjoy the process of growing as a team. The classroom feels lively, welcoming, and full of curiosity.
              </motion.p>
              
              <motion.p 
                className="text-xl leading-relaxed italic"
                style={{ 
                  color: colors.light,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 500
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                Whether we're doing projects, having discussions, or just talking during breaks, there's always a sense of togetherness.
              </motion.p>
              
              <motion.p 
                className="text-xl leading-relaxed"
                style={{ 
                  color: colors.text,
                  fontFamily: '"Conthrax", sans-serif',
                  fontWeight: 700,
                  textShadow: `0 0 8px ${colors.medium}`
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                viewport={{ once: true }}
              >
                It's a place where everyone feels comfortable, supported, and motivated to learn.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                { number: "25", label: "STUDENTS" },
                { number: "2", label: "LANGUAGES" },
                { number: "100%", label: "TEAM SPIRIT" },
                { number: "24/7", label: "LEARNING" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl text-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(27, 66, 66, 0.7) 0%, rgba(31, 96, 96, 0.7) 100%)`,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.05,
                    boxShadow: `0 8px 28px ${colors.medium}40`
                  }}
                >
                  <p 
                    className="text-4xl font-bold mb-2" 
                    style={{ 
                      color: colors.text,
                      textShadow: `0 0 10px ${colors.medium}80`,
                      fontFamily: '"Conthrax", sans-serif',
                      fontWeight: 800
                    }}
                  >
                    {stat.number}
                  </p>
                  <p 
                    className="text-sm uppercase tracking-wider" 
                    style={{ 
                      color: colors.light,
                      letterSpacing: '1px',
                      fontFamily: '"Conthrax", sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutUs;
