export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  pricePerMonth: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  owner: {
    name: string;
    image: string;
  };
}

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Modern Minimalist Villa",
    location: "Beverly Hills, CA",
    price: 4500000,
    pricePerMonth: 12000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Villa",
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1600596542815-27b5f0450635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Pool", "Gym", "Garage", "Wifi", "AC"],
    description: "Experience luxury living in this stunning modern minimalist villa located in the heart of Beverly Hills. Featuring floor-to-ceiling windows, an infinity pool, and a state-of-the-art kitchen.",
    owner: {
      name: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: 2,
    title: "Cozy Downtown Apartment",
    location: "New York, NY",
    price: 850000,
    pricePerMonth: 4500,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Apartment",
    rating: 4.5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Doorman", "Elevator", "Gym", "Wifi"],
    description: "A beautiful, fully furnished apartment in downtown Manhattan. Close to all major subway lines and the best restaurants in the city.",
    owner: {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: 3,
    title: "Seaside Beach House",
    location: "Malibu, CA",
    price: 3200000,
    pricePerMonth: 9500,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: "House",
    rating: 4.9,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Beach Access", "Patio", "BBQ", "Parking"],
    description: "Wake up to the sound of waves in this charming beach house. Direct access to the sand and a large patio for sunset dinners.",
    owner: {
      name: "Emily Wilson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: 4,
    title: "Rustic Mountain Cabin",
    location: "Aspen, CO",
    price: 1200000,
    pricePerMonth: 6000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Cabin",
    rating: 4.7,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Fireplace", "Hot Tub", "Mountain View", "Hiking"],
    description: "The perfect winter getaway. This cozy cabin features a stone fireplace, outdoor hot tub, and easy access to ski slopes.",
    owner: {
      name: "David Miller",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: 5,
    title: "Urban Loft with View",
    location: "Seattle, WA",
    price: 950000,
    pricePerMonth: 3800,
    beds: 1,
    baths: 1.5,
    sqft: 950,
    type: "Loft",
    rating: 4.6,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["View", "Smart Home", "Wifi", "Coffee Bar"],
    description: "Modern loft in the heart of Seattle with stunning views of the Space Needle. Smart home integration and high-speed internet included.",
    owner: {
      name: "Jessica Lee",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: 6,
    title: "Spacious Family Home",
    location: "Austin, TX",
    price: 650000,
    pricePerMonth: 3200,
    beds: 5,
    baths: 3,
    sqft: 2800,
    type: "House",
    rating: 4.4,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Yard", "Garage", "School District", "Parks"],
    description: "Ideal for families, this spacious home offers a large backyard, updated kitchen, and is located in a top-rated school district.",
    owner: {
      name: "Robert Brown",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  },
];
