
import  { useState } from 'react';
import { Search, Map, Grid } from 'lucide-react';
import PropertyCard from '../../component/card';
export const PROPERTIES = [
  {
    id: 1,
    title: "Modern Minimalist Villa",
    location: "Beverly Hills, CA",
    price: 4500000,
    pricePerMonth: 12000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Villa",
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1600596542815-27b5f0450635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Pool", "Gym", "Garage", "Wifi", "AC"],
    description: "Experience luxury living in this stunning modern minimalist villa located in the heart of Beverly Hills. Featuring floor-to-ceiling windows, an infinity pool, and a state-of-the-art kitchen.",
    owner: {
      name: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 2,
    title: "Cozy Downtown Apartment",
    location: "New York, NY",
    price: 850000,
    pricePerMonth: 4500,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Apartment",
    rating: 4.5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Doorman", "Elevator", "Gym", "Wifi"],
    description: "A beautiful, fully furnished apartment in downtown Manhattan. Close to all major subway lines and the best restaurants in the city.",
    owner: {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 3,
    title: "Seaside Beach House",
    location: "Malibu, CA",
    price: 3200000,
    pricePerMonth: 9500,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: "House",
    rating: 4.9,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Beach Access", "Patio", "BBQ", "Parking"],
    description: "Wake up to the sound of waves in this charming beach house. Direct access to the sand and a large patio for sunset dinners.",
    owner: {
      name: "Emily Wilson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 4,
    title: "Rustic Mountain Cabin",
    location: "Aspen, CO",
    price: 1200000,
    pricePerMonth: 6000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Cabin",
    rating: 4.7,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Fireplace", "Hot Tub", "Mountain View", "Hiking"],
    description: "The perfect winter getaway. This cozy cabin features a stone fireplace, outdoor hot tub, and easy access to ski slopes.",
    owner: {
      name: "David Miller",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 5,
    title: "Urban Loft with View",
    location: "Seattle, WA",
    price: 950000,
    pricePerMonth: 3800,
    beds: 1,
    baths: 1.5,
    sqft: 950,
    type: "Loft",
    rating: 4.6,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["View", "Smart Home", "Wifi", "Coffee Bar"],
    description: "Modern loft in the heart of Seattle with stunning views of the Space Needle. Smart home integration and high-speed internet included.",
    owner: {
      name: "Jessica Lee",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 6,
    title: "Spacious Family Home",
    location: "Austin, TX",
    price: 650000,
    pricePerMonth: 3200,
    beds: 5,
    baths: 3,
    sqft: 2800,
    type: "House",
    rating: 4.4,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Yard", "Garage", "School District", "Parks"],
    description: "Ideal for families, this spacious home offers a large backyard, updated kitchen, and is located in a top-rated school district.",
    owner: {
      name: "Robert Brown",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  }
];
export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="relative flex-grow max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by city, neighborhood, or address" 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg transition-all outline-none"
                />
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                   <span className="hidden sm:inline">Sort by:</span>
                   <select className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
                     <option>Recommended</option>
                     <option>Price: Low to High</option>
                     <option>Price: High to Low</option>
                     <option>Newest</option>
                   </select>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                   <button 
                     onClick={() => setViewMode('grid')}
                     className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <Grid className="h-5 w-5" />
                   </button>
                   <button 
                     onClick={() => setViewMode('map')}
                     className={`p-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <Map className="h-5 w-5" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
             {/* <FilterSidebar /> */}
          </div>

          {/* Results */}
          <div className="col-span-1 lg:col-span-3">
             <div className="mb-4">
               <h1 className="text-2xl font-bold text-gray-900">Properties for rent</h1>
               {/* <p className="text-gray-500">{PROPERTIES.length} results found</p> */}
             </div>

             {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {PROPERTIES.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                  {/* Duplicating for demo to fill grid */}
                  {PROPERTIES.map((property) => (
                    <PropertyCard key={`dup-${property.id}`} property={{...property, id: parseInt(`99${property.id}`)}} />
                  ))}
                </div>
             ) : (
                <div className="bg-gray-200 rounded-xl h-[600px] flex items-center justify-center text-gray-500">
                   <div className="text-center">
                     <Map className="h-12 w-12 mx-auto mb-2 opacity-50" />
                     <p>Map view placeholder</p>
                   </div>
                </div>
             )}
             
             {viewMode === 'grid' && (
               <div className="mt-12 flex justify-center">
                 <nav className="flex items-center gap-1">
                   <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50">Previous</button>
                   <button className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-lg font-medium">1</button>
                   <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium">2</button>
                   <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium">3</button>
                   <span className="px-2 text-gray-400">...</span>
                   <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50">Next</button>
                 </nav>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
