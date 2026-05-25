import PropertyCard from "../../component/card";
import { useFavoritesQuery } from "../../hook/api.hooks";

export function Favorites() {
  const { data: properties = [], isLoading, isError } = useFavoritesQuery();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading && <p className="text-gray-500">Loading saved properties...</p>}
        {isError && <p className="text-red-500">Unable to load saved properties.</p>}
        {!isLoading && !isError && properties.length === 0 && <p className="text-gray-500">No saved properties.</p>}
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} isFavorite />
        ))}
      </div>
    </div>
  );
}
