import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIRecipeAssistant from '@/components/AIRecipeAssistant';
import heroSpices from '@/assets/hero-spices.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // AI response - simulate intelligent recipe suggestions
      const ingredients = searchQuery.toLowerCase().split(',').map(s => s.trim());
      
      // Simulate AI analysis
      const suggestions = generateRecipeSuggestions(ingredients);
      
      // Navigate to recipes page with results
      navigate(`/recipes?ingredients=${encodeURIComponent(searchQuery)}`);
    }
  };

  const generateRecipeSuggestions = (ingredients: string[]) => {
    const recipes = [
      {
        name: 'Chicken Curry',
        match: ['chicken', 'tomato', 'onion'],
        confidence: 95,
        cookTime: '45 min'
      },
      {
        name: 'Vegetable Rice',
        match: ['rice', 'tomato'],
        confidence: 85,
        cookTime: '30 min'
      },
      {
        name: 'Chicken Biryani',
        match: ['chicken', 'rice'],
        confidence: 90,
        cookTime: '90 min'
      }
    ];
    
    return recipes.filter(recipe => 
      recipe.match.some(ingredient => 
        ingredients.some(userIngredient => 
          ingredient.includes(userIngredient) || userIngredient.includes(ingredient)
        )
      )
    ).sort((a, b) => b.confidence - a.confidence);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mandala-bg pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroSpices})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />



      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl mb-6 leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Plan Meals.
            </span>
            <br />
            <span className="text-foreground">Save Time.</span>
            <br />
            <span className="bg-gradient-mint bg-clip-text text-transparent">
              Eat Smarter.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the magic of Indian cuisine with AI-powered meal planning. 
            From traditional curries to modern fusion dishes - cook smarter, shop faster, live healthier.
          </p>

          {/* AI Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
            <div className="glass-strong rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="What's in your fridge? (e.g., chicken, rice, tomatoes...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-background/50 border-border/30 focus:border-primary"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  variant="hero"
                  size="lg"
                  className="h-12 px-8"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Recipes
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                🧠 AI will suggest delicious Indian recipes based on your ingredients
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in">
            <Button 
              variant="spice" 
              size="xl" 
              className="group"
              onClick={() => navigate('/recipes')}
            >
              Explore Indian Recipes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={() => navigate('/ai-generator')}
            >
              <Bot className="mr-2 h-5 w-5" />
              AI Recipe Generator
              <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => navigate('/planner')}
            >
              Plan Weekly Meals
            </Button>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hero;