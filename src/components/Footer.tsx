import { ChefHat, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Features',
      links: [
        { name: 'AI Recipe Generator', href: '/recipes' },
        { name: 'Meal Planner', href: '/planner' },
        { name: 'Shopping Lists', href: '/shopping' },
        { name: 'Profile', href: '/profile' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
      ]
    }
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-md border-t border-border/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-hero">
                <img src="/logo.svg" alt="Cooksy AI" className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-xl bg-gradient-hero bg-clip-text text-transparent">
                Cooksy AI
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI-powered Indian meal planning and recipe discovery. 
              Cook smarter, shop faster, live healthier with traditional flavors.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hynextechnologies25@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 6379726858</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 6379971395</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <span>Developed by</span>
              <a href="https://www.hynex.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Hynex Technologies
              </a>
            </div>
            <div className="text-muted-foreground text-sm">
              © {currentYear} Cooksy AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;