import { useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Share2,
  Heart,
  Check,
  Shield,
} from "lucide-react";

import BookingWidget from "../../../component/booking";
import { usePropertyDetailQuery } from "../../../hook/api.hooks";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// FIX marker icon bị lỗi
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function PropertyDetailPage() {
  const { id } = useParams();

  const {
    data: property,
    isLoading,
    isError,
  } = usePropertyDetailQuery(id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-500">
        Loading property...
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-red-500">
        Unable to load property.
      </div>
    );
  }

  /**
   * TODO:
   * sau này nên lấy lat/lng từ API
   */
  const position: [number, number] = [
    property.latitude || 10.8231,
    property.longitude || 106.6297,
  ];

  return (
    <div className="bg-white pb-16">
      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />

                <span className="font-medium text-gray-900">
                  {property.rating}
                </span>

                <span className="underline">
                  ({property.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />

                <span>{property.location}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
              <Share2 className="h-4 w-4" />
              Share
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
              <Heart className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <div className="col-span-2 row-span-2 relative group cursor-pointer">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </div>

          <div className="col-span-1 row-span-1 relative group cursor-pointer">
            <img
              src={property.images?.[1] ?? property.image}
              alt="Detail 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="col-span-1 row-span-1 relative group cursor-pointer">
            <img
              src={property.images?.[2] ?? property.image}
              alt="Detail 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="col-span-1 row-span-1 relative group cursor-pointer">
            <img
              src={property.images?.[3] ?? property.image}
              alt="Detail 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="col-span-1 row-span-1 relative group cursor-pointer">
            <img
              src={property.images?.[4] ?? property.image}
              alt="Detail 4"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold text-lg">
                View all photos
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center pb-8 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Hosted by {property.owner.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  Joined in 2021
                </p>
              </div>

              <img
                src={property.owner.image}
                alt={property.owner.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
            </div>

            <div className="py-8 border-b border-gray-100">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <BedDouble className="h-6 w-6 text-indigo-600" />

                  <div>
                    <p className="font-bold text-gray-900">
                      {property.beds} Bedrooms
                    </p>

                    <p className="text-xs text-gray-500">
                      King & Queen beds
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Bath className="h-6 w-6 text-indigo-600" />

                  <div>
                    <p className="font-bold text-gray-900">
                      {property.baths} Bathrooms
                    </p>

                    <p className="text-xs text-gray-500">
                      En-suite available
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Square className="h-6 w-6 text-indigo-600" />

                  <div>
                    <p className="font-bold text-gray-900">
                      {property.sqft} sqft
                    </p>

                    <p className="text-xs text-gray-500">
                      Total area
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {property.description}
              </p>

              <p className="text-gray-600 leading-relaxed">
                Located in a quiet neighborhood, this property
                offers the perfect blend of comfort and style.
                Recently renovated with high-end finishes, it
                features an open concept living area, gourmet
                kitchen, and a private backyard oasis.
              </p>
            </div>

            <div className="py-8 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                What this place offers
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity: string) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <Check className="h-4 w-4" />
                    </div>

                    <span className="text-gray-700">
                      {amenity}
                    </span>
                  </div>
                ))}

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Shield className="h-4 w-4" />
                  </div>

                  <span className="text-gray-700">
                    Security cameras
                  </span>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Location
              </h2>

              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <MapContainer
                  center={position}
                  zoom={14}
                  scrollWheelZoom={false}
                  className="h-[400px] w-full z-0"
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={position}>
                    <Popup>
                      <div>
                        <h3 className="font-bold">
                          {property.title}
                        </h3>

                        <p>{property.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <BookingWidget
              price={property.pricePerMonth}
              propertyId={property.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}