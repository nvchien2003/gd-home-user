
import { useNavigate } from 'react-router-dom';

export default function BookingWidget({ price }: { price: number }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate('/booking');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg sticky top-24">
      <div className="flex items-end gap-2 mb-6">
        <span className="text-2xl font-bold text-indigo-600">${price.toLocaleString()}</span>
        <span className="text-gray-500 mb-1">/ month</span>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-3 border-b border-gray-200">
             <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Check-in</label>
             <input type="date" className="w-full text-sm text-gray-600 outline-none" />
          </div>
          <div className="p-3">
             <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Duration</label>
             <select className="w-full text-sm text-gray-600 outline-none bg-transparent">
               <option>1 Month</option>
               <option>3 Months</option>
               <option>6 Months</option>
               <option>12 Months</option>
             </select>
          </div>
        </div>

        <button 
          onClick={handleBook}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95 duration-100"
        >
          Book Visit
        </button>
        
        <div className="text-center text-xs text-gray-400 mt-2">
          You won't be charged yet
        </div>
        
        <div className="pt-4 space-y-3">
           <div className="flex justify-between text-gray-600 text-sm">
             <span className="underline">Monthly rent</span>
             <span>${price.toLocaleString()}</span>
           </div>
           <div className="flex justify-between text-gray-600 text-sm">
             <span className="underline">Service fee</span>
             <span>$150</span>
           </div>
           <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
             <span>Total first month</span>
             <span>${(price + 150).toLocaleString()}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
