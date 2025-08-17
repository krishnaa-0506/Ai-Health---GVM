import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Plus, Trash2, Share, Download, Check, Sparkles, Search, IndianRupee, Package } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { groceryCategories, shoppingListTemplates } from '@/data/groceryItems';
import { exportShoppingListToPDF, shareShoppingList } from '@/utils/pdfExport';

const Shopping = () => {
  const { 
    shoppingList, 
    addToShoppingList, 
    toggleShoppingItem, 
    removeShoppingItem,
    generateShoppingListFromMealPlan,
    searchGroceryItems
  } = useAppStore();
  
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newCategory, setNewCategory] = useState('Other');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const addItem = () => {
    if (newItem.trim()) {
      addToShoppingList({
        name: newItem,
        quantity: newQuantity || '1 unit',
        category: newCategory,
        checked: false
      });
      setNewItem('');
      setNewQuantity('');
      setNewCategory('Other');
      setShowAddDialog(false);
    }
  };

  const addTemplate = (templateName: string) => {
    const template = shoppingListTemplates[templateName as keyof typeof shoppingListTemplates];
    // Clear existing list and add template items
    const templateItems = template.map((item, index) => ({
      id: Date.now() + index,
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      checked: false
    }));
    
    // Replace shopping list with template items
    useAppStore.setState({ shoppingList: templateItems });
    setShowTemplateDialog(false);
  };

  const filteredItems = shoppingList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const checkedItems = shoppingList.filter(item => item.checked).length;
  const totalItems = shoppingList.length;
  const progressPercentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
  
  const totalCost = shoppingList.reduce((sum, item) => {
    return sum + (item.price || 0);
  }, 0);

  const checkedCost = shoppingList
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.price || 0), 0);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Vegetables': 'bg-green-100 text-green-800 border-green-200',
      'Spices & Seasonings': 'bg-orange-100 text-orange-800 border-orange-200',
      'Grains & Cereals': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Pulses & Lentils': 'bg-amber-100 text-amber-800 border-amber-200',
      'Dairy & Alternatives': 'bg-blue-100 text-blue-800 border-blue-200',
      'Oils & Fats': 'bg-purple-100 text-purple-800 border-purple-200',
      'Nuts & Dry Fruits': 'bg-pink-100 text-pink-800 border-pink-200',
      'Pantry Essentials': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors['Other'];
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              Shopping List
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Smart grocery shopping made easy. Auto-generated from your meal plans with AI suggestions.
          </p>
        </div>

        {/* Progress & Budget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-strong border-border/30 animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <span>Shopping Progress</span>
                  </CardTitle>
                  <CardDescription>
                    {checkedItems} of {totalItems} items completed
                  </CardDescription>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-hero h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Keep going! 🛒</span>
                <span>{totalItems - checkedItems} items remaining</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-border/30 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IndianRupee className="h-5 w-5 text-accent" />
                <span>Budget Tracker</span>
              </CardTitle>
              <CardDescription>
                Set your own budget and track expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Set Budget:</span>
                  <Input 
                    type="number" 
                    placeholder="Enter budget" 
                    className="w-24 h-8 text-sm"
                  />
                  <span className="text-sm">₹</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Spent:</span>
                  <span className="font-semibold text-primary">₹{checkedCost.toFixed(2)}</span>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Add prices to items to track spending
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-in">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button variant="hero" className="h-12">
                <Plus className="mr-2 h-5 w-5" />
                Add Custom Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Add a custom item to your shopping list
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Item name (e.g., Fresh Ginger)"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <Input
                  placeholder="Quantity (e.g., 100g, 1 kg, 2 pieces)"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {groceryCategories.filter(cat => cat !== 'All').map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addItem} className="w-full">
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogTrigger asChild>
              <Button variant="spice" className="h-12">
                <Package className="mr-2 h-5 w-5" />
                Use Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Shopping Templates</DialogTitle>
                <DialogDescription>
                  Quick-add common grocery lists
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                {Object.keys(shoppingListTemplates).map(templateName => (
                  <Button
                    key={templateName}
                    variant="glass"
                    className="w-full justify-start"
                    onClick={() => addTemplate(templateName)}
                  >
                    {templateName}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="glass" 
            className="h-12"
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
            }}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            From Meal Plan
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-border/30"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 glass border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groceryCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>



        {/* Shopping List Items */}
        <div className="space-y-4 mb-8">
          {filteredItems.length === 0 ? (
            <Card className="glass-strong border-border/30 text-center py-12">
              <CardContent>
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No items in your shopping list</h3>
                <p className="text-muted-foreground mb-6">
                  Add recipes to your meal planner to automatically generate a shopping list, or add items manually.
                </p>
                <Button 
                  variant="hero" 
                  onClick={() => window.location.href = '/planner'}
                >
                  Go to Meal Planner
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className={`transition-all duration-300 hover:scale-102 border ${
                item.checked 
                  ? 'glass opacity-75 border-primary/30' 
                  : 'glass-strong border-border/30'
              } animate-slide-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggleShoppingItem(item.id)}
                    className="h-5 w-5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className={`font-semibold ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                        {item.name}
                      </h3>
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {item.quantity}
                      </p>
                      {item.price && (
                        <Badge variant="outline" className="text-xs">
                          ₹{item.price}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {item.checked && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeShoppingItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>

        {/* Export Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <Button 
            variant="spice" 
            className="h-12"
            onClick={() => shareShoppingList(shoppingList)}
          >
            <Share className="mr-2 h-5 w-5" />
            Share List
          </Button>
          <Button 
            variant="glass" 
            className="h-12"
            onClick={() => exportShoppingListToPDF(shoppingList)}
          >
            <Download className="mr-2 h-5 w-5" />
            Export to PDF
          </Button>
        </div>

        {/* AI Suggestions Card */}
        <Card className="glass-strong border-border/30 mb-16 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>AI Shopping Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong>💡 Smart Tip:</strong> Buy ginger and garlic together - they're used in most Indian recipes and stay fresh longer when stored properly.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong>🌿 Fresh Herbs:</strong> Buy fresh coriander and mint in bulk this week - you'll need them for multiple planned recipes.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-glow rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong>💰 Budget Tip:</strong> Buy rice and lentils in larger quantities - they have long shelf life and are staples in Indian cooking.
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

export default Shopping;