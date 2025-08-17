import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Sparkles, Users, Clock, Star, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

interface AuthForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
  dietType: string;
  spiceLevel: string;
  cuisinePreference: string;
  cookingExperience: string;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<AuthForm>({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    dietType: 'Vegetarian',
    spiceLevel: 'Medium',
    cuisinePreference: 'North Indian',
    cookingExperience: 'Intermediate'
  });

  const features = [
    { icon: <ChefHat className="h-6 w-6" />, title: "1000+ Authentic Recipes", desc: "Traditional Indian dishes from every region" },
    { icon: <Sparkles className="h-6 w-6" />, title: "AI-Powered Planning", desc: "Smart meal suggestions based on your preferences" },
    { icon: <Users className="h-6 w-6" />, title: "Family-Friendly", desc: "Recipes for every family size and dietary need" },
    { icon: <Clock className="h-6 w-6" />, title: "Quick & Easy", desc: "From 15-minute meals to elaborate feasts" }
  ];

  const stats = [
    { number: "1000+", label: "Recipes" },
    { number: "500+", label: "Ingredients" },
    { number: "50K+", label: "Happy Cooks" },
    { number: "4.9", label: "Rating", icon: <Star className="h-4 w-4 fill-current" /> }
  ];

  useEffect(() => {
    // Always show loading for 3 seconds
    const timer = setTimeout(() => {
      const userData = localStorage.getItem('cooksy-user');
      if (userData) {
        onComplete();
      } else {
        setShowAuth(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (authMode === 'signup') {
      // Validate signup form
      if (form.password !== form.confirmPassword) {
        alert('Passwords do not match!');
        setIsLoading(false);
        return;
      }
      
      // Save user data to localStorage
      const userData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        password: form.password, // In real app, this would be hashed
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        bio: `Welcome to Cooksy! I'm ${form.name} and I love cooking.`,
        preferences: {
          dietType: form.dietType,
          spiceLevel: form.spiceLevel,
          cuisinePreference: form.cuisinePreference,
          cookingExperience: form.cookingExperience,
          allergies: []
        }
      };
      localStorage.setItem('cooksy-user', JSON.stringify(userData));
      localStorage.setItem('cooksy-users-db', JSON.stringify([userData])); // Simple user DB
    } else {
      // Login validation
      const usersDB = JSON.parse(localStorage.getItem('cooksy-users-db') || '[]');
      const user = usersDB.find((u: any) => u.email === form.email && u.password === form.password);
      
      if (!user) {
        alert('Invalid email or password!');
        setIsLoading(false);
        return;
      }
      
      localStorage.setItem('cooksy-user', JSON.stringify(user));
    }

    setIsLoading(false);
    onComplete();
  };

  if (!showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <ChefHat className="h-12 w-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-orange-300 rounded-full animate-ping opacity-75"></div>
          </div>
          <h1 className="font-display font-bold text-5xl text-gray-800 mb-3">
            Cooksy AI
          </h1>
          <p className="text-gray-600 text-lg mb-6">Smart Indian Meal Planning</p>
          <div className="flex justify-center space-x-1 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-sm text-gray-500">Loading your culinary experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-orange-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <ChefHat className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Welcome to Cooksy AI</CardTitle>
          <CardDescription className="text-gray-600 text-base">
            {authMode === 'login' ? 'Sign in to continue your culinary journey' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 bg-orange-50 p-1">
              <TabsTrigger value="login" className="text-gray-700 font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">Login</TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-700 font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="pl-10 bg-white border-orange-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-200"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 font-semibold shadow-lg transition-all duration-200" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    required
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Location (City, State)"
                    value={form.location}
                    onChange={(e) => setForm({...form, location: e.target.value})}
                    className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">Diet Type</label>
                    <div className="flex flex-wrap gap-1">
                      {['Vegetarian', 'Non-Vegetarian', 'Vegan'].map((diet) => (
                        <Badge 
                          key={diet}
                          variant={form.dietType === diet ? "default" : "secondary"}
                          className="cursor-pointer text-xs"
                          onClick={() => setForm({...form, dietType: diet})}
                        >
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">Spice Level</label>
                    <div className="flex flex-wrap gap-1">
                      {['Mild', 'Medium', 'Spicy'].map((level) => (
                        <Badge 
                          key={level}
                          variant={form.spiceLevel === level ? "default" : "secondary"}
                          className="cursor-pointer text-xs"
                          onClick={() => setForm({...form, spiceLevel: level})}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 font-semibold shadow-lg transition-all duration-200" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SplashScreen;