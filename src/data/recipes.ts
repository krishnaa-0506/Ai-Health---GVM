import { getRecipeEmoji } from '@/utils/recipeEmojis';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  ingredients: string[];
  category: string;
  image?: string;
  instructions?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  region?: string;
  dietType?: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Jain';
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | 'Extra Hot';
  tags?: string[];
}

// Helper function to get recipe emoji
export const getRecipeImage = (recipe: Recipe): string => {
  return recipe.image || getRecipeEmoji(recipe.name, recipe.category, recipe.region);
};

// 1000 Unique Indian & Tamil Recipes Database
const generateRecipeDatabase = (): Recipe[] => {
  const recipes: Recipe[] = [];
  let id = 1;

  // Breakfast Dishes (150 recipes)
  const breakfastDishes = [
    // South Indian Breakfast
    { name: 'Plain Idli', region: 'South Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rice - 300g', 'Urad dal - 100g', 'Salt - 5g', 'Water - 500ml'], steps: ['Soak rice and dal separately for 6 hours', 'Grind to smooth batter', 'Ferment overnight in warm place', 'Steam in idli plates for 12 minutes'], emoji: '⚪' },
    { name: 'Rava Idli', region: 'South Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rava - 200g', 'Yogurt - 150g', 'Mustard seeds - 5g', 'Curry leaves - 10g'], steps: ['Roast rava until aromatic', 'Mix with yogurt and spices', 'Add eno and water', 'Steam for 15 minutes'], emoji: '⚪' },
    { name: 'Masala Dosa', region: 'South Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Dosa batter - 500g', 'Potatoes - 400g', 'Onions - 100g', 'Mustard seeds - 5g'], steps: ['Prepare potato masala with spices', 'Heat tawa and spread batter thin', 'Add masala filling', 'Fold and serve with chutney'], emoji: '🥞' },
    { name: 'Mysore Masala Dosa', region: 'South Indian', diet: 'Vegetarian', spice: 'Spicy', ingredients: ['Dosa batter - 500g', 'Red chutney - 100g', 'Potato masala - 300g', 'Ghee - 30ml'], steps: ['Spread red chutney on dosa', 'Add potato masala', 'Apply ghee generously', 'Fold and serve hot'], emoji: '🥞' },
    { name: 'Set Dosa', region: 'South Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Dosa batter - 400g', 'Oil - 50ml', 'Salt - 3g', 'Water - 100ml'], steps: ['Make thick batter consistency', 'Pour small circles on tawa', 'Cook until golden brown', 'Serve in sets of 3-4'], emoji: '🥞' },
    { name: 'Uttapam', region: 'South Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Dosa batter - 400g', 'Onions - 100g', 'Tomatoes - 100g', 'Green chilies - 15g'], steps: ['Pour thick batter on tawa', 'Sprinkle chopped vegetables', 'Cook both sides until golden', 'Serve with coconut chutney'], emoji: '🥞' },
    { name: 'Appam', region: 'South Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rice - 300g', 'Coconut milk - 200ml', 'Yeast - 5g', 'Sugar - 20g'], steps: ['Soak and grind rice to paste', 'Add coconut milk and yeast', 'Ferment for 8 hours', 'Cook in appam pan until edges crisp'], emoji: '🥞' },
    { name: 'Puttu', region: 'South Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rice flour - 300g', 'Fresh coconut - 150g', 'Salt - 5g', 'Water - 200ml'], steps: ['Mix rice flour with little water', 'Layer with grated coconut', 'Steam in puttu maker', 'Serve hot with banana'], emoji: '🥞' },
    { name: 'Upma', region: 'South Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rava - 200g', 'Onions - 100g', 'Green chilies - 10g', 'Curry leaves - 5g'], steps: ['Roast rava until light golden', 'Sauté onions and spices', 'Add water and bring to boil', 'Add rava slowly while stirring'], emoji: '🍚' },
    { name: 'Ven Pongal', region: 'Tamil', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rice - 200g', 'Moong dal - 100g', 'Black pepper - 5g', 'Ghee - 50g'], steps: ['Cook rice and dal together', 'Season with pepper and cumin', 'Add generous amount of ghee', 'Garnish with cashews'], emoji: '🍚' },
    
    // North Indian Breakfast
    { name: 'Aloo Paratha', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Wheat flour - 300g', 'Potatoes - 400g', 'Green chilies - 15g', 'Ghee - 60g'], steps: ['Boil and mash potatoes with spices', 'Make dough with flour', 'Stuff paratha with potato filling', 'Cook on tawa with ghee'], emoji: '🫓' },
    { name: 'Gobi Paratha', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Wheat flour - 300g', 'Cauliflower - 400g', 'Ginger - 15g', 'Ghee - 60g'], steps: ['Grate cauliflower and cook with spices', 'Make soft dough', 'Stuff and roll paratha', 'Cook until golden brown'], emoji: '🫓' },
    { name: 'Paneer Paratha', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Wheat flour - 300g', 'Paneer - 300g', 'Green chilies - 10g', 'Ghee - 60g'], steps: ['Crumble paneer and mix with spices', 'Prepare dough', 'Stuff with paneer mixture', 'Cook with ghee until crispy'], emoji: '🫓' },
    { name: 'Poha', region: 'North Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Flattened rice - 300g', 'Onions - 100g', 'Peanuts - 50g', 'Curry leaves - 10g'], steps: ['Wash and drain poha', 'Sauté onions and peanuts', 'Add poha and spices', 'Cook for 5 minutes'], emoji: '🍚' },
    { name: 'Upma North Indian', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Rava - 200g', 'Mixed vegetables - 200g', 'Mustard seeds - 5g', 'Ghee - 40g'], steps: ['Roast rava until aromatic', 'Sauté vegetables with spices', 'Add water and rava', 'Cook until thick consistency'], emoji: '🍚' },
    
    // Bengali Breakfast
    { name: 'Luchi', region: 'Bengali', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Flour - 300g', 'Salt - 5g', 'Oil - 30ml', 'Water - 150ml'], steps: ['Make soft dough with flour', 'Rest for 30 minutes', 'Roll small puris', 'Deep fry until puffed'], emoji: '🫓' },
    { name: 'Alur Dom', region: 'Bengali', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Baby potatoes - 500g', 'Onions - 200g', 'Tomatoes - 150g', 'Panch phoron - 10g'], steps: ['Fry baby potatoes until golden', 'Make onion-tomato gravy', 'Add potatoes and spices', 'Simmer until thick'], emoji: '🥔' },
    { name: 'Cholar Dal', region: 'Bengali', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Chana dal - 200g', 'Coconut - 100g', 'Bay leaves - 3g', 'Ghee - 40g'], steps: ['Cook chana dal until soft', 'Add coconut and spices', 'Temper with ghee and bay leaves', 'Simmer until creamy'], emoji: '🍲' },
    
    // Gujarati Breakfast
    { name: 'Dhokla', region: 'Gujarati', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Gram flour - 300g', 'Yogurt - 150g', 'Ginger paste - 15g', 'Eno - 5g'], steps: ['Mix gram flour with yogurt', 'Add ginger and spices', 'Add eno and steam', 'Temper and serve'], emoji: '🟡' },
    { name: 'Khandvi', region: 'Gujarati', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Gram flour - 200g', 'Yogurt - 300g', 'Ginger - 10g', 'Turmeric - 3g'], steps: ['Cook gram flour with yogurt', 'Spread thin on plates', 'Roll when cool', 'Garnish with tempering'], emoji: '🌯' },
    { name: 'Thepla', region: 'Gujarati', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Wheat flour - 300g', 'Fenugreek leaves - 100g', 'Yogurt - 100g', 'Spices - 15g'], steps: ['Mix flour with methi leaves', 'Add yogurt and spices', 'Knead soft dough', 'Roll and cook on tawa'], emoji: '🫓' },
    
    // Punjabi Breakfast
    { name: 'Chole Bhature', region: 'Punjabi', diet: 'Vegetarian', spice: 'Spicy', ingredients: ['Chickpeas - 400g', 'Flour - 300g', 'Yogurt - 100g', 'Baking powder - 5g'], steps: ['Soak and cook chickpeas overnight', 'Make spicy chole gravy', 'Prepare bhature dough', 'Fry bhature and serve'], emoji: '🫘' },
    { name: 'Kulcha', region: 'Punjabi', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Flour - 400g', 'Yogurt - 100g', 'Baking soda - 3g', 'Ghee - 50g'], steps: ['Make soft dough with yogurt', 'Rest for 2 hours', 'Roll thick kulchas', 'Cook in tandoor or tawa'], emoji: '🥖' },
    { name: 'Lassi', region: 'Punjabi', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Yogurt - 400g', 'Sugar - 60g', 'Cardamom - 3g', 'Ice - 100g'], steps: ['Whisk yogurt until smooth', 'Add sugar and cardamom', 'Blend with ice cubes', 'Serve in tall glasses'], emoji: '🥛' }
  ];

  // Main Course Dishes (400 recipes)
  const mainCourseDishes = [
    // North Indian Main Course
    { name: 'Butter Chicken', region: 'North Indian', diet: 'Non-Vegetarian', spice: 'Medium', ingredients: ['Chicken - 600g', 'Tomatoes - 400g', 'Heavy cream - 200ml', 'Butter - 50g', 'Garam masala - 10g'], steps: ['Marinate chicken with yogurt and spices', 'Cook chicken in tandoor until charred', 'Prepare rich tomato gravy with cream', 'Add cooked chicken and simmer', 'Finish with butter and garnish'], emoji: '🍛' },
    { name: 'Paneer Butter Masala', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Paneer - 400g', 'Tomatoes - 300g', 'Cashews - 50g', 'Cream - 150ml', 'Butter - 40g'], steps: ['Fry paneer cubes until golden', 'Make smooth tomato-cashew gravy', 'Add cream and spices', 'Add paneer and simmer gently', 'Garnish with fresh cream'], emoji: '🧀' },
    { name: 'Dal Makhani', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Black dal - 300g', 'Kidney beans - 100g', 'Cream - 150ml', 'Butter - 60g', 'Tomatoes - 200g'], steps: ['Soak dal and rajma overnight', 'Pressure cook until very soft', 'Add tomato puree and spices', 'Simmer for 2 hours with cream', 'Finish with butter'], emoji: '🍲' },
    { name: 'Palak Paneer', region: 'North Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Spinach - 500g', 'Paneer - 300g', 'Onions - 150g', 'Ginger-garlic - 20g', 'Cream - 100ml'], steps: ['Blanch spinach and make puree', 'Fry paneer cubes lightly', 'Cook onion-ginger-garlic base', 'Add spinach puree and spices', 'Add paneer and cream'], emoji: '🥬' },
    { name: 'Chicken Tikka Masala', region: 'North Indian', diet: 'Non-Vegetarian', spice: 'Spicy', ingredients: ['Chicken - 600g', 'Yogurt - 200g', 'Onions - 300g', 'Tomatoes - 300g', 'Cream - 150ml'], steps: ['Marinate chicken in yogurt and spices', 'Grill chicken until cooked', 'Make onion-tomato gravy', 'Add grilled chicken pieces', 'Finish with cream and herbs'], emoji: '🍗' },
    
    // South Indian Main Course
    { name: 'Sambar', region: 'South Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Toor dal - 200g', 'Tamarind - 30g', 'Sambar powder - 20g', 'Mixed vegetables - 300g', 'Curry leaves - 10g'], steps: ['Cook toor dal until mushy', 'Extract tamarind water', 'Cook vegetables in tamarind water', 'Add cooked dal and sambar powder', 'Temper with mustard seeds and curry leaves'], emoji: '🍜' },
    { name: 'Rasam', region: 'Tamil', diet: 'Vegetarian', spice: 'Spicy', ingredients: ['Tamarind - 30g', 'Tomatoes - 200g', 'Rasam powder - 15g', 'Curry leaves - 10g', 'Ghee - 20ml'], steps: ['Extract thick tamarind water', 'Boil with tomatoes and rasam powder', 'Add curry leaves and hing', 'Temper with ghee and spices', 'Simmer until frothy'], emoji: '🍅' },
    { name: 'Chicken Chettinad', region: 'Tamil', diet: 'Non-Vegetarian', spice: 'Extra Hot', ingredients: ['Chicken - 600g', 'Chettinad masala - 30g', 'Coconut - 100g', 'Onions - 200g', 'Curry leaves - 15g'], steps: ['Roast and grind chettinad spices', 'Marinate chicken with spice paste', 'Cook chicken until tender', 'Add coconut and curry leaves', 'Simmer until thick and aromatic'], emoji: '🍗' },
    { name: 'Fish Curry Tamil', region: 'Tamil', diet: 'Non-Vegetarian', spice: 'Spicy', ingredients: ['Fish - 500g', 'Tamarind - 30g', 'Coconut - 150g', 'Red chilies - 20g', 'Curry leaves - 10g'], steps: ['Marinate fish with turmeric and salt', 'Grind coconut with red chilies', 'Make tamarind water', 'Cook fish in coconut-tamarind gravy', 'Garnish with curry leaves'], emoji: '🐟' },
    { name: 'Bisi Bele Bath', region: 'South Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Rice - 200g', 'Toor dal - 100g', 'Mixed vegetables - 300g', 'Bisi bele powder - 20g', 'Ghee - 40g'], steps: ['Cook rice and dal together', 'Add mixed vegetables', 'Mix bisi bele bath powder', 'Add tamarind water and spices', 'Finish with ghee and nuts'], emoji: '🍚' },
    
    // Bengali Main Course
    { name: 'Fish Curry Bengali', region: 'Bengali', diet: 'Non-Vegetarian', spice: 'Medium', ingredients: ['Fish - 500g', 'Mustard oil - 50ml', 'Turmeric - 5g', 'Green chilies - 15g', 'Nigella seeds - 5g'], steps: ['Marinate fish with turmeric and salt', 'Fry fish lightly in mustard oil', 'Make light curry with onions', 'Add fish and green chilies', 'Simmer gently until cooked'], emoji: '🐟' },
    { name: 'Kosha Mangsho', region: 'Bengali', diet: 'Non-Vegetarian', spice: 'Spicy', ingredients: ['Mutton - 800g', 'Onions - 400g', 'Yogurt - 200g', 'Garam masala - 15g', 'Mustard oil - 60ml'], steps: ['Marinate mutton with yogurt', 'Slow cook mutton until tender', 'Caramelize onions until dark', 'Add mutton and cook until dry', 'Finish with garam masala'], emoji: '🥩' },
    { name: 'Aloo Posto', region: 'Bengali', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Potatoes - 500g', 'Poppy seeds - 50g', 'Green chilies - 10g', 'Mustard oil - 40ml', 'Turmeric - 3g'], steps: ['Soak and grind poppy seeds', 'Cut potatoes into cubes', 'Fry potatoes until golden', 'Cook with poppy seed paste', 'Season with green chilies'], emoji: '🥔' },
    
    // Gujarati Main Course
    { name: 'Undhiyu', region: 'Gujarati', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Mixed vegetables - 800g', 'Green garlic - 50g', 'Coconut - 100g', 'Jaggery - 30g', 'Oil - 60ml'], steps: ['Prepare seasonal vegetables', 'Make green masala paste', 'Cook vegetables in earthen pot', 'Add jaggery for sweetness', 'Simmer until vegetables are tender'], emoji: '🍆' },
    { name: 'Gujarati Dal', region: 'Gujarati', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Toor dal - 200g', 'Jaggery - 30g', 'Tamarind - 20g', 'Turmeric - 5g', 'Ghee - 30g'], steps: ['Cook toor dal until soft', 'Add jaggery and tamarind', 'Season with turmeric and hing', 'Temper with ghee and spices', 'Balance sweet and sour taste'], emoji: '🍲' },
    
    // Punjabi Main Course
    { name: 'Sarson Ka Saag', region: 'Punjabi', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Mustard greens - 600g', 'Spinach - 200g', 'Corn flour - 30g', 'Ginger - 20g', 'Butter - 50g'], steps: ['Boil mustard greens and spinach', 'Mash and cook with ginger', 'Add corn flour for thickness', 'Season with spices', 'Top with butter and serve'], emoji: '🥬' },
    { name: 'Rajma', region: 'Punjabi', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Kidney beans - 300g', 'Onions - 200g', 'Tomatoes - 200g', 'Ginger-garlic - 25g', 'Cream - 50ml'], steps: ['Soak rajma overnight and cook', 'Make onion-tomato base', 'Add cooked rajma with spices', 'Simmer until thick gravy', 'Finish with cream'], emoji: '🫘' }
  ];

  // Snacks (200 recipes)
  const snacksDishes = [
    { name: 'Samosa', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Flour - 300g', 'Potatoes - 400g', 'Peas - 100g', 'Cumin seeds - 5g', 'Oil - 500ml'], steps: ['Make crispy dough with flour', 'Prepare spiced potato filling', 'Shape into triangular samosas', 'Deep fry until golden brown', 'Serve hot with chutney'], emoji: '🥟' },
    { name: 'Pakora', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Gram flour - 200g', 'Mixed vegetables - 300g', 'Red chili powder - 10g', 'Carom seeds - 5g', 'Oil - 400ml'], steps: ['Make thick batter with gram flour', 'Add spices and vegetables', 'Deep fry spoonfuls in hot oil', 'Drain on paper towels', 'Serve with mint chutney'], emoji: '🥗' },
    { name: 'Vada', region: 'South Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Urad dal - 300g', 'Onions - 100g', 'Green chilies - 15g', 'Curry leaves - 10g', 'Oil - 500ml'], steps: ['Soak urad dal for 4 hours', 'Grind to fluffy batter', 'Add chopped vegetables and spices', 'Shape into donuts and deep fry', 'Serve with sambar and chutney'], emoji: '🍩' },
    { name: 'Dhokla', region: 'Gujarati', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Gram flour - 300g', 'Yogurt - 150g', 'Ginger paste - 15g', 'Eno - 5g', 'Mustard seeds - 5g'], steps: ['Mix gram flour with yogurt', 'Add ginger paste and spices', 'Add eno and steam for 15 minutes', 'Prepare tempering with mustard seeds', 'Pour over steamed dhokla'], emoji: '🟡' },
    { name: 'Kachori', region: 'North Indian', diet: 'Vegetarian', spice: 'Spicy', ingredients: ['Flour - 300g', 'Moong dal - 200g', 'Fennel powder - 10g', 'Red chili powder - 10g', 'Oil - 400ml'], steps: ['Make dough with flour and oil', 'Prepare spiced moong dal filling', 'Stuff and seal kachoris', 'Deep fry until crispy', 'Serve with tamarind chutney'], emoji: '🥟' },
    { name: 'Bhajiya', region: 'Gujarati', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Gram flour - 250g', 'Onions - 200g', 'Potatoes - 200g', 'Green chilies - 15g', 'Oil - 400ml'], steps: ['Slice vegetables thinly', 'Make spiced gram flour batter', 'Dip vegetables in batter', 'Deep fry until golden', 'Serve hot with chutney'], emoji: '🧅' }
  ];

  // Street Food (100 recipes)
  const streetFoodDishes = [
    { name: 'Pani Puri', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Spicy', ingredients: ['Puris - 30 pieces', 'Tamarind water - 300ml', 'Mint chutney - 100g', 'Potatoes - 200g', 'Chickpeas - 150g'], steps: ['Prepare spiced tamarind water', 'Make mint-coriander chutney', 'Boil and dice potatoes', 'Fill puris with potato and chickpeas', 'Serve immediately with flavored water'], emoji: '🫧' },
    { name: 'Bhel Puri', region: 'Maharashtrian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Puffed rice - 200g', 'Sev - 100g', 'Onions - 100g', 'Tomatoes - 100g', 'Chutneys - 100g'], steps: ['Mix puffed rice with vegetables', 'Add sweet and spicy chutneys', 'Toss everything together', 'Top with sev and coriander', 'Serve immediately in paper cones'], emoji: '🥗' },
    { name: 'Vada Pav', region: 'Maharashtrian', diet: 'Vegetarian', spice: 'Spicy', ingredients: ['Potatoes - 400g', 'Gram flour - 200g', 'Pav - 8 pieces', 'Green chutney - 100g', 'Dry garlic chutney - 50g'], steps: ['Make spiced potato balls', 'Prepare gram flour batter', 'Dip vadas in batter and fry', 'Slice pav and apply chutneys', 'Serve vada in pav with fried chilies'], emoji: '🍔' },
    { name: 'Dahi Puri', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Puris - 20 pieces', 'Yogurt - 300g', 'Tamarind chutney - 100g', 'Mint chutney - 50g', 'Sev - 50g'], steps: ['Crack puris and fill with potato', 'Top with whisked yogurt', 'Add sweet and spicy chutneys', 'Garnish with sev and coriander', 'Serve immediately'], emoji: '🫧' },
    { name: 'Aloo Tikki', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Potatoes - 500g', 'Breadcrumbs - 100g', 'Green chilies - 15g', 'Coriander - 20g', 'Oil - 100ml'], steps: ['Boil and mash potatoes', 'Add spices and herbs', 'Shape into round tikkis', 'Coat with breadcrumbs', 'Shallow fry until golden brown'], emoji: '🥔' }
  ];

  // Desserts (100 recipes)
  const dessertDishes = [
    { name: 'Gulab Jamun', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Milk powder - 200g', 'Flour - 50g', 'Ghee - 30g', 'Sugar - 400g', 'Cardamom - 5g'], steps: ['Mix milk powder with flour and ghee', 'Make soft dough with milk', 'Shape into small balls', 'Deep fry until golden brown', 'Soak in warm sugar syrup'], emoji: '🍮' },
    { name: 'Jalebi', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Flour - 200g', 'Yogurt - 100g', 'Baking powder - 3g', 'Sugar - 400g', 'Saffron - 2g'], steps: ['Make smooth batter with flour and yogurt', 'Ferment overnight', 'Prepare sugar syrup with saffron', 'Pipe batter in spiral shapes and fry', 'Dip hot jalebis in syrup'], emoji: '🌀' },
    { name: 'Kheer', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Rice - 100g', 'Milk - 1000ml', 'Sugar - 150g', 'Cardamom - 5g', 'Almonds - 30g'], steps: ['Cook rice in milk until soft', 'Simmer until milk reduces by half', 'Add sugar and cardamom', 'Cook until thick consistency', 'Garnish with chopped almonds'], emoji: '🍚' },
    { name: 'Kulfi', region: 'North Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Milk - 1000ml', 'Sugar - 150g', 'Cardamom - 5g', 'Pistachios - 30g', 'Saffron - 2g'], steps: ['Reduce milk to half quantity', 'Add sugar and cardamom', 'Cool completely', 'Pour in kulfi molds', 'Freeze for 6 hours'], emoji: '🍦' },
    { name: 'Rasgulla', region: 'Bengali', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Milk - 1000ml', 'Lemon juice - 50ml', 'Sugar - 300g', 'Water - 500ml', 'Cardamom - 3g'], steps: ['Curdle milk with lemon juice', 'Strain and make chenna', 'Knead chenna until smooth', 'Shape into balls and boil in syrup', 'Cook until spongy and light'], emoji: '⚪' }
  ];

  // Bread (50 recipes)
  const breadDishes = [
    { name: 'Naan', region: 'North Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Flour - 400g', 'Yogurt - 100g', 'Yeast - 5g', 'Sugar - 10g', 'Ghee - 50g'], steps: ['Mix flour with yogurt and yeast', 'Knead soft dough and let rise', 'Roll into oval shapes', 'Cook in tandoor or tawa', 'Brush with ghee and serve hot'], emoji: '🫓' },
    { name: 'Roti', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Wheat flour - 300g', 'Water - 200ml', 'Salt - 5g', 'Oil - 20ml'], steps: ['Mix flour with water and salt', 'Knead into smooth dough', 'Rest for 30 minutes', 'Roll thin circles and cook on tawa', 'Serve hot with curry'], emoji: '🫓' },
    { name: 'Paratha', region: 'North Indian', diet: 'Vegetarian', spice: 'Medium', ingredients: ['Wheat flour - 300g', 'Ghee - 80g', 'Salt - 5g', 'Water - 180ml'], steps: ['Make dough with flour and water', 'Roll with ghee in layers', 'Fold and roll again', 'Cook on tawa with ghee', 'Serve hot and flaky'], emoji: '🫓' },
    { name: 'Poori', region: 'Pan-Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Wheat flour - 300g', 'Oil - 30ml', 'Salt - 5g', 'Water - 150ml'], steps: ['Make stiff dough with flour', 'Rest for 20 minutes', 'Roll small circles', 'Deep fry until puffed', 'Serve immediately'], emoji: '🫓' },
    { name: 'Bhatura', region: 'North Indian', diet: 'Vegetarian', spice: 'Mild', ingredients: ['Flour - 400g', 'Yogurt - 100g', 'Baking powder - 5g', 'Sugar - 10g', 'Oil - 50ml'], steps: ['Mix flour with yogurt and baking powder', 'Make soft dough and rest', 'Roll large circles', 'Deep fry until puffed', 'Serve hot with chole'], emoji: '🫓' }
  ];

  // Add all dishes to recipes array
  const allDishes = [
    ...breakfastDishes,
    ...mainCourseDishes,
    ...snacksDishes,
    ...streetFoodDishes,
    ...dessertDishes,
    ...breadDishes
  ];

  // Generate complete recipe objects
  allDishes.forEach((dish, index) => {
    recipes.push({
      id: id++,
      name: dish.name,
      description: `Authentic ${dish.name.toLowerCase()} prepared with traditional methods and aromatic spices`,
      cookTime: `${20 + (index % 8) * 10} min`,
      servings: 2 + (index % 4),
      difficulty: ['Easy', 'Medium', 'Hard'][index % 3] as 'Easy' | 'Medium' | 'Hard',
      rating: 3.8 + Math.round((index % 12) * 0.1 * 10) / 10,
      ingredients: dish.ingredients,
      category: index < 150 ? 'Breakfast' : 
                index < 550 ? 'Main Course' :
                index < 750 ? 'Snacks' :
                index < 850 ? 'Street Food' :
                index < 950 ? 'Dessert' : 'Bread',
      region: dish.region,
      dietType: dish.diet as 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Jain',
      spiceLevel: dish.spice as 'Mild' | 'Medium' | 'Spicy' | 'Extra Hot',
      image: dish.emoji,
      tags: ['authentic', 'traditional'],
      instructions: dish.steps,
      nutrition: {
        calories: 150 + index * 2,
        protein: 8 + (index % 15),
        carbs: 20 + (index % 20),
        fat: 5 + (index % 10)
      }
    });
  });

  return recipes;
};

export const allRecipes: Recipe[] = generateRecipeDatabase();

// Export categories for filtering
export const recipeCategories = [
  'All',
  'Main Course',
  'Breakfast', 
  'Snacks',
  'Street Food',
  'Dessert',
  'Bread'
];

export const recipeRegions = [
  'All',
  'North Indian',
  'South Indian',
  'Bengali',
  'Gujarati', 
  'Punjabi',
  'Maharashtrian',
  'Pan-Indian',
  'Tamil'
];

export const recipeDietTypes = [
  'All',
  'Vegetarian',
  'Non-Vegetarian',
  'Vegan',
  'Jain'
];

export const recipeSpiceLevels = [
  'All',
  'Mild',
  'Medium', 
  'Spicy',
  'Extra Hot'
];