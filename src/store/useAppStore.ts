import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allRecipes, Recipe } from '@/data/recipes';
import { allGroceryItems, GroceryItem } from '@/data/groceryItems';

export interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  price?: number;
  urgent?: boolean;
}

export interface MealPlan {
  [day: string]: {
    [mealType: string]: Recipe | null;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  preferences: {
    dietType: string;
    spiceLevel: string;
    cuisinePreference: string;
    allergies: string[];
    cookingExperience: string;
  };
}

interface AppState {
  // Authentication
  isAuthenticated: boolean;
  
  // Recipes
  recipes: Recipe[];
  favoriteRecipes: number[];
  
  // Shopping List
  shoppingList: ShoppingItem[];
  groceryItems: GroceryItem[];
  
  // Meal Plan
  mealPlan: MealPlan;
  
  // User Profile
  userProfile: UserProfile;
  
  // UI State
  isLoading: boolean;
  showSplash: boolean;
  
  // AI Features
  aiSuggestions: Recipe[];
  
  // Actions
  setAuthenticated: (authenticated: boolean) => void;
  addRecipe: (recipe: Recipe) => void;
  toggleFavorite: (recipeId: number) => void;
  addToShoppingList: (item: Omit<ShoppingItem, 'id'>) => void;
  toggleShoppingItem: (id: number) => void;
  removeShoppingItem: (id: number) => void;
  updateMealPlan: (day: string, mealType: string, recipe: Recipe | null) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setLoading: (loading: boolean) => void;
  setSplashComplete: () => void;
  generateShoppingListFromMealPlan: (scope?: 'today' | 'week', targetServings?: number) => void;
  generateAISuggestions: () => void;
  generateAIMealPlan: () => void;
  getCategoryFromName: (name: string) => string;
  searchRecipes: (query: string, filters?: any) => Recipe[];
  searchGroceryItems: (query: string, category?: string) => GroceryItem[];
}

// Load user data from localStorage if available
const loadUserData = () => {
  const userData = localStorage.getItem('cooksy-user');
  if (userData) {
    const user = JSON.parse(userData);
    return {
      ...user,
      bio: user.bio || `Welcome to Cooksy! I'm ${user.name || 'Guest User'} and I love cooking.`
    };
  }
  return {
    name: 'Guest User',
    email: '',
    phone: '',
    location: '',
    bio: 'Welcome to Cooksy! Start your culinary journey.',
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    preferences: {
      dietType: 'Vegetarian',
      spiceLevel: 'Medium',
      cuisinePreference: 'North Indian',
      allergies: [],
      cookingExperience: 'Intermediate'
    }
  };
};

const initialMealPlan: MealPlan = {
  Monday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  },
  Tuesday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  },
  Wednesday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  },
  Thursday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  },
  Friday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  },
  Saturday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  },
  Sunday: {
    Breakfast: null,
    Lunch: null,
    Dinner: null
  }
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: !!localStorage.getItem('cooksy-user'),
      recipes: allRecipes,
      favoriteRecipes: [],
      shoppingList: [],
      groceryItems: allGroceryItems,
      mealPlan: initialMealPlan,
      userProfile: loadUserData(),
      isLoading: false,
      showSplash: !localStorage.getItem('cooksy-user'),
      aiSuggestions: [],

      // Actions
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, recipe]
      })),

      toggleFavorite: (recipeId) => set((state) => ({
        favoriteRecipes: state.favoriteRecipes.includes(recipeId)
          ? state.favoriteRecipes.filter(id => id !== recipeId)
          : [...state.favoriteRecipes, recipeId]
      })),

      addToShoppingList: (item) => set((state) => ({
        shoppingList: [...state.shoppingList, { ...item, id: Date.now() }]
      })),

      toggleShoppingItem: (id) => set((state) => ({
        shoppingList: state.shoppingList.map(item =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      })),

      removeShoppingItem: (id) => set((state) => ({
        shoppingList: state.shoppingList.filter(item => item.id !== id)
      })),

      updateMealPlan: (day, mealType, recipe) => set((state) => ({
        mealPlan: {
          ...state.mealPlan,
          [day]: {
            ...state.mealPlan[day],
            [mealType]: recipe
          }
        }
      })),

      updateUserProfile: (profile) => {
        const updatedProfile = { ...get().userProfile, ...profile };
        localStorage.setItem('cooksy-user', JSON.stringify(updatedProfile));
        set({ userProfile: updatedProfile });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setSplashComplete: () => set({ showSplash: false }),

      generateShoppingListFromMealPlan: (scope = 'week', targetServings = 4) => {
        const { mealPlan, getCategoryFromName } = get();
        const ingredients = new Map<string, { quantity: number; unit: string; category: string }>();

        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const daysToProcess = scope === 'today' ? [today] : Object.keys(mealPlan);

        daysToProcess.forEach(day => {
          const dayMeals = mealPlan[day as keyof typeof mealPlan];
          if (dayMeals) {
            Object.values(dayMeals).forEach(meal => {
              if (meal && meal.ingredients) {
                const servingMultiplier = targetServings / (meal.servings || 4);
                
                meal.ingredients.forEach(ingredient => {
                  const [name, quantityStr] = ingredient.split(' - ');
                  const cleanName = name?.trim() || ingredient;
                  
                  if (quantityStr) {
                    const match = quantityStr.match(/(\d+(?:\.\d+)?)\s*(\w+|pieces?)/i);
                    if (match) {
                      const baseQty = parseFloat(match[1]);
                      const scaledQty = baseQty * servingMultiplier;
                      const unit = match[2];
                      
                      if (ingredients.has(cleanName)) {
                        const existing = ingredients.get(cleanName)!;
                        if (existing.unit === unit) {
                          existing.quantity += scaledQty;
                        }
                      } else {
                        ingredients.set(cleanName, {
                          quantity: scaledQty,
                          unit: unit,
                          category: getCategoryFromName(cleanName)
                        });
                      }
                    }
                  }
                });
              }
            });
          }
        });

        const newItems = Array.from(ingredients.entries()).map(([name, details]) => ({
          id: Date.now() + Math.random(),
          name,
          quantity: `${Math.round(details.quantity * 10) / 10}${details.unit}`,
          category: details.category,
          checked: false
        }));

        set({ shoppingList: newItems });
      },

      getCategoryFromName: (name: string) => {
        const categoryMap: { [key: string]: string } = {
          'onions': 'Vegetables', 'tomatoes': 'Vegetables', 'potatoes': 'Vegetables',
          'chicken': 'Meat & Seafood', 'fish': 'Meat & Seafood', 'mutton': 'Meat & Seafood',
          'paneer': 'Dairy & Alternatives', 'cream': 'Dairy & Alternatives', 'yogurt': 'Dairy & Alternatives',
          'rice': 'Grains & Cereals', 'wheat': 'Grains & Cereals', 'flour': 'Grains & Cereals',
          'lentils': 'Pulses & Lentils', 'dal': 'Pulses & Lentils',
          'oil': 'Oils & Fats', 'ghee': 'Oils & Fats', 'butter': 'Oils & Fats',
          'spices': 'Spices & Seasonings', 'salt': 'Spices & Seasonings', 'turmeric': 'Spices & Seasonings'
        };
        
        const lowerName = name.toLowerCase();
        for (const [key, category] of Object.entries(categoryMap)) {
          if (lowerName.includes(key)) return category;
        }
        return 'Other';
      },

      generateAISuggestions: () => {
        const { userProfile, recipes } = get();
        const { dietType, spiceLevel, cuisinePreference } = userProfile.preferences;
        
        // AI-like filtering based on user preferences
        const suggestions = recipes
          .filter(recipe => {
            if (dietType !== 'All' && recipe.dietType && recipe.dietType !== dietType) return false;
            if (spiceLevel !== 'All' && recipe.spiceLevel && recipe.spiceLevel !== spiceLevel) return false;
            if (cuisinePreference !== 'All' && recipe.region && recipe.region !== cuisinePreference) return false;
            return true;
          })
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);

        set({ aiSuggestions: suggestions });
      },

      generateAIMealPlan: () => {
        const { userProfile, recipes, mealPlan } = get();
        const { dietType, spiceLevel, cuisinePreference } = userProfile.preferences;
        
        // AI meal planning logic
        const filteredRecipes = recipes.filter(recipe => {
          if (dietType !== 'All' && recipe.dietType && recipe.dietType !== dietType) return false;
          if (spiceLevel !== 'All' && recipe.spiceLevel && recipe.spiceLevel !== spiceLevel) return false;
          return true;
        });

        const breakfastRecipes = filteredRecipes.filter(r => r.category === 'Breakfast' || r.cookTime.includes('15') || r.cookTime.includes('20'));
        const mainRecipes = filteredRecipes.filter(r => r.category === 'Main Course');
        const lightRecipes = filteredRecipes.filter(r => r.category === 'Snacks' || r.category === 'Soup');

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const newMealPlan = { ...mealPlan };

        days.forEach(day => {
          // Assign breakfast
          const breakfast = breakfastRecipes[Math.floor(Math.random() * breakfastRecipes.length)] || 
                           filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
          
          // Assign lunch and dinner from main courses
          const lunch = mainRecipes[Math.floor(Math.random() * mainRecipes.length)] || 
                       filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
          
          const dinner = mainRecipes[Math.floor(Math.random() * mainRecipes.length)] || 
                        filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];

          newMealPlan[day] = {
            Breakfast: breakfast,
            Lunch: lunch,
            Dinner: dinner
          };
        });

        console.log('Generated AI meal plan:', newMealPlan);
        set({ mealPlan: newMealPlan });
      },

      searchRecipes: (query, filters = {}) => {
        const { recipes } = get();
        return recipes.filter(recipe => {
          const matchesQuery = query === '' || 
            recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase())) ||
            (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));

          const matchesCategory = !filters.category || filters.category === 'All' || recipe.category === filters.category;
          const matchesRegion = !filters.region || filters.region === 'All' || recipe.region === filters.region;
          const matchesDiet = !filters.dietType || filters.dietType === 'All' || recipe.dietType === filters.dietType;
          const matchesSpice = !filters.spiceLevel || filters.spiceLevel === 'All' || recipe.spiceLevel === filters.spiceLevel;

          return matchesQuery && matchesCategory && matchesRegion && matchesDiet && matchesSpice;
        }).sort((a, b) => {
          // Sort by rating (highest first), then by name
          if (b.rating !== a.rating) return b.rating - a.rating;
          return a.name.localeCompare(b.name);
        });
      },

      searchGroceryItems: (query, category) => {
        const { groceryItems } = get();
        return groceryItems.filter(item => {
          const matchesQuery = query === '' || 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()));

          const matchesCategory = !category || category === 'All' || item.category === category;

          return matchesQuery && matchesCategory;
        });
      }
    }),
    {
      name: 'cooksy-app-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        favoriteRecipes: state.favoriteRecipes,
        shoppingList: state.shoppingList,
        mealPlan: state.mealPlan,
        userProfile: state.userProfile,
        showSplash: state.showSplash
      })
    }
  )
);