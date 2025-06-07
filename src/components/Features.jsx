import { FaGlobe, FaUsers, FaMicrophone, FaGraduationCap, FaHandshake, FaComments, FaBook, FaTrophy } from 'react-icons/fa';
import Section from "./Section";
import Button from "./Button";

// Define our club features
const featuresList = [
  {
    id: '1',
    icon: 'global',
    title: 'Global Connections',
    description: 'Direct conversation practice with native English speakers worldwide'
  },
  {
    id: '2',
    icon: 'community',
    title: 'Supportive Community',
    description: 'Friendly environment for English learners at all levels'
  },
  {
    id: '3',
    icon: 'speaking',
    title: 'Speaking Practice',
    description: 'Regular sessions to build fluency and confidence'
  },
  {
    id: '4',
    icon: 'learning',
    title: 'Structured Learning',
    description: 'Comprehensive curriculum covering all language skills'
  },
  {
    id: '5',
    icon: 'culture',
    title: 'Cultural Exchange',
    description: 'Learn about different cultures while improving English'
  },
  {
    id: '6',
    icon: 'discussion',
    title: 'Group Discussions',
    description: 'Engaging conversations on various interesting topics'
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
      <div className="container mx-auto px-4">
        {/* Main Content - Centered */}
        <div className="max-w-[50rem] mx-auto text-center">
          <h2 className="h2 mb-6 relative inline-block">
            <span className="relative z-10 text-white">
              About <span className="text-gradient font-bold">Aflateen</span>
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

          <p className="body-2 mb-8 text-n-2 text-gray-300 mx-auto max-w-[40rem]">
            Aflateen is a dynamic English learning community where members gain confidence through real conversations, cultural exchange, and structured learning programs with international participants.
          </p>

          {/* Features Grid - Simplified */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {featuresList.map((feature) => {
              const IconComponent = featureIcons[feature.icon];
              return (
                <div 
                  className="bg-n-7/90 p-4 rounded-xl border border-n-6 hover:bg-n-7 transition-colors backdrop-blur-sm hover:translate-y-[-4px]"
                  key={feature.id}
                >
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className="mb-3 text-2xl text-primary" />
                    <h6 className="body-2 font-medium text-white mb-2">{feature.title}</h6>
                    <p className="body-2 text-n-2">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button className="mx-auto" white>Join Our Community</Button>
        </div>
      </div>
    </Section>
  );
};

export default Features;
