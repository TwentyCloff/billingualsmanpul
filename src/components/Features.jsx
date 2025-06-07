import { FaGlobe, FaUsers, FaMicrophone, FaGraduationCap, FaHandshake, FaComments } from 'react-icons/fa';
import Section from "./Section";
import Button from "./Button";

const featuresList = [
  {
    id: '1',
    icon: 'global',
    title: 'Global Connections',
    description: 'Practice English with native speakers worldwide'
  },
  {
    id: '2',
    icon: 'community',
    title: 'Supportive Network',
    description: 'Join our welcoming community of learners'
  },
  {
    id: '3',
    icon: 'speaking',
    title: 'Speaking Sessions',
    description: 'Regular conversation practice'
  },
  {
    id: '4',
    icon: 'learning',
    title: 'Structured Learning',
    description: 'Comprehensive skill development'
  },
  {
    id: '5',
    icon: 'culture',
    title: 'Cultural Exchange',
    description: 'Learn through cultural immersion'
  },
  {
    id: '6',
    icon: 'discussion',
    title: 'Group Activities',
    description: 'Engaging discussions and events'
  }
];

const featureIcons = {
  global: FaGlobe,
  community: FaUsers,
  speaking: FaMicrophone,
  learning: FaGraduationCap,
  culture: FaHandshake,
  discussion: FaComments
};

const Features = () => {
  return (
    <Section 
      id="about"
      crosses
      className="pt-[5rem] -mt-[1.5rem] relative overflow-hidden"
    >
      {/* Background Gradient Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-n-8/90 to-n-9"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-n-8/40 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-[50rem] mx-auto text-center">
          <h2 className="h2 mb-6 relative inline-block">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-n-1 to-n-3">
              Our <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">Aflateen</span> Community
            </span>
            <svg 
              className="absolute -bottom-2 left-0 w-full xl:-mt-2"
              width="624" 
              height="28" 
              viewBox="0 0 624 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0 14C0 14 72.5 0 312 14C551.5 28 624 14 624 14" 
                stroke="url(#pulseGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--color-n-3)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </h2>

          <p className="body-1 mb-10 text-n-3 mx-auto max-w-[40rem] leading-relaxed">
            Aflateen provides an immersive English learning experience through authentic conversations, cultural exchange, and professional guidance in a supportive environment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {featuresList.map((feature) => {
              const IconComponent = featureIcons[feature.icon];
              return (
                <div 
                  className="relative group p-5 rounded-2xl bg-gradient-to-b from-n-8/60 to-n-8/30 border border-n-7/50 hover:border-n-6/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  key={feature.id}
                >
                  <div className="absolute inset-0 rounded-2xl bg-n-8/20 group-hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <IconComponent className="text-2xl text-primary" />
                    </div>
                    <h3 className="h5 mb-2 text-n-1">{feature.title}</h3>
                    <p className="body-2 text-n-3">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            className="mx-auto transform transition-transform duration-300 hover:scale-105" 
            white
            glow
          >
            Join Now
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Features;
