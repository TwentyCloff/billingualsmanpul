import { FaFutbol, FaVolleyballBall, FaBasketballBall, FaCampground, FaMusic, FaFlag, FaBook, FaFistRaised, FaUserShield, FaGraduationCap, FaNewspaper, FaFlask, FaFirstAid, FaSwimmingPool } from 'react-icons/fa';
import Section from "./Section";
import Button from "./Button";

// Define your clubs list with supported icons only
const clubsList = [
  {
    id: '1',
    icon: 'futsal',
    title: 'Futsal Club',
    description: 'Master your footwork and teamwork on the field'
  },
  {
    id: '2',
    icon: 'voli',
    title: 'Volleyball Club',
    description: 'Spike your way to victory with our team'
  },
  {
    id: '3',
    icon: 'basket',
    title: 'Basketball Club',
    description: 'Dribble, shoot, and score like a pro'
  },
  {
    id: '4',
    icon: 'pramuka',
    title: 'Scout Club',
    description: 'Learn survival skills and outdoor adventures'
  },
  {
    id: '5',
    icon: 'tari',
    title: 'Dance Art',
    description: 'Express yourself through graceful movements'
  },
  {
    id: '6',
    icon: 'paskibra',
    title: 'Flag Corps',
    description: 'Discipline and patriotism in every march'
  },
  {
    id: '7',
    icon: 'rohis',
    title: 'Religious Study',
    description: 'Deepen your spiritual knowledge'
  },
  {
    id: '8',
    icon: 'silat',
    title: 'Pencak Silat',
    description: 'Traditional martial arts mastery'
  },
  {
    id: '9',
    icon: 'kempo',
    title: 'Kempo Club',
    description: 'Japanese martial arts training'
  },
  {
    id: '10',
    icon: 'karate',
    title: 'Karate Club',
    description: 'Discipline through martial arts'
  },
  {
    id: '11',
    icon: 'kir',
    title: 'Science Club',
    description: 'Explore the wonders of science'
  },
  {
    id: '12',
    icon: 'jurnalistik',
    title: 'Journalism Club',
    description: 'Uncover and report school news'
  },
  {
    id: '13',
    icon: 'music',
    title: 'Music Club',
    description: 'Create harmony with fellow musicians'
  },
  {
    id: '14',
    icon: 'pmr',
    title: 'First Aid Club',
    description: 'Learn life-saving medical skills'
  },
  {
    id: '15',
    icon: 'anggar',
    title: 'Fencing Club',
    description: 'Train your precision and strategy'
  },
  {
    id: '16',
    icon: 'aflateen',
    title: 'English Club',
    description: 'Improve your language skills'
  }
];

// Map icons to React Icons components (only supported ones)
const clubIcons = {
  futsal: FaFutbol,
  voli: FaVolleyballBall,
  basket: FaBasketballBall,
  pramuka: FaCampground,
  tari: FaMusic,
  paskibra: FaFlag,
  rohis: FaBook,
  silat: FaFistRaised,
  kempo: FaUserShield,
  karate: FaGraduationCap,
  kir: FaFlask,
  jurnalistik: FaNewspaper,
  music: FaMusic,
  pmr: FaFirstAid,
  anggar: FaSwimmingPool,
  aflateen: FaGraduationCap
};

const Clubs = () => {
  return (
    <Section 
      id="clubs"
      crosses
      className="pt-[4rem] -mt-[2rem]"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="h2 mb-6 relative inline-block">
            <span className="relative z-10 text-white">
              Diverse Clubs for{' '}
              <span className="text-gradient font-bold">Your Passion</span>
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

          <p className="body-2 mb-8 text-n-2 mx-auto max-w-2xl text-gray-300">
            Discover your passion and develop new skills through our wide range of extracurricular activities. 
            Whether you're into sports, arts, or academics, there's a place for everyone!
          </p>
        </div>

        {/* Clubs Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {clubsList.map((club) => {
            const IconComponent = clubIcons[club.icon];
            return (
              <div 
                className="group relative bg-n-7/80 p-6 rounded-2xl border border-n-6 hover:bg-n-7 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                key={club.id}
              >
                {/* Club Icon with Gradient Background */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                      <IconComponent className="text-2xl text-primary" />
                    </div>
                    <h3 className="h5 text-white">{club.title}</h3>
                  </div>
                  <p className="body-2 text-n-2">{club.description}</p>
                </div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 pointer-events-none transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button className="mx-auto" white>
            Explore All Clubs
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Clubs;
