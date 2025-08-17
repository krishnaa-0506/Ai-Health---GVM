import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  User, Mail, Phone, MapPin, Heart, Clock, ChefHat, 
  Settings, Bell, Shield, Edit, Save, Calendar, Star,
  Utensils, Target, Award
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile, recipes, favoriteRecipes, isAuthenticated, mealPlan } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);

  const favoriteRecipesList = recipes.filter(recipe => 
    favoriteRecipes.includes(recipe.id)
  ).map(recipe => ({
    ...recipe,
    cookCount: 1
  }));

  const recentActivity: {action:string; date:string; type:string}[] = [];

  const achievements: { title: string; description: string; icon: string; earned: boolean }[] = [];

  const handleSave = () => {
    // Update both current session and stored user data
    updateUserProfile(tempProfile);
    const currentUser = JSON.parse(localStorage.getItem('cooksy-user') || '{}');
    const updatedUser = { ...currentUser, ...tempProfile };
    localStorage.setItem('cooksy-user', JSON.stringify(updatedUser));
    
    // Update in users database
    const usersDB = JSON.parse(localStorage.getItem('cooksy-users-db') || '[]');
    const userIndex = usersDB.findIndex((u: any) => u.email === currentUser.email);
    if (userIndex !== -1) {
      usersDB[userIndex] = updatedUser;
      localStorage.setItem('cooksy-users-db', JSON.stringify(usersDB));
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(userProfile);
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'cook': return <ChefHat className="h-4 w-4 text-primary" />;
      case 'plan': return <Calendar className="h-4 w-4 text-accent" />;
      case 'save': return <Heart className="h-4 w-4 text-destructive" />;
      case 'shop': return <Utensils className="h-4 w-4 text-primary-glow" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              My Profile
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your cooking preferences, track your culinary journey, and personalize your AI assistant.
          </p>
        </div>

        {/* Profile Overview Card */}
        <Card className="glass-strong border-border/30 mb-8 animate-scale-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/api/placeholder/100/100" alt="Profile picture" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-hero text-primary-foreground">
                  {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                      className="text-xl font-bold"
                    />
                    <Input
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})}
                      placeholder="Tell us about your cooking journey..."
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-2">{userProfile.name}</h2>
                    <p className="text-muted-foreground mb-4">{userProfile.bio}</p>
                  </>
                )}
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} variant="hero">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="glass">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="hero">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass border-border/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass border-border/30">
                <CardContent className="p-6 text-center">
                  <ChefHat className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{favoriteRecipes.length}</div>
                  <div className="text-sm text-muted-foreground">Favorite Recipes</div>
                </CardContent>
              </Card>
              
              <Card className="glass border-border/30">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{Object.values(mealPlan).filter(day => Object.values(day).some(meal => meal !== null)).length}</div>
                  <div className="text-sm text-muted-foreground">Days Planned</div>
                </CardContent>
              </Card>
              
              <Card className="glass border-border/30">
                <CardContent className="p-6 text-center">
                  <Utensils className="h-8 w-8 text-primary-glow mx-auto mb-2" />
                  <div className="text-2xl font-bold">{Object.values(mealPlan).reduce((total, day) => total + Object.values(day).filter(meal => meal !== null).length, 0)}</div>
                  <div className="text-sm text-muted-foreground">Meals Planned</div>
                </CardContent>
              </Card>
            </div>

            {/* Favorite Recipes */}
            <Card className="glass border-border/30">
              <CardHeader>
                <CardTitle>Favorite Recipes</CardTitle>
                <CardDescription>Your most loved and frequently cooked dishes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favoriteRecipesList.length > 0 ? (
                    favoriteRecipesList.map((recipe) => (
                      <div key={recipe.id} className="flex items-center justify-between p-3 glass rounded-lg">
                        <div>
                          <h4 className="font-semibold">{recipe.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>Cooked {recipe.cookCount} times</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < recipe.rating ? 'text-primary fill-current' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="glass" 
                          size="sm"
                          onClick={() => navigate(`/recipes/${recipe.id}`)}
                        >
                          View Recipe
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No favorite recipes yet</p>
                      <Button 
                        variant="hero" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => navigate('/recipes')}
                      >
                        Explore Recipes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="glass border-border/30">
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>Customize your cooking experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Diet Type</label>
                    <div className="flex flex-wrap gap-2">
                      {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain'].map((diet) => (
                        <Badge 
                          key={diet}
                          variant={userProfile.preferences.dietType === diet ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => updateUserProfile({
                            preferences: { ...userProfile.preferences, dietType: diet }
                          })}
                        >
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Spice Level</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mild', 'Medium', 'Spicy', 'Extra Hot'].map((level) => (
                        <Badge 
                          key={level}
                          variant={userProfile.preferences.spiceLevel === level ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => updateUserProfile({
                            preferences: { ...userProfile.preferences, spiceLevel: level }
                          })}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cuisine Preference</label>
                    <div className="flex flex-wrap gap-2">
                      {['North Indian', 'South Indian', 'Bengali', 'Gujarati', 'Punjabi'].map((cuisine) => (
                        <Badge 
                          key={cuisine}
                          variant={userProfile.preferences.cuisinePreference === cuisine ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => updateUserProfile({
                            preferences: { ...userProfile.preferences, cuisinePreference: cuisine }
                          })}
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cooking Experience</label>
                    <div className="flex flex-wrap gap-2">
                      {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                        <Badge 
                          key={level}
                          variant={userProfile.preferences.cookingExperience === level ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => updateUserProfile({
                            preferences: { ...userProfile.preferences, cookingExperience: level }
                          })}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Allergies & Restrictions</label>
                  <div className="flex flex-wrap gap-2">
                    {['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish'].map((allergy) => (
                      <Badge 
                        key={allergy}
                        variant={userProfile.preferences.allergies.includes(allergy) ? "destructive" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newAllergies = userProfile.preferences.allergies.includes(allergy)
                            ? userProfile.preferences.allergies.filter(a => a !== allergy)
                            : [...userProfile.preferences.allergies, allergy];
                          updateUserProfile({
                            preferences: { ...userProfile.preferences, allergies: newAllergies }
                          });
                        }}
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="glass border-border/30">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your cooking journey timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 glass rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={achievement.title}
                  className={`border-border/30 transition-all duration-300 hover:scale-105 ${
                    achievement.earned ? 'glass-strong' : 'glass opacity-50'
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="default" className="bg-primary">
                        <Award className="mr-1 h-3 w-3" />
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="secondary">In Progress</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;