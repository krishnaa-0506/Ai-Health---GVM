import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Clock, Users, Star, ChefHat, Sparkles, Heart, Filter, Zap, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { recipeCategories, recipeRegions, recipeDietTypes, recipeSpiceLevels } from '@/data/recipes';
import AIRecipeAssistant from '@/components/AIRecipeAssistant';

const Recipes = () => {
  const navigate = useNavigate();
  const { 
    recipes, 
    favoriteRecipes, 
    toggleFavorite, 
    searchRecipes, 
    generateAISuggestions, 
    aiSuggestions,
    updateMealPlan 
  } = useAppStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    region: 'All',
    dietType: 'All',
    spiceLevel: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Check for URL parameters (from AI search or meal plan)
  const [mealPlanParams, setMealPlanParams] = useState<{day: string, mealType: string} | null>(null);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ingredients = urlParams.get('ingredients');
    const mealPlan = urlParams.get('mealPlan');
    
    if (ingredients) {
      setSearchQuery(ingredients);
    }
    
    if (mealPlan) {
      const [day, mealType] = mealPlan.split('-');
      setMealPlanParams({ day, mealType });
    }
  }, []);

  // Generate AI suggestions on component mount
  useEffect(() => {
    generateAISuggestions();
  }, [generateAISuggestions]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-accent text-accent-foreground';
      case 'Medium': return 'bg-primary text-primary-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredRecipes = searchRecipes(searchQuery, filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              Discover Recipes
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {mealPlanParams 
              ? `Choose a recipe for ${mealPlanParams.day} ${mealPlanParams.mealType}` 
              : 'Explore thousands of authentic Indian recipes powered by AI. Find the perfect dish for any occasion.'}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search by recipe name, category, or ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-background/50 border-border/30"
                  />
                </div>
                <AIRecipeAssistant 
                  trigger={
                    <Button variant="hero" size="lg" className="h-12">
                      <Bot className="h-5 w-5" />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 animate-slide-in">
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="glass"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="glass rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeRegions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Diet Type</label>
                  <Select value={filters.dietType} onValueChange={(value) => handleFilterChange('dietType', value)}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeDietTypes.map(diet => (
                        <SelectItem key={diet} value={diet}>{diet}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Spice Level</label>
                  <Select value={filters.spiceLevel} onValueChange={(value) => handleFilterChange('spiceLevel', value)}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeSpiceLevels.map(spice => (
                        <SelectItem key={spice} value={spice}>{spice}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  variant="glass"
                  onClick={() => setFilters({ category: 'All', region: 'All', dietType: 'All', spiceLevel: 'All' })}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <div className="glass-strong rounded-2xl p-6 mb-12 border-border/30 animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-hero">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">AI Recommendations for You</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiSuggestions.slice(0, 3).map((recipe, index) => (
                <div key={recipe.id} className="glass rounded-lg p-4 hover:glass-strong transition-all cursor-pointer"
                     onClick={() => navigate(`/recipes/${recipe.id}`)}>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{recipe.image}</span>
                    <div>
                      <h4 className="font-medium">{recipe.name}</h4>
                      <p className="text-sm text-muted-foreground">{recipe.cookTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{recipe.region}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-primary fill-current" />
                      <span className="text-xs">{recipe.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Button variant="hero" size="sm" onClick={() => generateAISuggestions()}>
                <Sparkles className="mr-2 h-4 w-4" />
                Get New Suggestions
              </Button>
            </div>
          </div>
        )}

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredRecipes.map((recipe, index) => (
            <Card 
              key={recipe.id} 
              className="glass hover:glass-strong transition-all duration-300 hover:scale-105 border-border/30 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">{recipe.image}</div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      className="h-8 w-8"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favoriteRecipes.includes(recipe.id) 
                            ? 'text-destructive fill-current' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold">{recipe.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{recipe.category}</Badge>
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                  {recipe.region && (
                    <Badge variant="outline" className="text-xs">{recipe.region}</Badge>
                  )}
                  {recipe.dietType && (
                    <Badge variant="outline" className="text-xs">{recipe.dietType}</Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  >
                    View Recipe
                  </Button>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      if (mealPlanParams) {
                        updateMealPlan(mealPlanParams.day, mealPlanParams.mealType, recipe);
                        navigate('/planner');
                      } else {
                        navigate('/planner');
                      }
                    }}
                  >
                    {mealPlanParams ? 'Add to Plan' : 'Add to Plan'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try searching for different ingredients or recipe names.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Recipes;