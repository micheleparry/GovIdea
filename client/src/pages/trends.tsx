import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Trend } from "@shared/schema";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Trends() {
  const { data: trends, isLoading } = useQuery<Trend[]>({
    queryKey: ['/api/trends'],
  });

  // Fallback trends data for demonstration
  const fallbackTrends = [
    {
      topic: "Contract Processing Delays",
      description: "18-24 month delays reported across agencies",
      changePercentage: "+45%",
      trend: "up",
      color: "red",
      category: "Pain Points"
    },
    {
      topic: "AI/ML Requirements",
      description: "Increasing demand for artificial intelligence solutions",
      changePercentage: "+32%",
      trend: "up", 
      color: "emerald",
      category: "Technology"
    },
    {
      topic: "Cybersecurity Focus",
      description: "Zero-trust architecture becoming standard",
      changePercentage: "+28%",
      trend: "up",
      color: "blue",
      category: "Security"
    },
    {
      topic: "Small Business Set-Asides",
      description: "More opportunities reserved for small businesses",
      changePercentage: "+19%",
      trend: "up",
      color: "purple",
      category: "Business"
    },
    {
      topic: "Quantum Computing Interest",
      description: "Growing investment in quantum research",
      changePercentage: "+67%",
      trend: "up",
      color: "emerald",
      category: "Technology"
    },
    {
      topic: "Legacy System Modernization",
      description: "Agencies prioritizing system updates",
      changePercentage: "+23%",
      trend: "up",
      color: "blue",
      category: "Infrastructure"
    }
  ];

  const displayTrends = trends && trends.length > 0 ? trends : fallbackTrends;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-gov-emerald" size={20} />;
      case 'down':
        return <TrendingDown className="text-red-500" size={20} />;
      default:
        return <Minus className="text-gray-500" size={20} />;
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "bg-red-50 border-red-200",
      emerald: "bg-gov-emerald bg-opacity-10 border-gov-emerald border-opacity-30",
      blue: "bg-blue-50 border-blue-200",
      purple: "bg-purple-50 border-purple-200",
      green: "bg-gov-emerald bg-opacity-10 border-gov-emerald border-opacity-30"
    };
    return colorMap[color] || "bg-gray-50 border-gray-200";
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Contracting Trends</h1>
          <p className="text-gray-600">Track emerging patterns and opportunities in government contracting.</p>
        </div>

        {/* Trending Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gov-emerald bg-opacity-10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-gov-emerald" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trending Up</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-red-500" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trending Down</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Minus className="text-gray-500" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stable</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trends List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Current Trends</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))
            ) : (
              displayTrends.map((trend, index) => (
                <div 
                  key={index}
                  className={`p-6 border-l-4 ${getColorClasses(trend.color)}`}
                  data-testid={`trend-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {trend.topic}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {trend.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {trend.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Last updated: 2 hours ago</span>
                        <span>Sources: 24 government sites</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-6">
                      {getTrendIcon(trend.trend)}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {trend.changePercentage}
                        </div>
                        <div className="text-xs text-gray-500">
                          vs last month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pain Points Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Government Contractor Pain Points</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">Contract Processing Delays</h4>
                <p className="text-red-700 text-sm">18-24 month processing times reported across multiple agencies</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">Complex Compliance Requirements</h4>
                <p className="text-orange-700 text-sm">Increasing regulatory burden and documentation requirements</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Payment Delays</h4>
                <p className="text-yellow-700 text-sm">Extended payment cycles affecting cash flow</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Technical Specification Changes</h4>
                <p className="text-blue-700 text-sm">Frequent mid-contract requirement modifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}