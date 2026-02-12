import { Link } from "react-router-dom";
import PropertyCard from "../../../component/card";
import { PROPERTIES } from "../../explore";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-indigo-100">You have 1 upcoming viewing and 2 new messages.</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="100" />
          </svg>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Viewings</h2>
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 items-center shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
            12<span className="text-xs font-normal ml-0.5">Oct</span>
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-gray-900">Modern Minimalist Villa</h3>
            <p className="text-gray-500 text-sm">Beverly Hills, CA • 10:00 AM</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">Confirmed</span>
        </div>
      </div>

      <div>
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold text-gray-900">Recent Favorites</h2>
           <Link to="favorites" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View all</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {PROPERTIES.slice(0, 2).map(property => (
             <PropertyCard key={property.id} property={property} />
           ))}
         </div>
      </div>
    </div>
  );
}