
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
// import PropertyCard from '../components/PropertyCard';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/explore');
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
          >
            Find your perfect <span className="text-indigo-400">home</span> today
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Discover over 20,000+ properties for rent in the most popular cities. 
            Luxury villas, cozy apartments, and more.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-2 rounded-2xl shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
          >
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 appearance-none">
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="condo">Condo</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 appearance-none">
                  <option value="">Price Range</option>
                  <option value="0-1000">$0 - $1,000</option>
                  <option value="1000-3000">$1,000 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 md:w-auto w-full"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-2">Handpicked selection of quality places</p>
          </div>
          <Link to="/explore" className="hidden md:flex items-center text-indigo-600 font-medium hover:text-indigo-700 group">
            View all properties 
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {PROPERTIES.slice(0, 3).map((property, index) => (
            <PropertyCard key={property.id} property={property} />
          ))} */}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/explore" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
            View all properties 
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Cities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {CITIES.map((city) => (
              <Link to={`/explore?city=${city.name}`} key={city.name} className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">{city.name}</h3>
                  <p className="text-sm text-gray-200">{city.count} properties</p>
                </div>
              </Link>
            ))} */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-indigo-600 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0">
             <div className="absolute inset-0 bg-indigo-600 opacity-90 z-10"></div>
             <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Background" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-20 py-16 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Are you a property owner?</h2>
              <p className="text-indigo-100 max-w-xl text-lg">
                List your property on our platform and reach millions of renters. 
                We handle the booking process so you don't have to.
              </p>
            </div>
            <Link to="/sign-up" className="bg-white text-indigo-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1 whitespace-nowrap">
              Become a Host
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
