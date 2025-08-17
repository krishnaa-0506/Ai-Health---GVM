import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, ShoppingCart, Brain, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aiChefIcon from '@/assets/ai-chef-icon.png';
import mealPlanningImg from '@/assets/meal-planning.png';

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Brain,
      title: 'AI Recipe Generator',
      description: 'Just tell us what ingredients you have, and our AI will suggest perfect Indian recipes with step-by-step instructions.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Calendar,
      title: 'Smart Meal Planning',
      description: 'Plan your entire week with balanced Indian meals. Drag & drop recipes into daily slots for effortless organization.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: ShoppingCart,
      title: 'Auto Shopping Lists',
      description: 'Automatically generate grocery lists from your meal plans. Never forget ingredients for your favorite curry again.',
      color: 'text-primary-glow',
      bgColor: 'bg-primary-glow/10'
    },
    {
      icon: Search,
      title: 'Spice & Ingredient Search',
      description: 'Find recipes by specific spices, dietary preferences (vegan, Jain, regional cuisines) or cooking time.',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      icon: Clock,
      title: 'Quick & Easy Recipes',
      description: 'Filter by cooking time - from 15-minute quick meals to elaborate weekend feasts. Perfect for busy schedules.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Heart,
      title: 'Personalized Nutrition',
      description: 'Get nutrition insights and suggestions based on your dietary goals and traditional Indian nutritional wisdom.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
          <span className="bg-gradient-spice bg-clip-text text-transparent">
            Powerful Features
          </span>
          <br />
          <span className="text-foreground">for Indian Cooking</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From AI-powered recipe suggestions to smart meal planning - everything you need to master Indian cuisine.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.title} 
              className="glass hover:glass-strong transition-all duration-300 hover:scale-105 border-border/30 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* AI Assistant Card */}
        <Card className="glass-strong border-border/30 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <img src={aiChefIcon} alt="AI Chef" className="w-16 h-16 animate-float" />
              <div>
                <h3 className="font-display font-bold text-2xl text-primary">AI Cooking Assistant</h3>
                <p className="text-muted-foreground">Your personal Indian cuisine expert</p>
              </div>
            </div>
            <p className="text-foreground leading-relaxed mb-6">
              Our AI understands the nuances of Indian cooking - from the perfect blend of spices 
              to regional variations. Get personalized recipe suggestions that match your taste preferences and skill level.
            </p>
            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => navigate('/recipes')}
            >
              Try AI Assistant
            </Button>
          </CardContent>
        </Card>

        {/* Meal Planning Card */}
        <Card className="glass-strong border-border/30 overflow-hidden">
          <CardContent className="p-8">
            <div className="mb-6">
              <img 
                src={mealPlanningImg} 
                alt="Meal Planning" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-display font-bold text-2xl text-accent">Weekly Meal Planning</h3>
              <p className="text-muted-foreground">Effortless organization for busy families</p>
            </div>
            <p className="text-foreground leading-relaxed mb-6">
              Plan balanced Indian meals for the entire week. Our smart planner ensures variety 
              in your diet while considering prep time, ingredients, and nutritional balance.
            </p>
            <Button 
              variant="spice" 
              className="w-full"
              onClick={() => navigate('/planner')}
            >
              Start Planning
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center glass-strong rounded-3xl p-8 sm:p-12 border-border/30 animate-fade-in">
        <h3 className="font-display font-bold text-2xl sm:text-3xl mb-4">
          Ready to Transform Your <span className="bg-gradient-hero bg-clip-text text-transparent">Indian Cooking?</span>
        </h3>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of home cooks who've revolutionized their kitchen with AI-powered Indian meal planning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate('/recipes')}
          >
            Get Started Free
          </Button>
          <Button 
            variant="glass" 
            size="xl"
            onClick={() => navigate('/planner')}
          >
            Explore Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;