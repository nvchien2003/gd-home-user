import { useEffect, useMemo, useState } from 'react';
import { Search, Map, Grid } from 'lucide-react';
import { Button, Skeleton } from 'antd';
import PropertyCard from '../../component/card';
import { useDebouncedValue, useProperties, usePropertyFilters } from '../../modules/properties';
import type { PaginationParams } from '../../api/api.types';

const SORT_OPTIONS = [
  { label: 'Recommended', value: '' },
  { label: 'Price: Low to High', value: 'pricePerMonth:asc' },
  { label: 'Price: High to Low', value: 'pricePerMonth:desc' },
  { label: 'Newest', value: 'createdAt:desc' },
];

const ROOM_TYPES = [
  { label: 'Any type', value: '' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
  { label: 'Shared room', value: 'shared_room' },
];

const pageNumbers = (currentPage: number, totalPages: number) => {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const sortValue = (filters: PaginationParams) =>
  filters.sortBy && filters.order ? `${filters.sortBy}:${filters.order}` : '';

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const { filters, updateFilters, setPage, resetFilters } = usePropertyFilters();
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const debouncedSearch = useDebouncedValue(searchInput);
  const { data, isLoading, isFetching, isError, refetch } = useProperties(filters);
  const properties = data?.data ?? [];
  const meta = data?.meta;
  const currentPage = meta?.page ?? filters.page ?? 1;
  const totalPages = meta?.totalPages ?? 1;
  const hasActiveFilters = useMemo(
    () => Boolean(filters.search || filters.location || filters.type || filters.minPrice || filters.maxPrice || filters.beds || filters.baths || filters.sortBy),
    [filters],
  );

  useEffect(() => {
    setSearchInput(filters.search ?? '');
  }, [filters.search]);

  useEffect(() => {
    if ((filters.search ?? '') !== debouncedSearch) {
      updateFilters({ search: debouncedSearch || undefined });
    }
  }, [debouncedSearch, filters.search, updateFilters]);

  const handleSortChange = (value: string) => {
    const [sortBy, order] = value.split(':');
    updateFilters({
      sortBy: sortBy || undefined,
      order: order === 'asc' || order === 'desc' ? order : undefined,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="relative flex-grow max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by city, neighborhood, or address"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg transition-all outline-none"
                />
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                   <span className="hidden sm:inline">Sort by:</span>
                   <select
                     value={sortValue(filters)}
                     onChange={(event) => handleSortChange(event.target.value)}
                     className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer"
                   >
                     {SORT_OPTIONS.map((option) => (
                       <option key={option.label} value={option.value}>{option.label}</option>
                     ))}
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
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Reset
                  </button>
                )}
              </div>

              <label className="block">
                <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Location</span>
                <input
                  value={filters.location ?? ''}
                  onChange={(event) => updateFilters({ location: event.target.value || undefined })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ho Chi Minh City"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Property type</span>
                <select
                  value={filters.type ?? ''}
                  onChange={(event) => updateFilters({ type: event.target.value || undefined })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ROOM_TYPES.map((option) => (
                    <option key={option.label} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Min price</span>
                  <input
                    type="number"
                    min={0}
                    value={filters.minPrice ?? ''}
                    onChange={(event) => updateFilters({ minPrice: event.target.value ? Number(event.target.value) : undefined })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Max price</span>
                  <input
                    type="number"
                    min={0}
                    value={filters.maxPrice ?? ''}
                    onChange={(event) => updateFilters({ maxPrice: event.target.value ? Number(event.target.value) : undefined })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Beds</span>
                  <input
                    type="number"
                    min={0}
                    value={filters.beds ?? ''}
                    onChange={(event) => updateFilters({ beds: event.target.value ? Number(event.target.value) : undefined })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Baths</span>
                  <input
                    type="number"
                    min={0}
                    value={filters.baths ?? ''}
                    onChange={(event) => updateFilters({ baths: event.target.value ? Number(event.target.value) : undefined })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>
            </div>
          </aside>

          <div className="col-span-1 lg:col-span-2">
             <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <h1 className="text-2xl font-bold text-gray-900">Properties for rent</h1>
               <div className="flex items-center gap-2 text-sm text-gray-500">
                 <span>{meta?.total ?? 0} results</span>
                 <select
                   value={filters.limit ?? 12}
                   onChange={(event) => updateFilters({ limit: Number(event.target.value) })}
                   className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-700 outline-none"
                   disabled={isFetching}
                 >
                   <option value={6}>6 / page</option>
                   <option value={12}>12 / page</option>
                   <option value={24}>24 / page</option>
                 </select>
               </div>
             </div>

             {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {isLoading && Array.from({ length: filters.limit ?? 12 }, (_, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-100 p-4">
                      <Skeleton.Image active className="!w-full !h-48" />
                      <Skeleton active paragraph={{ rows: 4 }} className="mt-4" />
                    </div>
                  ))}
                  {isError && (
                    <div className="col-span-full rounded-xl border border-red-100 bg-red-50 p-6 text-center">
                      <p className="mb-4 text-red-600">Unable to load properties.</p>
                      <Button onClick={() => refetch()}>Retry</Button>
                    </div>
                  )}
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
                   <button
                     disabled={isFetching || currentPage <= 1}
                     onClick={() => setPage(currentPage - 1)}
                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                   >
                     Previous
                   </button>
                   {pageNumbers(currentPage, totalPages).map((page) => (
                     <button
                       key={page}
                       disabled={isFetching}
                       onClick={() => setPage(page)}
                       className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${page === currentPage ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                     >
                       {page}
                     </button>
                   ))}
                   <button
                     disabled={isFetching || currentPage >= totalPages}
                     onClick={() => setPage(currentPage + 1)}
                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                   >
                     Next
                   </button>
                 </nav>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
