import { Search } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/" },
        { name: "Opportunities", href: "/opportunities" },
        { name: "Analytics", href: "/analytics" },
        { name: "Research", href: "/research" }
      ]
    },
    {
      title: "Resources", 
      links: [
        { name: "API Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Contact Support", href: "#" },
        { name: "Status Page", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gov-blue rounded-lg flex items-center justify-center">
                <Search className="text-white" size={16} />
              </div>
              <h3 className="font-bold text-gray-900">Government Idea Browser</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Discover and analyze government opportunities with AI-powered insights.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('#') ? (
                      <a 
                        href={link.href} 
                        className="hover:text-gray-900"
                        data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        className="hover:text-gray-900"
                        data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Government Idea Browser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
