import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Book, MessageCircle, Settings } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "How do I create a meal plan?",
      answer: "Navigate to the Meal Planner page and select recipes for each day of the week. You can drag and drop recipes or use our AI suggestions based on your preferences."
    },
    {
      question: "How does the AI recipe generator work?",
      answer: "Our AI analyzes your available ingredients, dietary preferences, and cooking experience to suggest personalized recipes. Simply enter your ingredients and let AI do the magic!"
    },
    {
      question: "Can I modify serving sizes?",
      answer: "Yes! On any recipe detail page, you can adjust the serving size and all ingredient quantities will automatically scale in grams and appropriate measurements."
    },
    {
      question: "How do I add items to my shopping list?",
      answer: "You can add ingredients from recipes directly to your shopping list, or manually add items. The app will organize them by category for efficient shopping."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All your personal information and preferences are stored securely and never shared with third parties."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              Help Center
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of Cooksy AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Book className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Learn the basics of using Cooksy AI</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <HelpCircle className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">FAQs</h3>
              <p className="text-sm text-muted-foreground">Common questions and answers</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 text-primary-glow mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Settings className="h-8 w-8 text-destructive mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Account Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your preferences</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Help;