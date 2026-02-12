

import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, BedDouble, Bath, Square } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    pricePerMonth: number;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    rating: number;
    reviews: number;
    image: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all"
    >
      <Link to={`/property/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-semibold text-gray-900 shadow-sm">
            {property.type}
          </span>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/property/${property.id}`}>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors">{property.title}</h3>
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>{property.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-700">{property.beds}</span>
            <span className="hidden sm:inline">Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-700">{property.baths}</span>
            <span className="hidden sm:inline">Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-700">{property.sqft}</span>
            <span className="hidden sm:inline">ft²</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-indigo-600">${property.pricePerMonth.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <Link 
            to={`/property/${property.id}`} 
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
