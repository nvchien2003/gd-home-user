import { CheckCircle, Clock } from "lucide-react";
import { PROPERTIES } from "../../../data/properties";

export function Rentals() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      <div className="space-y-4">
        {[1].map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-6 shadow-sm">
            <img src={PROPERTIES[0].image} alt={PROPERTIES[0].title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
            <div className="flex-grow">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold text-lg text-gray-900">{PROPERTIES[0].title}</h3>
                   <p className="text-gray-500 text-sm mb-2">{PROPERTIES[0].location}</p>
                 </div>
                 <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Active</span>
               </div>
               
               <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                   <Clock className="h-4 w-4" />
                   <span>Oct 12, 2024 - Nov 12, 2024</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4" />
                   <span>Paid: $12,350</span>
                 </div>
               </div>
               
               <div className="mt-4 flex gap-3">
                 <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">View Details</button>
                 <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Message Owner</button>
               </div>
            </div>
          </div>
        ))}
        
        <div className="text-center py-12 text-gray-500">
          <p>No past rentals.</p>
        </div>
      </div>
    </div>
  );
}
