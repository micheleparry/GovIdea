import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path || (path === "/" && location === "/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gov-blue rounded-lg flex items-center justify-center">
                <Search className="text-white text-sm" size={16} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Government Idea Browser</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`pb-4 ${isActive("/") ? "text-gov-blue font-medium border-b-2 border-gov-blue" : "text-gray-600 hover:text-gray-900"}`}
                data-testid="nav-dashboard"
              >
                Dashboard
              </Link>
              <Link 
                href="/opportunities" 
                className={`pb-4 ${isActive("/opportunities") ? "text-gov-blue font-medium border-b-2 border-gov-blue" : "text-gray-600 hover:text-gray-900"}`}
                data-testid="nav-opportunities"
              >
                Opportunities
              </Link>
              <Link 
                href="/trends" 
                className={`pb-4 ${isActive("/trends") ? "text-gov-blue font-medium border-b-2 border-gov-blue" : "text-gray-600 hover:text-gray-900"}`}
                data-testid="nav-trends"
              >
                Trends
              </Link>
              <Link 
                href="/research" 
                className={`pb-4 ${isActive("/research") ? "text-gov-blue font-medium border-b-2 border-gov-blue" : "text-gray-600 hover:text-gray-900"}`}
                data-testid="nav-research"
              >
                Research
              </Link>
              <Link 
                href="/analytics" 
                className={`pb-4 ${isActive("/analytics") ? "text-gov-blue font-medium border-b-2 border-gov-blue" : "text-gray-600 hover:text-gray-900"}`}
                data-testid="nav-analytics"
              >
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search opportunities..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-blue focus:border-transparent"
                data-testid="input-search"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>
            <Button 
              className="bg-gov-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              data-testid="button-generate-report"
              onClick={() => window.location.href = '/research'}
            >
              Generate Report
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
