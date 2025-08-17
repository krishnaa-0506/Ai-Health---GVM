import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plus, Calendar, Clock, Users, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

const Planner = () => {
  const navigate = useNavigate();
  const { mealPlan, updateMealPlan, recipes, generateShoppingListFromMealPlan, generateAIMealPlan } = useAppStore();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [weekMealPlans, setWeekMealPlans] = useState<{[week: number]: any}>({});
  
  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7)));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return {
      start: startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      year: startOfWeek.getFullYear()
    };
  };
  
  const currentWeek = getWeekDates(selectedWeek);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'Breakfast': return 'bg-primary-glow/10 text-primary border-primary/20';
      case 'Lunch': return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'Dinner': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted';
    }
  };

  const totalMealsPlanned = Object.values(mealPlan).reduce(
    (total, day) => total + Object.values(day).filter(meal => meal !== null).length,
    0
  );

  const handleAddMeal = (day: string, mealType: string) => {
    navigate(`/recipes?mealPlan=${day}-${mealType}`);
  };



  const handleRemoveMeal = (day: string, mealType: string) => {
    updateMealPlan(day, mealType, null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              Meal Planner
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Plan your week with delicious Indian meals. Drag & drop recipes or let AI suggest balanced meals for you.
          </p>
        </div>

        {/* Week Navigation & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Save current week's meal plan
                setWeekMealPlans(prev => ({...prev, [selectedWeek]: mealPlan}));
                setSelectedWeek(selectedWeek - 1);
                // Load previous week's meal plan or create empty one
                const prevWeekPlan = weekMealPlans[selectedWeek - 1] || {
                  Monday: { Breakfast: null, Lunch: null, Dinner: null },
                  Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
                  Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
                  Thursday: { Breakfast: null, Lunch: null, Dinner: null },
                  Friday: { Breakfast: null, Lunch: null, Dinner: null },
                  Saturday: { Breakfast: null, Lunch: null, Dinner: null },
                  Sunday: { Breakfast: null, Lunch: null, Dinner: null }
                };
                // Update meal plan in store
                Object.keys(prevWeekPlan).forEach(day => {
                  Object.keys(prevWeekPlan[day]).forEach(mealType => {
                    updateMealPlan(day, mealType, prevWeekPlan[day][mealType]);
                  });
                });
              }}
            >
              Previous Week
            </Button>
            <div className="glass rounded-lg px-4 py-2 border-border/30">
              <span className="font-semibold">{selectedWeek === 0 ? 'This Week' : selectedWeek > 0 ? 'Next Week' : 'Last Week'}</span>
              <span className="text-muted-foreground ml-2">{currentWeek.start} - {currentWeek.end}, {currentWeek.year}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Save current week's meal plan
                setWeekMealPlans(prev => ({...prev, [selectedWeek]: mealPlan}));
                setSelectedWeek(selectedWeek + 1);
                // Load next week's meal plan or create empty one
                const nextWeekPlan = weekMealPlans[selectedWeek + 1] || {
                  Monday: { Breakfast: null, Lunch: null, Dinner: null },
                  Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
                  Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
                  Thursday: { Breakfast: null, Lunch: null, Dinner: null },
                  Friday: { Breakfast: null, Lunch: null, Dinner: null },
                  Saturday: { Breakfast: null, Lunch: null, Dinner: null },
                  Sunday: { Breakfast: null, Lunch: null, Dinner: null }
                };
                // Update meal plan in store
                Object.keys(nextWeekPlan).forEach(day => {
                  Object.keys(nextWeekPlan[day]).forEach(mealType => {
                    updateMealPlan(day, mealType, nextWeekPlan[day][mealType]);
                  });
                });
              }}
            >
              Next Week
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="glass rounded-lg px-4 py-2 border-border/30">
              <Calendar className="inline-block h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">{totalMealsPlanned}/21 meals planned</span>
            </div>
            <Button 
              variant="hero" 
              size="sm"
              onClick={generateAIMealPlan}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              AI Suggest Week
            </Button>
          </div>
        </div>

        {/* Meal Planning Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-12">
          {daysOfWeek.map((day, dayIndex) => (
            <div key={day} className="space-y-4">
              {/* Day Header */}
              <Card className="glass border-border/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-lg font-semibold">
                    {day}
                  </CardTitle>
                  <CardDescription className="text-center text-sm">
                    {(() => {
                      const baseDate = new Date();
                      const startOfWeek = new Date(baseDate.setDate(baseDate.getDate() - baseDate.getDay() + 1 + (selectedWeek * 7)));
                      const dayDate = new Date(startOfWeek);
                      dayDate.setDate(startOfWeek.getDate() + dayIndex);
                      return dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    })()} 
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Meal Slots */}
              {mealTypes.map((mealType) => {
                const dayMeals = mealPlan[day as keyof typeof mealPlan];
                const meal = dayMeals ? dayMeals[mealType as keyof typeof dayMeals] : null;
                
                return (
                  <Card 
                    key={mealType}
                    className={`transition-all duration-300 hover:scale-105 border ${getMealTypeColor(mealType)} ${
                      meal ? 'glass-strong' : 'glass border-dashed'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="text-xs font-medium mb-2 opacity-70">
                        {mealType}
                      </div>
                      
                      {meal ? (
                        <div 
                          className="cursor-pointer group"
                          onClick={() => {
                            console.log('Clicked meal:', meal);
                            if (meal && meal.id) {
                              navigate(`/recipes/${meal.id}`);
                            } else {
                              console.error('Meal ID not found:', meal);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm group-hover:text-primary">{meal.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMeal(day, mealType);
                              }}
                            >
                              ×
                            </Button>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{meal.cookTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{meal.servings}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="flex items-center justify-center h-16 text-muted-foreground cursor-pointer hover:text-primary"
                          onClick={() => handleAddMeal(day, mealType)}
                        >
                          <Plus className="h-5 w-5 mb-1" />
                          <span className="text-xs ml-1">Add meal</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="glass-strong border-border/30 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>AI Meal Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Let our AI suggest balanced Indian meals based on your preferences and dietary needs.
              </p>
              <Button 
                variant="hero" 
                className="w-full"
                onClick={() => {
                  console.log('AI Suggestions clicked');
                  generateAIMealPlan();
                }}
              >
                Get AI Suggestions
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-strong border-border/30 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent" />
                <span>Recipe Library</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Browse through thousands of Indian recipes and add them directly to your meal plan.
              </p>
              <Button 
                variant="spice" 
                className="w-full"
                onClick={() => {
                  console.log('Browse Recipes clicked');
                  navigate('/recipes');
                }}
              >
                Browse Recipes
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-strong border-border/30 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-primary-glow" />
                <span>Generate Shopping List</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Automatically create a shopping list from your planned meals for the week.
              </p>
              <Button 
                variant="glass" 
                className="w-full"
                onClick={() => {
                  const hasFullWeek = Object.values(mealPlan).some(day => 
                    Object.values(day).some(meal => meal !== null)
                  );
                  
                  if (hasFullWeek) {
                    const choice = confirm('Generate shopping list for:\n\nOK = Full Week\nCancel = Today Only');
                    const servings = prompt('How many servings do you need?', '4');
                    const servingCount = parseInt(servings || '4');
                    generateShoppingListFromMealPlan(choice ? 'week' : 'today', servingCount);
                  } else {
                    const servings = prompt('How many servings do you need?', '4');
                    const servingCount = parseInt(servings || '4');
                    generateShoppingListFromMealPlan('week', servingCount);
                  }
                  navigate('/shopping');
                }}
              >
                Create List
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis & Weekly Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <Card className="glass-strong border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>AI Meal Analysis</span>
              </CardTitle>
              <CardDescription>Smart insights about your meal plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Nutritional Balance</h4>
                  <p className="text-xs text-muted-foreground">
                    Your meal plan provides good protein variety with lentils and vegetables. Consider adding more leafy greens for iron.
                  </p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Cooking Pattern</h4>
                  <p className="text-xs text-muted-foreground">
                    You prefer medium-spice recipes. Try adding some mild breakfast options for better variety.
                  </p>
                </div>
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Shopping Optimization</h4>
                  <p className="text-xs text-muted-foreground">
                    Your planned meals share common ingredients like onions, tomatoes, and spices - great for bulk buying!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-border/30">
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
              <CardDescription>Your meal planning summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalMealsPlanned}</div>
                  <div className="text-sm text-muted-foreground">Meals Planned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {new Set(Object.values(mealPlan).flatMap(day => 
                      Object.values(day).filter(meal => meal).map(meal => meal?.region)
                    )).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Different Cuisines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-glow">
                    {Math.round(Object.values(mealPlan).flatMap(day => 
                      Object.values(day).filter(meal => meal).map(meal => meal?.nutrition?.calories || 0)
                    ).reduce((sum, cal) => sum + cal, 0) / Math.max(totalMealsPlanned, 1))}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">
                    {new Set(Object.values(mealPlan).flatMap(day => 
                      Object.values(day).filter(meal => meal).flatMap(meal => meal?.ingredients || [])
                    )).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Unique Ingredients</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


      </main>

      <Footer />
    </div>
  );
};

export default Planner;