
import { Link, useLocation } from 'react-router-dom';
import { Check, CreditCard, Star } from 'lucide-react';
import { useState } from 'react';
import { message } from 'antd';
import { useCreateBookingMutation, usePropertyDetailQuery } from '../../hook/api.hooks';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingMessage, setBookingMessage] = useState("");
  const location = useLocation();
  const state = location.state as { propertyId?: string | number; price?: number; startDate?: string; durationMonths?: number } | null;
  const propertyId = state?.propertyId;
  const { data: property } = usePropertyDetailQuery(propertyId);
  const createBooking = useCreateBookingMutation();
  const price = property?.pricePerMonth ?? state?.price ?? 0;

  const handleConfirm = async () => {
    try {
      await createBooking.mutateAsync({
        propertyId,
        startDate: state?.startDate,
        durationMonths: state?.durationMonths ?? 1,
        message: bookingMessage,
      });
      setStep(3);
    } catch {
      message.error("Booking failed. Please try again.");
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Your visit request has been sent to the owner. You will receive a confirmation email shortly.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/history" className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Go to Dashboard
          </Link>
          <Link to="/" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Request to Book</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>1</div>
              <span className="font-medium">Details</span>
            </div>
            <div className="h-px bg-gray-200 w-12"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>2</div>
              <span className="font-medium">Payment</span>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Your trip</h2>
              
              <div className="flex justify-between items-start py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Dates</h3>
                  <p className="text-gray-500 text-sm">{state?.startDate || "Select a date"} • {state?.durationMonths ?? 1} month</p>
                </div>
                <button className="text-indigo-600 font-medium text-sm underline">Edit</button>
              </div>
              
              <div className="flex justify-between items-start py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Guests</h3>
                  <p className="text-gray-500 text-sm">2 guests</p>
                </div>
                <button className="text-indigo-600 font-medium text-sm underline">Edit</button>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">Message to the owner</h3>
                <textarea 
                  className="w-full p-4 border border-gray-200 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Introduce yourself and tell the owner why you're interested in their property..."
                  value={bookingMessage}
                  onChange={(event) => setBookingMessage(event.target.value)}
                ></textarea>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Payment method</h2>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">Credit or debit card</span>
                </div>
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2">
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Card Number</label>
                   <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Expiration</label>
                   <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-1">CVC</label>
                   <input type="text" placeholder="123" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                 </div>
              </div>

              <button 
                onClick={handleConfirm}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {createBooking.isPending ? "Confirming..." : "Confirm and Pay"}
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg sticky top-8">
             <div className="flex gap-4 mb-6">
               <img src={property?.image ?? "/image/avatar.png"} alt="Thumbnail" className="w-24 h-24 object-cover rounded-lg" />
               <div>
                 <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">{property?.type ?? "Property"}</p>
                 <h3 className="font-bold text-gray-900 mb-1">{property?.title ?? "Selected property"}</h3>
                 <div className="flex items-center gap-1 text-xs text-gray-500">
                   <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                   <span>{property?.rating ?? 0} ({property?.reviews ?? 0} reviews)</span>
                 </div>
               </div>
             </div>
             
             <div className="border-t border-gray-100 pt-4 space-y-3">
               <div className="flex justify-between text-gray-600 text-sm">
                 <span className="underline">${price.toLocaleString()} x 1 month</span>
                 <span>${price.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-gray-600 text-sm">
                 <span className="underline">Cleaning fee</span>
                 <span>$200</span>
               </div>
               <div className="flex justify-between text-gray-600 text-sm">
                 <span className="underline">Service fee</span>
                 <span>$150</span>
               </div>
             </div>
             
             <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between font-bold text-gray-900 text-lg">
               <span>Total (USD)</span>
               <span>${(price + 350).toLocaleString()}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
