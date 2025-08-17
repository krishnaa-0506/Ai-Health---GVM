import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppStore } from '@/store/useAppStore';
import { 
  Clock, Users, Star, Heart, ArrowLeft, Plus, 
  ChefHat, Utensils, Calendar, Share, Download 
} from 'lucide-react';
import { useState } from 'react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, favoriteRecipes, toggleFavorite, addToShoppingList, mealPlan, updateMealPlan } = useAppStore();
  const [servings, setServings] = useState(4);

  const recipe = recipes.find(r => r.id === parseInt(id || '0'));
  
  console.log('Looking for recipe ID:', id);
  console.log('Found recipe:', recipe);
  console.log('Total recipes available:', recipes.length);

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/recipes')} variant="hero">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFavorite = favoriteRecipes.includes(recipe.id);
  const scaledIngredients = recipe.ingredients.map(ingredient => {
    const [name, quantity] = ingredient.split(' - ');
    if (!quantity) return ingredient;
    
    const multiplier = servings / recipe.servings;
    const numMatch = quantity.match(/(\d+(?:\.\d+)?)/);
    const unit = quantity.replace(/\d+(?:\.\d+)?/, '').trim();
    
    if (numMatch) {
      const baseQty = parseFloat(numMatch[1]);
      const scaledQty = Math.round(baseQty * multiplier * 10) / 10;
      return `${name} - ${scaledQty}${unit}`;
    }
    
    return ingredient;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-accent text-accent-foreground';
      case 'Medium': return 'bg-primary text-primary-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };



  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/recipes')}
            className="hover:bg-background/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Button>
        </div>

        {/* Recipe Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-6xl">{recipe.image || '🍛'}</div>
                <div>
                  <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">
                    {recipe.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{recipe.cookTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="font-medium">{recipe.servings} servings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary fill-current" />
                  <span className="font-medium">{recipe.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">{recipe.category}</Badge>
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Card className="glass border-border/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button 
                    variant={isFavorite ? "destructive" : "hero"} 
                    className="w-full"
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  
                  <Button 
                    variant="spice" 
                    className="w-full"
                    onClick={() => {
                      const urlParams = new URLSearchParams(window.location.search);
                      const mealPlan = urlParams.get('mealPlan');
                      
                      if (mealPlan) {
                        const [day, mealType] = mealPlan.split('-');
                        updateMealPlan(day, mealType, recipe);
                        navigate('/planner');
                      } else {
                        // Add to next available meal slot
                        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
                        
                        for (const day of days) {
                          for (const mealType of mealTypes) {
                            if (!mealPlan[day][mealType]) {
                              updateMealPlan(day, mealType, recipe);
                              navigate('/planner');
                              return;
                            }
                          }
                        }
                      }
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Add to Meal Plan
                  </Button>
                  

                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Save PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Info */}
            {recipe.nutrition && (
              <Card className="glass border-border/30">
                <CardHeader>
                  <CardTitle className="text-lg">Nutrition (per serving)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Calories</div>
                      <div className="text-muted-foreground">{recipe.nutrition.calories}</div>
                    </div>
                    <div>
                      <div className="font-medium">Protein</div>
                      <div className="text-muted-foreground">{recipe.nutrition.protein}g</div>
                    </div>
                    <div>
                      <div className="font-medium">Carbs</div>
                      <div className="text-muted-foreground">{recipe.nutrition.carbs}g</div>
                    </div>
                    <div>
                      <div className="font-medium">Fat</div>
                      <div className="text-muted-foreground">{recipe.nutrition.fat}g</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Ingredients */}
          <Card className="glass border-border/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  <span>Ingredients</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Servings:</label>
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{servings}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setServings(servings + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {scaledIngredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="capitalize">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-accent" />
                <span>Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recipe.instructions && recipe.instructions.length > 0 ? (
                <ol className="space-y-6">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground leading-relaxed font-medium">{step}</p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-xs">
                            Step {index + 1} of {recipe.instructions.length}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="text-center py-8">
                  <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Detailed cooking instructions are being prepared by our chefs.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check back soon for step-by-step cooking guidance!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips & Notes */}
        <Card className="glass-strong border-border/30 mb-16">
          <CardHeader>
            <CardTitle>Chef's Tips & Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong>Pro Tip:</strong> For best results, use fresh spices and grind them just before cooking for maximum flavor.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong>Storage:</strong> This dish can be stored in the refrigerator for up to 3 days and tastes even better the next day.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-glow rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong>Variations:</strong> Feel free to adjust spice levels according to your preference. Add more chili for heat or cream for mildness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default RecipeDetail;