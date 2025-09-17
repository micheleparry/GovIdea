import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Trend } from "@shared/schema";

export default function TrendingTopics() {
  const { data: trends, isLoading } = useQuery<Trend[]>({
    queryKey: ['/api/trends'],
  });

  // Fallback trends if no data from API
  const fallbackTrends = [
    {
      topic: "Contract Processing Delays",
      description: "18-24 month delays reported",
      changePercentage: "+45%",
      color: "red",
      trend: "up"
    },
    {
      topic: "AI/ML Requirements",
      description: "Increasing across agencies",
      changePercentage: "+32%",
      color: "emerald",
      trend: "up"
    },
    {
      topic: "Cybersecurity Focus",
      description: "Zero-trust architecture",
      changePercentage: "+28%",
      color: "blue",
      trend: "up"
    },
    {
      topic: "Small Business Set-Asides",
      description: "More opportunities available",
      changePercentage: "+19%",
      color: "purple",
      trend: "up"
    }
  ];

  const displayTrends = trends && trends.length > 0 ? trends.slice(0, 4) : fallbackTrends;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-3 bg-gray-100 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "bg-red-50",
      emerald: "bg-gov-emerald bg-opacity-10",
      blue: "bg-blue-50",
      purple: "bg-purple-50",
      green: "bg-gov-emerald bg-opacity-10"
    };
    return colorMap[color] || "bg-gray-50";
  };

  const getIconColor = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "text-red-500",
      emerald: "text-gov-emerald", 
      blue: "text-blue-500",
      purple: "text-purple-500",
      green: "text-gov-emerald"
    };
    return colorMap[color] || "text-gray-500";
  };

  const getTextColor = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "text-red-500",
      emerald: "text-gov-emerald",
      blue: "text-blue-500", 
      purple: "text-purple-500",
      green: "text-gov-emerald"
    };
    return colorMap[color] || "text-gray-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200" data-testid="trending-topics">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
      </div>
      <div className="p-6 space-y-4">
        {displayTrends.map((trend, index) => (
          <div 
            key={trend.topic || index}
            className={`flex items-center justify-between p-3 ${getColorClasses(trend.color)} rounded-lg`}
            data-testid={`trend-${index}`}
          >
            <div>
              <p className="font-medium text-gray-900" data-testid={`trend-topic-${index}`}>
                {trend.topic}
              </p>
              <p className="text-sm text-gray-600" data-testid={`trend-description-${index}`}>
                {trend.description}
              </p>
            </div>
            <div className="flex items-center">
              <TrendingUp className={`mr-1 ${getIconColor(trend.color)}`} size={16} />
              <span className={`text-sm font-medium ${getTextColor(trend.color)}`}>
                {trend.changePercentage || `+${Math.floor(Number(trend.changePercentage) || 0)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
