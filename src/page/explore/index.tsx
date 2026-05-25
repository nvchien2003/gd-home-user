import { useState } from 'react';
import { Search, Map, Grid } from 'lucide-react';
import PropertyCard from '../../component/card';
import { usePropertiesQuery } from '../../hook/api.hooks';

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const { data, isLoading, isError } = usePropertiesQuery({ page: 1, limit: 12 });
  const properties = data?.data ?? [];

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
          <div className="hidden lg:block lg:col-span-1" />

          <div className="col-span-1 lg:col-span-3">
             <div className="mb-4">
               <h1 className="text-2xl font-bold text-gray-900">Properties for rent</h1>
             </div>

             {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {isLoading && <p className="text-gray-500">Loading properties...</p>}
                  {isError && <p className="text-red-500">Unable to load properties.</p>}
                  {!isLoading && !isError && properties.length === 0 && <p className="text-gray-500">No properties found.</p>}
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
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
                   {(data?.meta?.totalPages ?? 0) > 1 && <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium">2</button>}
                   {(data?.meta?.totalPages ?? 0) > 2 && <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium">3</button>}
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
