import { useState } from 'react';
import { FaFutbol, FaVolleyballBall, FaBasketballBall, FaCampground, FaMusic, FaFlag, FaBook, FaFistRaised, FaUserShield, FaGraduationCap, FaNewspaper, FaFlask, FaFirstAid, FaSwimmingPool } from 'react-icons/fa';
import Section from "./Section";
import Button from "./Button";

const clubCategories = [
  {
    id: 'sports',
    name: 'Sports',
    icon: FaFutbol,
    clubs: [
      { id: '1', title: 'Futsal', icon: FaFutbol },
      { id: '2', title: 'Volleyball', icon: FaVolleyballBall },
      { id: '3', title: 'Basketball', icon: FaBasketballBall },
      { id: '4', title: 'Pencak Silat', icon: FaFistRaised },
      { id: '5', title: 'Kempo', icon: FaUserShield },
      { id: '6', title: 'Karate', icon: FaUserShield },
      { id: '7', title: 'Fencing', icon: FaSwimmingPool }
    ]
  },
  {
    id: 'arts',
    name: 'Arts',
    icon: FaMusic,
    clubs: [
      { id: '8', title: 'Dance', icon: FaMusic },
      { id: '9', title: 'Music', icon: FaMusic },
      { id: '10', title: 'Journalism', icon: FaNewspaper }
    ]
  },
  {
    id: 'academics',
    name: 'Academics',
    icon: FaGraduationCap,
    clubs: [
      { id: '11', title: 'Science Club', icon: FaFlask },
      { id: '12', title: 'English Club', icon: FaGraduationCap },
      { id: '13', title: 'Religious Study', icon: FaBook }
    ]
  },
  {
    id: 'other',
    name: 'Others',
    icon: FaFlag,
    clubs: [
      { id: '14', title: 'Scout', icon: FaCampground },
      { id: '15', title: 'Flag Corps', icon: FaFlag },
      { id: '16', title: 'First Aid', icon: FaFirstAid }
    ]
  }
];

const Clubs = () => {
  const [activeCategory, setActiveCategory] = useState('sports');

  return (
    <Section id="clubs" crosses className="pt-12 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="h2 mb-4">
            <span className="text-white">Our Extracurricular </span>
            <span className="text-gradient">Programs</span>
          </h2>
          <p className="body-1 text-n-2 max-w-2xl mx-auto">
            Explore diverse activities to develop your skills and passions
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {clubCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full flex items-center transition-all ${activeCategory === category.id 
                ? 'bg-primary text-n-8' 
                : 'bg-n-7 text-n-2 hover:bg-n-6'}`}
            >
              <category.icon className="mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {clubCategories
            .find(cat => cat.id === activeCategory)
            .clubs.map((club) => (
              <div 
                key={club.id}
                className="bg-n-7/80 p-4 rounded-xl border border-n-6 hover:bg-n-7 transition-colors text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                  <club.icon className="text-xl text-primary" />
                </div>
                <h4 className="h6 text-white">{club.title}</h4>
              </div>
            ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button white>Register Now</Button>
        </div>
      </div>
    </Section>
  );
};

export default Clubs;
