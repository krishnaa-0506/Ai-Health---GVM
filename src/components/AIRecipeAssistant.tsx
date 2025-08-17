import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, ChefHat, Clock, Users, Star, Zap, Lightbulb } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

interface AIRecipeAssistantProps {
  trigger?: React.ReactNode;
  className?: string;
}

const AIRecipeAssistant = ({ trigger, className }: AIRecipeAssistantProps) => {
  const navigate = useNavigate();
  const { searchRecipes, userProfile, recipes } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);

  const generateSuggestions = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // AI-like recipe suggestions based on ingredients and user preferences
    const { dietType, spiceLevel, cuisinePreference } = userProfile.preferences;
    
    let filteredRecipes = recipes;
    
    // Filter by ingredients if provided
    if (ingredients.trim()) {
      const ingredientList = ingredients.toLowerCase().split(',').map(i => i.trim());
      filteredRecipes = recipes.filter(recipe => 
        ingredientList.some(ingredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.toLowerCase().includes(ingredient)
          ) || recipe.name.toLowerCase().includes(ingredient)
        )
      );
    }
    
    // Apply user preferences
    filteredRecipes = filteredRecipes.filter(recipe => {
      if (dietType !== 'All' && recipe.dietType && recipe.dietType !== dietType) return false;
      if (spiceLevel !== 'All' && recipe.spiceLevel && recipe.spiceLevel !== spiceLevel) return false;
      if (cuisinePreference !== 'All' && recipe.region && recipe.region !== cuisinePreference) return false;
      return true;
    });
    
    // Sort by rating and take top suggestions
    const topSuggestions = filteredRecipes
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
    
    setSuggestions(topSuggestions);
    
    // Add AI chat message
    const aiMessage = ingredients.trim() 
      ? `Based on your ingredients (${ingredients}) and preferences, I found ${topSuggestions.length} perfect recipes for you! These match your ${dietType} diet and ${spiceLevel} spice preference.`
      : `Based on your preferences for ${dietType} ${cuisinePreference} cuisine with ${spiceLevel} spice level, here are my top recommendations!`;
    
    setChatMessages(prev => [...prev, { type: 'ai', message: aiMessage }]);
    setIsLoading(false);
  };

  const handleQuickSuggestion = (type: string) => {
    let query = '';
    switch (type) {
      case 'quick':
        query = 'Quick 15-minute meals';
        break;
      case 'healthy':
        query = 'Healthy low-calorie recipes';
        break;
      case 'comfort':
        query = 'Comfort food classics';
        break;
      case 'party':
        query = 'Party and celebration dishes';
        break;
    }
    
    setChatMessages(prev => [...prev, { type: 'user', message: `Show me ${query.toLowerCase()}` }]);
    
    // Filter recipes based on type
    let filteredRecipes = recipes;
    switch (type) {
      case 'quick':
        filteredRecipes = recipes.filter(recipe => 
          parseInt(recipe.cookTime) <= 30 || recipe.difficulty === 'Easy'
        );
        break;
      case 'healthy':
        filteredRecipes = recipes.filter(recipe => 
          recipe.nutrition && recipe.nutrition.calories < 300
        );
        break;
      case 'comfort':
        filteredRecipes = recipes.filter(recipe => 
          recipe.tags?.includes('comfort-food') || 
          ['Dal Makhani', 'Butter Chicken', 'Kheer', 'Rajma'].includes(recipe.name)
        );
        break;
      case 'party':
        filteredRecipes = recipes.filter(recipe => 
          recipe.tags?.includes('festive') || 
          recipe.servings >= 6 ||
          ['Biryani', 'Paneer Tikka Masala', 'Gulab Jamun'].includes(recipe.name)
        );
        break;
    }
    
    setSuggestions(filteredRecipes.slice(0, 6));
    
    const aiResponse = `Here are some great ${query.toLowerCase()} I recommend! These are perfect for your current needs.`;
    setChatMessages(prev => [...prev, { type: 'ai', message: aiResponse }]);
  };

  const defaultTrigger = (
    <Button variant="hero" className={className}>
      <Sparkles className="mr-2 h-4 w-4" />
      AI Recipe Assistant
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-hero">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>AI Recipe Assistant</span>
          </DialogTitle>
          <DialogDescription>
            Tell me what ingredients you have or what you're craving, and I'll suggest perfect recipes!
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
          {/* Chat Interface */}
          <div className="flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 p-4 glass rounded-lg mb-4">
              {chatMessages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p>Hi! I'm your AI cooking assistant. How can I help you today?</p>
                </div>
              )}
              
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'glass-strong border border-border/30'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-strong border border-border/30 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">Analyzing recipes...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter ingredients you have (e.g., chicken, tomatoes, onions)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateSuggestions()}
                />
                <Button onClick={generateSuggestions} disabled={isLoading}>
                  <Zap className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => handleQuickSuggestion('quick')}
                >
                  Quick Meals
                </Button>
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => handleQuickSuggestion('healthy')}
                >
                  Healthy Options
                </Button>
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => handleQuickSuggestion('comfort')}
                >
                  Comfort Food
                </Button>
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => handleQuickSuggestion('party')}
                >
                  Party Dishes
                </Button>
              </div>
            </div>
          </div>

          {/* Recipe Suggestions */}
          <div className="overflow-y-auto">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Recipe Suggestions</span>
            </h3>
            
            {suggestions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Recipe suggestions will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {suggestions.map((recipe) => (
                  <Card 
                    key={recipe.id}
                    className="glass hover:glass-strong transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/recipes/${recipe.id}`);
                      setIsOpen(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{recipe.image}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{recipe.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {recipe.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{recipe.cookTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{recipe.servings}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-primary fill-current" />
                              <span className="text-xs font-medium">{recipe.rating}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">{recipe.category}</Badge>
                            {recipe.region && (
                              <Badge variant="outline" className="text-xs">{recipe.region}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIRecipeAssistant;