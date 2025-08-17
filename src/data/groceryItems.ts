export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  unit: string;
  price?: number;
  brand?: string;
  description?: string;
  nutritionPer100g?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  tags?: string[];
  alternatives?: string[];
}

// Grains & Cereals
const grainsAndCereals: GroceryItem[] = [
  {
    id: 1,
    name: 'Basmati Rice',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 120,
    description: 'Premium long-grain aromatic rice',
    nutritionPer100g: { calories: 365, protein: 7.1, carbs: 78, fat: 0.9, fiber: 1.3 },
    tags: ['premium', 'aromatic', 'long-grain'],
    alternatives: ['Jasmine Rice', 'Regular Rice']
  },
  {
    id: 2,
    name: 'Brown Rice',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 80,
    description: 'Whole grain rice with bran layer',
    nutritionPer100g: { calories: 370, protein: 7.9, carbs: 77, fat: 2.9, fiber: 3.5 },
    tags: ['whole-grain', 'healthy', 'fiber-rich'],
    alternatives: ['Red Rice', 'Black Rice']
  },
  {
    id: 3,
    name: 'Wheat Flour (Atta)',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 45,
    description: 'Whole wheat flour for rotis and bread',
    nutritionPer100g: { calories: 340, protein: 12, carbs: 72, fat: 1.5, fiber: 10.7 },
    tags: ['whole-wheat', 'staple', 'protein-rich'],
    alternatives: ['All-Purpose Flour', 'Multigrain Flour']
  },
  {
    id: 4,
    name: 'All-Purpose Flour (Maida)',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 40,
    description: 'Refined wheat flour for baking',
    nutritionPer100g: { calories: 364, protein: 10, carbs: 76, fat: 0.98, fiber: 2.7 },
    tags: ['refined', 'baking', 'versatile'],
    alternatives: ['Wheat Flour', 'Self-Rising Flour']
  },
  {
    id: 5,
    name: 'Semolina (Suji/Rava)',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 55,
    description: 'Coarse wheat flour for upma and desserts',
    nutritionPer100g: { calories: 360, protein: 12.7, carbs: 72.8, fat: 1.05, fiber: 3.9 },
    tags: ['coarse', 'versatile', 'quick-cooking'],
    alternatives: ['Fine Semolina', 'Broken Wheat']
  },
  {
    id: 6,
    name: 'Quinoa',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 400,
    description: 'Superfood grain with complete protein',
    nutritionPer100g: { calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, fiber: 7 },
    tags: ['superfood', 'protein-complete', 'gluten-free'],
    alternatives: ['Amaranth', 'Buckwheat']
  },
  {
    id: 7,
    name: 'Oats',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 150,
    description: 'Rolled oats for breakfast and baking',
    nutritionPer100g: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
    tags: ['fiber-rich', 'heart-healthy', 'breakfast'],
    alternatives: ['Steel-Cut Oats', 'Instant Oats']
  },
  {
    id: 8,
    name: 'Barley',
    category: 'Grains & Cereals',
    unit: 'kg',
    price: 90,
    description: 'Nutritious grain for soups and salads',
    nutritionPer100g: { calories: 354, protein: 12.5, carbs: 73.5, fat: 2.3, fiber: 17.3 },
    tags: ['fiber-rich', 'nutritious', 'versatile'],
    alternatives: ['Pearl Barley', 'Hulled Barley']
  }
];

// Pulses & Lentils
const pulsesAndLentils: GroceryItem[] = [
  {
    id: 101,
    name: 'Toor Dal (Pigeon Peas)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 120,
    description: 'Yellow split pigeon peas for sambar and dal',
    nutritionPer100g: { calories: 343, protein: 22.3, carbs: 62.8, fat: 1.5, fiber: 15 },
    tags: ['protein-rich', 'staple', 'south-indian'],
    alternatives: ['Moong Dal', 'Masoor Dal']
  },
  {
    id: 102,
    name: 'Moong Dal (Green Gram)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 140,
    description: 'Split green gram, easy to digest',
    nutritionPer100g: { calories: 347, protein: 24.5, carbs: 59, fat: 1.2, fiber: 16.3 },
    tags: ['easy-digest', 'protein-rich', 'versatile'],
    alternatives: ['Whole Moong', 'Moong Chilka']
  },
  {
    id: 103,
    name: 'Masoor Dal (Red Lentils)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 110,
    description: 'Red split lentils, quick cooking',
    nutritionPer100g: { calories: 352, protein: 25.8, carbs: 60, fat: 1.1, fiber: 11.5 },
    tags: ['quick-cooking', 'protein-rich', 'iron-rich'],
    alternatives: ['Whole Masoor', 'Black Masoor']
  },
  {
    id: 104,
    name: 'Chana Dal (Bengal Gram)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 100,
    description: 'Split chickpeas for dal and snacks',
    nutritionPer100g: { calories: 372, protein: 22.5, carbs: 61.5, fat: 5.3, fiber: 9.9 },
    tags: ['versatile', 'protein-rich', 'fiber-rich'],
    alternatives: ['Whole Chana', 'Roasted Chana']
  },
  {
    id: 105,
    name: 'Urad Dal (Black Gram)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 130,
    description: 'Black gram for idli, dosa, and dal',
    nutritionPer100g: { calories: 341, protein: 25, carbs: 58.9, fat: 1.6, fiber: 18.3 },
    tags: ['fermentation', 'protein-rich', 'south-indian'],
    alternatives: ['Whole Urad', 'Urad Chilka']
  },
  {
    id: 106,
    name: 'Rajma (Kidney Beans)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 160,
    description: 'Red kidney beans for curry',
    nutritionPer100g: { calories: 333, protein: 23.6, carbs: 60.3, fat: 0.8, fiber: 15.2 },
    tags: ['protein-rich', 'fiber-rich', 'north-indian'],
    alternatives: ['White Rajma', 'Black Rajma']
  },
  {
    id: 107,
    name: 'Chickpeas (Kabuli Chana)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 90,
    description: 'White chickpeas for chole and salads',
    nutritionPer100g: { calories: 364, protein: 19.3, carbs: 61, fat: 6.04, fiber: 17.4 },
    tags: ['protein-rich', 'versatile', 'fiber-rich'],
    alternatives: ['Black Chickpeas', 'Green Chickpeas']
  },
  {
    id: 108,
    name: 'Black Eyed Peas (Lobia)',
    category: 'Pulses & Lentils',
    unit: 'kg',
    price: 120,
    description: 'Black eyed peas for curry and salads',
    nutritionPer100g: { calories: 336, protein: 23.5, carbs: 60.7, fat: 1.3, fiber: 10.6 },
    tags: ['protein-rich', 'nutritious', 'versatile'],
    alternatives: ['Green Peas', 'Field Peas']
  }
];

// Vegetables
const vegetables: GroceryItem[] = [
  {
    id: 201,
    name: 'Onions',
    category: 'Vegetables',
    unit: 'kg',
    price: 30,
    description: 'Fresh red onions for cooking',
    nutritionPer100g: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
    tags: ['staple', 'aromatic', 'versatile'],
    alternatives: ['White Onions', 'Spring Onions']
  },
  {
    id: 202,
    name: 'Tomatoes',
    category: 'Vegetables',
    unit: 'kg',
    price: 40,
    description: 'Fresh ripe tomatoes',
    nutritionPer100g: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
    tags: ['vitamin-c', 'antioxidant', 'versatile'],
    alternatives: ['Cherry Tomatoes', 'Roma Tomatoes']
  },
  {
    id: 203,
    name: 'Potatoes',
    category: 'Vegetables',
    unit: 'kg',
    price: 25,
    description: 'Fresh potatoes for cooking',
    nutritionPer100g: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2 },
    tags: ['staple', 'versatile', 'filling'],
    alternatives: ['Sweet Potatoes', 'Baby Potatoes']
  },
  {
    id: 204,
    name: 'Carrots',
    category: 'Vegetables',
    unit: 'kg',
    price: 50,
    description: 'Fresh orange carrots',
    nutritionPer100g: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8 },
    tags: ['vitamin-a', 'sweet', 'crunchy'],
    alternatives: ['Purple Carrots', 'Baby Carrots']
  },
  {
    id: 205,
    name: 'Green Beans',
    category: 'Vegetables',
    unit: 'kg',
    price: 60,
    description: 'Fresh green beans',
    nutritionPer100g: { calories: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 3.4 },
    tags: ['fiber-rich', 'low-calorie', 'nutritious'],
    alternatives: ['French Beans', 'Flat Beans']
  },
  {
    id: 206,
    name: 'Cauliflower',
    category: 'Vegetables',
    unit: 'piece',
    price: 40,
    description: 'Fresh white cauliflower',
    nutritionPer100g: { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2 },
    tags: ['low-carb', 'vitamin-c', 'versatile'],
    alternatives: ['Purple Cauliflower', 'Romanesco']
  },
  {
    id: 207,
    name: 'Cabbage',
    category: 'Vegetables',
    unit: 'piece',
    price: 30,
    description: 'Fresh green cabbage',
    nutritionPer100g: { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5 },
    tags: ['low-calorie', 'vitamin-k', 'crunchy'],
    alternatives: ['Red Cabbage', 'Chinese Cabbage']
  },
  {
    id: 208,
    name: 'Spinach',
    category: 'Vegetables',
    unit: 'bunch',
    price: 20,
    description: 'Fresh green spinach leaves',
    nutritionPer100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
    tags: ['iron-rich', 'leafy-green', 'nutritious'],
    alternatives: ['Baby Spinach', 'Red Spinach']
  }
];

// Spices & Seasonings
const spicesAndSeasonings: GroceryItem[] = [
  {
    id: 301,
    name: 'Turmeric Powder',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 80,
    description: 'Pure turmeric powder for color and health',
    nutritionPer100g: { calories: 354, protein: 7.8, carbs: 64.9, fat: 9.9, fiber: 21 },
    tags: ['anti-inflammatory', 'golden', 'medicinal'],
    alternatives: ['Fresh Turmeric', 'Organic Turmeric']
  },
  {
    id: 302,
    name: 'Red Chili Powder',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 120,
    description: 'Hot red chili powder for spice',
    nutritionPer100g: { calories: 282, protein: 13.5, carbs: 53.9, fat: 14.3, fiber: 27.2 },
    tags: ['hot', 'spicy', 'vitamin-c'],
    alternatives: ['Kashmiri Chili Powder', 'Paprika']
  },
  {
    id: 303,
    name: 'Cumin Powder',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 200,
    description: 'Ground cumin seeds for earthy flavor',
    nutritionPer100g: { calories: 375, protein: 17.8, carbs: 44.2, fat: 22.3, fiber: 10.5 },
    tags: ['earthy', 'aromatic', 'digestive'],
    alternatives: ['Whole Cumin', 'Black Cumin']
  },
  {
    id: 304,
    name: 'Coriander Powder',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 100,
    description: 'Ground coriander seeds',
    nutritionPer100g: { calories: 298, protein: 12.4, carbs: 54.9, fat: 17.8, fiber: 41.9 },
    tags: ['mild', 'aromatic', 'versatile'],
    alternatives: ['Whole Coriander', 'Fresh Coriander']
  },
  {
    id: 305,
    name: 'Garam Masala',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 150,
    description: 'Blend of warming spices',
    nutritionPer100g: { calories: 379, protein: 14.3, carbs: 50.5, fat: 15.8, fiber: 24.6 },
    tags: ['blend', 'warming', 'aromatic'],
    alternatives: ['Homemade Garam Masala', 'Punjabi Garam Masala']
  },
  {
    id: 306,
    name: 'Mustard Seeds',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 80,
    description: 'Black mustard seeds for tempering',
    nutritionPer100g: { calories: 508, protein: 26.1, carbs: 28.1, fat: 36.2, fiber: 12.2 },
    tags: ['tempering', 'pungent', 'oil-rich'],
    alternatives: ['Yellow Mustard Seeds', 'Brown Mustard Seeds']
  },
  {
    id: 307,
    name: 'Cardamom',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 1200,
    description: 'Green cardamom pods for aroma',
    nutritionPer100g: { calories: 311, protein: 10.8, carbs: 68.5, fat: 6.7, fiber: 28 },
    tags: ['aromatic', 'premium', 'sweet'],
    alternatives: ['Black Cardamom', 'Cardamom Powder']
  },
  {
    id: 308,
    name: 'Cinnamon',
    category: 'Spices & Seasonings',
    unit: 'grams',
    price: 300,
    description: 'Ceylon cinnamon sticks',
    nutritionPer100g: { calories: 247, protein: 4, carbs: 80.6, fat: 1.2, fiber: 53.1 },
    tags: ['sweet', 'aromatic', 'warming'],
    alternatives: ['Cassia Cinnamon', 'Cinnamon Powder']
  }
];

// Dairy & Alternatives
const dairyAndAlternatives: GroceryItem[] = [
  {
    id: 401,
    name: 'Milk (Full Fat)',
    category: 'Dairy & Alternatives',
    unit: 'liter',
    price: 60,
    description: 'Fresh full-fat cow milk',
    nutritionPer100g: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0 },
    tags: ['protein-rich', 'calcium', 'fresh'],
    alternatives: ['Low-Fat Milk', 'Skimmed Milk']
  },
  {
    id: 402,
    name: 'Yogurt (Curd)',
    category: 'Dairy & Alternatives',
    unit: 'kg',
    price: 80,
    description: 'Fresh homemade-style yogurt',
    nutritionPer100g: { calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0 },
    tags: ['probiotic', 'cooling', 'digestive'],
    alternatives: ['Greek Yogurt', 'Hung Curd']
  },
  {
    id: 403,
    name: 'Paneer',
    category: 'Dairy & Alternatives',
    unit: 'grams',
    price: 400,
    description: 'Fresh cottage cheese',
    nutritionPer100g: { calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0 },
    tags: ['protein-rich', 'fresh', 'versatile'],
    alternatives: ['Tofu', 'Ricotta Cheese']
  },
  {
    id: 404,
    name: 'Ghee',
    category: 'Dairy & Alternatives',
    unit: 'grams',
    price: 500,
    description: 'Pure clarified butter',
    nutritionPer100g: { calories: 900, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    tags: ['pure', 'aromatic', 'traditional'],
    alternatives: ['Butter', 'Coconut Oil']
  },
  {
    id: 405,
    name: 'Butter',
    category: 'Dairy & Alternatives',
    unit: 'grams',
    price: 450,
    description: 'Fresh salted butter',
    nutritionPer100g: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, fiber: 0 },
    tags: ['creamy', 'rich', 'baking'],
    alternatives: ['Unsalted Butter', 'Plant-Based Butter']
  }
];

// Oils & Fats
const oilsAndFats: GroceryItem[] = [
  {
    id: 501,
    name: 'Mustard Oil',
    category: 'Oils & Fats',
    unit: 'liter',
    price: 150,
    description: 'Cold-pressed mustard oil',
    nutritionPer100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    tags: ['cold-pressed', 'pungent', 'traditional'],
    alternatives: ['Refined Mustard Oil', 'Sesame Oil']
  },
  {
    id: 502,
    name: 'Coconut Oil',
    category: 'Oils & Fats',
    unit: 'liter',
    price: 200,
    description: 'Virgin coconut oil',
    nutritionPer100g: { calories: 862, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    tags: ['virgin', 'aromatic', 'healthy'],
    alternatives: ['Refined Coconut Oil', 'Extra Virgin Coconut Oil']
  },
  {
    id: 503,
    name: 'Sunflower Oil',
    category: 'Oils & Fats',
    unit: 'liter',
    price: 120,
    description: 'Refined sunflower cooking oil',
    nutritionPer100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    tags: ['neutral', 'high-heat', 'versatile'],
    alternatives: ['Safflower Oil', 'Canola Oil']
  },
  {
    id: 504,
    name: 'Olive Oil',
    category: 'Oils & Fats',
    unit: 'liter',
    price: 800,
    description: 'Extra virgin olive oil',
    nutritionPer100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    tags: ['extra-virgin', 'healthy', 'mediterranean'],
    alternatives: ['Light Olive Oil', 'Pomace Olive Oil']
  }
];

// Generate more grocery items to reach 500+
const generateMoreGroceryItems = (): GroceryItem[] => {
  const moreItems: GroceryItem[] = [];
  let id = 600;

  // Additional vegetables
  const moreVegetables = [
    'Brinjal', 'Okra', 'Bitter Gourd', 'Bottle Gourd', 'Ridge Gourd',
    'Drumsticks', 'Cluster Beans', 'French Beans', 'Peas', 'Corn',
    'Bell Peppers', 'Green Chilies', 'Ginger', 'Garlic', 'Mint Leaves',
    'Coriander Leaves', 'Curry Leaves', 'Fenugreek Leaves', 'Dill Leaves'
  ];

  moreVegetables.forEach((name, index) => {
    moreItems.push({
      id: id++,
      name,
      category: 'Vegetables',
      unit: index % 3 === 0 ? 'kg' : index % 3 === 1 ? 'bunch' : 'grams',
      price: 30 + index * 5,
      description: `Fresh ${name.toLowerCase()} for cooking`,
      nutritionPer100g: {
        calories: 20 + index * 2,
        protein: 1 + index * 0.2,
        carbs: 4 + index * 0.5,
        fat: 0.1 + index * 0.05,
        fiber: 2 + index * 0.1
      },
      tags: ['fresh', 'nutritious'],
      alternatives: [`Organic ${name}`, `Baby ${name}`]
    });
  });

  // Additional spices
  const moreSpices = [
    'Cloves', 'Bay Leaves', 'Star Anise', 'Nutmeg', 'Mace',
    'Fennel Seeds', 'Fenugreek Seeds', 'Nigella Seeds', 'Carom Seeds',
    'Asafoetida', 'Dry Red Chilies', 'Black Pepper', 'White Pepper',
    'Saffron', 'Vanilla Extract', 'Rose Water', 'Kewra Water'
  ];

  moreSpices.forEach((name, index) => {
    moreItems.push({
      id: id++,
      name,
      category: 'Spices & Seasonings',
      unit: 'grams',
      price: 50 + index * 20,
      description: `Premium ${name.toLowerCase()} for authentic flavor`,
      nutritionPer100g: {
        calories: 250 + index * 10,
        protein: 5 + index * 0.5,
        carbs: 40 + index * 2,
        fat: 8 + index * 0.8,
        fiber: 15 + index
      },
      tags: ['aromatic', 'premium'],
      alternatives: [`Organic ${name}`, `Whole ${name}`]
    });
  });

  // Additional pantry items
  const pantryItems = [
    'Tamarind', 'Jaggery', 'Rock Salt', 'Black Salt', 'Sugar',
    'Honey', 'Vinegar', 'Baking Soda', 'Baking Powder', 'Cornstarch',
    'Cashews', 'Almonds', 'Pistachios', 'Walnuts', 'Raisins',
    'Dates', 'Coconut (Fresh)', 'Coconut (Dried)', 'Sesame Seeds', 'Poppy Seeds'
  ];

  pantryItems.forEach((name, index) => {
    moreItems.push({
      id: id++,
      name,
      category: index < 10 ? 'Pantry Essentials' : 'Nuts & Dry Fruits',
      unit: index % 4 === 0 ? 'kg' : 'grams',
      price: 80 + index * 15,
      description: `High-quality ${name.toLowerCase()}`,
      nutritionPer100g: {
        calories: 200 + index * 15,
        protein: 3 + index * 0.8,
        carbs: 30 + index * 2,
        fat: 5 + index * 1.2,
        fiber: 3 + index * 0.5
      },
      tags: ['quality', 'essential'],
      alternatives: [`Organic ${name}`, `Premium ${name}`]
    });
  });

  return moreItems;
};

// Combine all grocery items
export const allGroceryItems: GroceryItem[] = [
  ...grainsAndCereals,
  ...pulsesAndLentils,
  ...vegetables,
  ...spicesAndSeasonings,
  ...dairyAndAlternatives,
  ...oilsAndFats,
  ...generateMoreGroceryItems()
];

// Export categories for filtering
export const groceryCategories = [
  'All',
  'Grains & Cereals',
  'Pulses & Lentils',
  'Vegetables',
  'Spices & Seasonings',
  'Dairy & Alternatives',
  'Oils & Fats',
  'Pantry Essentials',
  'Nuts & Dry Fruits'
];

// Common shopping list templates
export const shoppingListTemplates = {
  'Weekly Essentials': [
    { name: 'Basmati Rice', quantity: '2 kg', category: 'Grains & Cereals' },
    { name: 'Wheat Flour', quantity: '5 kg', category: 'Grains & Cereals' },
    { name: 'Toor Dal', quantity: '1 kg', category: 'Pulses & Lentils' },
    { name: 'Onions', quantity: '2 kg', category: 'Vegetables' },
    { name: 'Tomatoes', quantity: '1 kg', category: 'Vegetables' },
    { name: 'Potatoes', quantity: '2 kg', category: 'Vegetables' },
    { name: 'Milk', quantity: '2 liters', category: 'Dairy & Alternatives' },
    { name: 'Cooking Oil', quantity: '1 liter', category: 'Oils & Fats' }
  ],
  'Spice Refill': [
    { name: 'Turmeric Powder', quantity: '200g', category: 'Spices & Seasonings' },
    { name: 'Red Chili Powder', quantity: '200g', category: 'Spices & Seasonings' },
    { name: 'Cumin Powder', quantity: '100g', category: 'Spices & Seasonings' },
    { name: 'Coriander Powder', quantity: '200g', category: 'Spices & Seasonings' },
    { name: 'Garam Masala', quantity: '100g', category: 'Spices & Seasonings' },
    { name: 'Mustard Seeds', quantity: '100g', category: 'Spices & Seasonings' }
  ],
  'Party Shopping': [
    { name: 'Paneer', quantity: '500g', category: 'Dairy & Alternatives' },
    { name: 'Chicken', quantity: '1 kg', category: 'Meat & Seafood' },
    { name: 'Basmati Rice', quantity: '2 kg', category: 'Grains & Cereals' },
    { name: 'Heavy Cream', quantity: '200ml', category: 'Dairy & Alternatives' },
    { name: 'Cashews', quantity: '200g', category: 'Nuts & Dry Fruits' },
    { name: 'Saffron', quantity: '1g', category: 'Spices & Seasonings' }
  ]
};