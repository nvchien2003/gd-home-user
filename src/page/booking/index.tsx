import { Link, useLocation } from 'react-router-dom';
import { Check, CreditCard, Star } from 'lucide-react';
import { useState } from 'react';

import { message } from 'antd';

import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import {
  useCreateBookingMutation,
  usePropertyDetailQuery,
} from '../../hook/api.hooks';
import axiosClient from '../../api/axios';


export default function BookingPage() {
  const [step, setStep] = useState(1);

  const [bookingMessage, setBookingMessage] =
    useState('');

  const stripe = useStripe();

  const elements = useElements();

  const location = useLocation();

  const state = location.state as {
    propertyId?: string | number;
    price?: number;
    startDate?: string;
    durationMonths?: number;
  } | null;

  const propertyId = state?.propertyId;

  const { data: property } =
    usePropertyDetailQuery(propertyId);

  const createBooking =
    useCreateBookingMutation();

  const price =
    property?.pricePerMonth ??
    state?.price ??
    0;

  const total = price + 350;
console.log('location.state', state);

  const handleConfirm = async () => {
    try {
      if (!stripe || !elements) {
        return;
      }

      // USD => cents
      const amount = total * 100;

      /**
       * CREATE PAYMENT INTENT
       */
      const paymentResponse =
        await axiosClient.post(
          '/stripe/create-payment-intent',
          {
            amount,
          }
        );

      const clientSecret =
        paymentResponse.data.data.clientSecret;

      /**
       * GET CARD ELEMENT
       */
      const cardElement =
        elements.getElement(CardElement);

      if (!cardElement) {
        message.error(
          'Card information is missing.'
        );

        return;
      }

      /**
       * CONFIRM PAYMENT
       */
      const result =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

      /**
       * PAYMENT ERROR
       */
      if (result.error) {
        message.error(
          result.error.message ||
            'Payment failed.'
        );

        return;
      }

      /**
       * PAYMENT SUCCESS
       */
      if (
        result.paymentIntent?.status ===
        'succeeded'
      ) {
        /**
         * CREATE BOOKING
         */
        const startDate = new Date(
          state?.startDate || ''
        );
  console.log('startDate', startDate);    
        const endDate = new Date(startDate);

        endDate.setMonth(
          endDate.getMonth() +
            (state?.durationMonths ?? 1)
        );
        await createBooking.mutateAsync({
          propertyId,
           startDate:
           startDate.toISOString(),
           endDate: endDate.toISOString(),
          durationMonths:
            state?.durationMonths ?? 1,
          message: bookingMessage,
          paymentIntentId:
            result.paymentIntent.id,
        });

        message.success(
          'Payment successful!'
        );

        setStep(3);
      }
    } catch (error) {
      console.error(error);

      message.error(
        'Payment failed. Please try again.'
      );
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Your booking has been confirmed
          successfully.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/history"
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Request to Book
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* STEPS */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`flex items-center gap-2 ${
                step >= 1
                  ? 'text-indigo-600'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300'
                }`}
              >
                1
              </div>

              <span className="font-medium">
                Details
              </span>
            </div>

            <div className="h-px bg-gray-200 w-12"></div>

            <div
              className={`flex items-center gap-2 ${
                step >= 2
                  ? 'text-indigo-600'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300'
                }`}
              >
                2
              </div>

              <span className="font-medium">
                Payment
              </span>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Your trip
              </h2>

              <div className="flex justify-between items-start py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Dates
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {state?.startDate ||
                      'Select a date'}{' '}
                    •{' '}
                    {state?.durationMonths ??
                      1}{' '}
                    month
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Message to the owner
                </h3>

                <textarea
                  className="w-full p-4 border border-gray-200 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Introduce yourself..."
                  value={bookingMessage}
                  onChange={(event) =>
                    setBookingMessage(
                      event.target.value
                    )
                  }
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Payment method
              </h2>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />

                  <span className="font-medium text-gray-900">
                    Credit or debit card
                  </span>
                </div>
              </div>

              {/* STRIPE CARD */}
              <div className="border border-gray-200 rounded-lg p-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                    },
                  }}
                />
              </div>

              <button
                onClick={handleConfirm}
                disabled={
                  createBooking.isPending
                }
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {createBooking.isPending
                  ? 'Processing...'
                  : `Confirm and Pay $${total.toLocaleString()}`}
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

        {/* ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg sticky top-8">
            <div className="flex gap-4 mb-6">
              <img
                src={
                  property?.image ??
                  '/image/avatar.png'
                }
                alt="Thumbnail"
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">
                  {property?.type ??
                    'Property'}
                </p>

                <h3 className="font-bold text-gray-900 mb-1">
                  {property?.title ??
                    'Selected property'}
                </h3>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />

                  <span>
                    {property?.rating ?? 0} (
                    {property?.reviews ?? 0}{' '}
                    reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>
                  ${price.toLocaleString()} x
                  1 month
                </span>

                <span>
                  ${price.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-gray-600 text-sm">
                <span>Cleaning fee</span>

                <span>$200</span>
              </div>

              <div className="flex justify-between text-gray-600 text-sm">
                <span>Service fee</span>

                <span>$150</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between font-bold text-gray-900 text-lg">
              <span>Total (USD)</span>

              <span>
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}