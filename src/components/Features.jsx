import { FaGlobe, FaUsers, FaMicrophone, FaGraduationCap, FaHandshake, FaComments, FaBook, FaTrophy } from 'react-icons/fa';
import Section from "./Section";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/Collaboration";

// Define our club features
const featuresList = [
  {
    id: '1',
    icon: 'global',
    title: 'Global Connections',
    description: 'Opportunity to speak directly with native English speakers from around the world'
  },
  {
    id: '2',
    icon: 'community',
    title: 'Supportive Community',
    description: 'Join a welcoming environment of English learners and enthusiasts'
  },
  {
    id: '3',
    icon: 'speaking',
    title: 'Speaking Practice',
    description: 'Regular conversation sessions to build fluency and confidence'
  },
  {
    id: '4',
    icon: 'learning',
    title: 'Structured Learning',
    description: 'Curriculum designed to improve all language skills: reading, writing, listening, speaking'
  },
  {
    id: '5',
    icon: 'culture',
    title: 'Cultural Exchange',
    description: 'Learn about different cultures while practicing English'
  },
  {
    id: '6',
    icon: 'discussion',
    title: 'Group Discussions',
    description: 'Engage in meaningful conversations on various topics'
  },
  {
    id: '7',
    icon: 'resources',
    title: 'Learning Resources',
    description: 'Access to quality materials and guidance from experienced members'
  },
  {
    id: '8',
    icon: 'achievement',
    title: 'Skill Recognition',
    description: 'Certificates and awards for active participation and improvement'
  }
];

// Map icons to React Icons components
const featureIcons = {
  global: FaGlobe,
  community: FaUsers,
  speaking: FaMicrophone,
  learning: FaGraduationCap,
  culture: FaHandshake,
  discussion: FaComments,
  resources: FaBook,
  achievement: FaTrophy
};

const Features = () => {
  return (
    <Section 
      id="about"
      crosses
      className="pt-[4rem] -mt-[2rem]"
    >
      <div className="container lg:flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Content - Text and Features */}
        <div className="lg:max-w-[30rem] text-center lg:text-left">
          <h2 className="h2 mb-6 md:mb-8 relative inline-block">
            <span className="relative z-10 text-white">
              Our{' '}
              <span className="text-gradient font-bold">Club</span>
            </span>
            <svg 
              className="absolute -bottom-2 left-0 w-full xl:-mt-2 pointer-events-none select-none"
              width="624" 
              height="28" 
              viewBox="0 0 624 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0 14C0 14 72.5 0 312 14C551.5 28 624 14 624 14" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </h2>

          <p className="body-2 mb-8 text-n-2 lg:pr-8 text-gray-300">
            Aflateen is a professional English learning organization/community that provides immersive language experiences through direct interaction with international speakers, engaging, fun learning programs, and cultural exchange opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {featuresList.map((feature) => {
              const IconComponent = featureIcons[feature.icon];
              return (
                <div 
                  className="bg-n-7/80 p-4 rounded-xl border border-n-6 hover:bg-n-7 transition-colors backdrop-blur-sm"
                  key={feature.id}
                >
                  <div className="flex items-start">
                    <IconComponent className="mt-1 flex-shrink-0 pointer-events-none select-none text-lg text-primary" />
                    <div className="ml-3">
                      <h6 className="body-2 font-medium text-white">{feature.title}</h6>
                      {feature.description && (
                        <p className="body-2 mt-1 text-n-2">{feature.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button className="mx-auto lg:mx-0" white>Join Our Club</Button>
        </div>

        {/* Right Content - Feature Visualization */}
        <div className="relative w-full max-w-[32rem] lg:w-[40rem] aspect-square mt-10 lg:mt-0">
          {/* Central Feature Icon with Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40 rounded-xl bg-n-8 border-2 border-primary/30 flex items-center justify-center p-6 backdrop-blur-sm">
              <FaGlobe className="z-10 text-6xl text-primary" />
              <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Rotating Orbit with Feature Highlights */}
          <div className="absolute inset-0 animate-spin-slow">
            {featuresList.slice(0, 6).map((feature, i) => {
              const angle = (i * 360) / 6;
              const radius = 10; // rem units
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const y = Math.cos((angle * Math.PI) / 180) * radius;
              const IconComponent = featureIcons[feature.icon];
              
              return (
                <div
                  key={feature.id}
                  className="absolute w-16 h-16 -mt-8 -ml-8"
                  style={{
                    left: `calc(50% + ${x}rem)`,
                    top: `calc(50% - ${y}rem)`,
                  }}
                >
                  <div className="relative w-full h-full bg-n-7/80 border-2 border-n-6 rounded-xl flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm">
                    <IconComponent className="text-3xl text-primary" />
                    <div className="absolute -z-10 inset-0 rounded-xl bg-primary/10 blur-md"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 rounded-full border-2 border-n-6/50 opacity-30"></div>
          <div className="absolute inset-4 rounded-full border-2 border-n-6/30 opacity-20"></div>
          <div className="absolute inset-8 rounded-full border-2 border-n-6/10 opacity-10"></div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
