export interface Tool {
  id: number;
  name: string;
  brand: string;
  price: number;
  image?: string;
  description: string;
}

export interface Collection {
  id: number;
  name: string;
  category: string;
  price: number;
  items: number;
  rating: number;
  reviews: number;
  description: string;
  popular: boolean;
  tools: Tool[];
}

export let collections: Collection[] = [
  {
    id: 1,
    name: 'Bricklayer Starter Kit',
    category: 'bricklaying',
    price: 899,
    items: 28,
    rating: 4.9,
    reviews: 156,
    description: 'Complete set for professional block laying with premium trowels, levels, and safety gear',
    popular: true,
    tools: [],
  },
  {
    id: 2,
    name: 'Electrician Pro Pack',
    category: 'electrical',
    price: 1299,
    items: 42,
    rating: 4.8,
    reviews: 203,
    description: 'Professional-grade electrical tools including multimeters, wire strippers, and safety equipment',
    popular: true,
    tools: [],
  },
  {
    id: 3,
    name: 'Plasterer Essential Set',
    category: 'plastering',
    price: 749,
    items: 24,
    rating: 4.7,
    reviews: 98,
    description: 'Everything needed for smooth finishes including hawks, trowels, and mixing tools',
    popular: false,
    tools: [],
  },
  {
    id: 4,
    name: 'Plumber Complete Kit',
    category: 'plumbing',
    price: 1099,
    items: 35,
    rating: 4.9,
    reviews: 187,
    description: 'Comprehensive plumbing toolkit with pipe wrenches, cutters, and specialized fittings',
    popular: true,
    tools: [],
  },
  {
    id: 5,
    name: 'Carpenter Master Set',
    category: 'carpentry',
    price: 1499,
    items: 52,
    rating: 5.0,
    reviews: 245,
    description: 'Premium woodworking tools including saws, chisels, planes, and measuring equipment',
    popular: true,
    tools: [],
  },
  {
    id: 6,
    name: 'Bricklayer Advanced Kit',
    category: 'bricklaying',
    price: 1399,
    items: 38,
    rating: 4.8,
    reviews: 112,
    description: 'Advanced toolkit with laser levels, professional mixers, and specialty cutting tools',
    popular: false,
    tools: [],
  },
];
