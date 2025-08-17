import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Sparkles, ChefHat, Clock, Users, Zap, 
  Lightbulb, Star, ArrowRight, Bot 
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

const AIGenerator = () => {
  const navigate = useNavigate();
  const { addRecipe, userProfile } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);
  const [formData, setFormData] = useState({
    ingredients: '',
    cuisine: 'North Indian',
    difficulty: 'Medium',
    cookTime: '30-45 min',
    dietType: userProfile.preferences.dietType,
    spiceLevel: userProfile.preferences.spiceLevel,
    servings: '4',
    occasion: 'Everyday'
  });

  const cuisineOptions = ['North Indian', 'South Indian', 'Bengali', 'Gujarati', 'Punjabi', 'Street Food'];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const cookTimeOptions = ['15-30 min', '30-45 min', '45-60 min', '1-2 hours'];
  const occasionOptions = ['Everyday', 'Festival', 'Party', 'Quick Meal', 'Comfort Food'];

  const generateRecipe = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate a recipe based on inputs
    const recipeNames = [
      'AI-Crafted Spiced Curry',
      'Fusion Delight Bowl',
      'Smart Chef\'s Special',
      'AI-Inspired Traditional Dish',
      'Modern Spice Symphony',
      'Intelligent Flavor Fusion'
    ];
    
    const randomName = recipeNames[Math.floor(Math.random() * recipeNames.length)];
    const ingredientList = formData.ingredients.split(',').map(i => i.trim()).filter(i => i);
    
    const newRecipe = {
      id: Date.now(),
      name: randomName,
      description: `A delicious ${formData.cuisine} dish crafted by AI using your specified ingredients and preferences. Perfect for ${formData.occasion.toLowerCase()} occasions.`,
      cookTime: formData.cookTime,
      servings: parseInt(formData.servings),
      difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard',
      rating: 4.5 + Math.random() * 0.5,
      ingredients: [
        ...ingredientList,
        'onions', 'tomatoes', 'ginger-garlic paste', 'spices', 'oil'
      ],
      category: 'AI Generated',
      region: formData.cuisine,
      dietType: formData.dietType as any,
      spiceLevel: formData.spiceLevel as any,
      image: '🤖',
      tags: ['ai-generated', 'custom', 'personalized'],
      instructions: [
        'Heat oil in a pan and add whole spices for tempering',
        'Add chopped onions and sauté until golden brown',
        'Add ginger-garlic paste and cook for 2 minutes',
        'Add tomatoes and cook until they break down',
        'Add your main ingredients and mix well',
        'Add spices according to your preference',
        'Cook covered for the recommended time',
        'Garnish with fresh herbs and serve hot'
      ],
      nutrition: {
        calories: 250 + Math.floor(Math.random() * 100),
        protein: 15 + Math.floor(Math.random() * 10),
        carbs: 30 + Math.floor(Math.random() * 20),
        fat: 8 + Math.floor(Math.random() * 8)
      }
    };
    
    setGeneratedRecipe(newRecipe);
    setIsGenerating(false);
  };

  const saveRecipe = () => {
    if (generatedRecipe) {
      addRecipe(generatedRecipe);
      navigate(`/recipes/${generatedRecipe.id}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center mb-6">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              AI Recipe Generator
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our AI chef create a personalized Indian recipe just for you. Specify your ingredients, preferences, and dietary needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <span>Recipe Preferences</span>
              </CardTitle>
              <CardDescription>
                Tell us what you want, and AI will create the perfect recipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Available Ingredients</label>
                <Textarea
                  placeholder="Enter ingredients you have (e.g., chicken, rice, tomatoes, onions...)"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  className="glass border-border/30"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cuisine Type</label>
                  <Select value={formData.cuisine} onValueChange={(value) => setFormData({...formData, cuisine: value})}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisineOptions.map(cuisine => (
                        <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cook Time</label>
                  <Select value={formData.cookTime} onValueChange={(value) => setFormData({...formData, cookTime: value})}>
                    <SelectTrigger className="glass border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cookTimeOptions.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Servings</label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.servings}
                    onChange={(e) => setFormData({...formData, servings: e.target.value})}
                    className="glass border-border/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Occasion</label>
                <Select value={formData.occasion} onValueChange={(value) => setFormData({...formData, occasion: value})}>
                  <SelectTrigger className="glass border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {occasionOptions.map(occasion => (
                      <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateRecipe} 
                disabled={isGenerating || !formData.ingredients.trim()}
                className="w-full h-12"
                variant="hero"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    AI is cooking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Recipe
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Recipe */}
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-accent" />
                <span>Generated Recipe</span>
              </CardTitle>
              <CardDescription>
                Your personalized AI-crafted recipe will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!generatedRecipe && !isGenerating && (
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Fill in your preferences and click "Generate Recipe" to get started
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground mb-2">AI Chef is working...</p>
                  <p className="text-sm text-muted-foreground">
                    Analyzing ingredients, balancing flavors, creating instructions...
                  </p>
                </div>
              )}

              {generatedRecipe && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{generatedRecipe.image}</span>
                      <div>
                        <h3 className="font-bold text-xl">{generatedRecipe.name}</h3>
                        <p className="text-sm text-muted-foreground">{generatedRecipe.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{generatedRecipe.cookTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-accent" />
                        <span>{generatedRecipe.servings} servings</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-primary fill-current" />
                        <span>{generatedRecipe.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{generatedRecipe.category}</Badge>
                      <Badge variant="outline">{generatedRecipe.difficulty}</Badge>
                      <Badge variant="outline">{generatedRecipe.region}</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <ul className="text-sm space-y-1">
                      {generatedRecipe.ingredients.slice(0, 6).map((ingredient: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="capitalize">{ingredient}</span>
                        </li>
                      ))}
                      {generatedRecipe.ingredients.length > 6 && (
                        <li className="text-muted-foreground">+ {generatedRecipe.ingredients.length - 6} more ingredients</li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={saveRecipe} variant="hero" className="w-full">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Save & View Full Recipe
                    </Button>
                    <Button onClick={() => setGeneratedRecipe(null)} variant="glass" className="w-full">
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Another Recipe
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Tips */}
        <Card className="glass-strong border-border/30 mt-12 mb-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>AI Recipe Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">🎯 For Best Results:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• List 3-5 main ingredients you want to use</li>
                  <li>• Be specific about dietary restrictions</li>
                  <li>• Choose appropriate difficulty for your skill level</li>
                  <li>• Consider the occasion and time available</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">🤖 AI Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Balances flavors automatically</li>
                  <li>• Suggests complementary ingredients</li>
                  <li>• Adapts to your taste preferences</li>
                  <li>• Creates step-by-step instructions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AIGenerator;