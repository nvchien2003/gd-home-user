import { CheckCircle, Clock } from "lucide-react";
import { useRentalsQuery } from "../../../hook/api.hooks";

export function Rentals() {
  const { data, isLoading, isError } = useRentalsQuery({ page: 1, limit: 20 });
  const rentals = data?.data ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      <div className="space-y-4">
        {isLoading && <p className="text-gray-500">Loading bookings...</p>}
        {isError && <p className="text-red-500">Unable to load bookings.</p>}
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-6 shadow-sm">
            <img src={rental.property?.image ?? "/image/avatar.png"} alt={rental.property?.title ?? "Rental"} className="w-full md:w-48 h-32 object-cover rounded-lg" />
            <div className="flex-grow">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold text-lg text-gray-900">{rental.property?.title ?? "Rental booking"}</h3>
                   <p className="text-gray-500 text-sm mb-2">{rental.property?.location}</p>
                 </div>
                 <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">{rental.status}</span>
               </div>
               
               <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                   <Clock className="h-4 w-4" />
                   <span>{rental.startDate ?? "Start date pending"}{rental.endDate ? ` - ${rental.endDate}` : ""}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4" />
                   <span>Paid: ${rental.totalPrice.toLocaleString()}</span>
                 </div>
               </div>
               
               <div className="mt-4 flex gap-3">
                 <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">View Details</button>
                 <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Message Owner</button>
               </div>
            </div>
          </div>
        ))}
        
        {!isLoading && !isError && rentals.length === 0 && <div className="text-center py-12 text-gray-500">
          <p>No past rentals.</p>
        </div>}
      </div>
    </div>
  );
}
