import PropertyCard from "../../component/card";
import { PROPERTIES } from "../explore";

export function Favorites() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROPERTIES.slice(0, 4).map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}