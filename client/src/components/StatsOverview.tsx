import { useQuery } from "@tanstack/react-query";
import { Briefcase, Star, TrendingUp, FileText } from "lucide-react";

interface Stats {
  totalOpportunities: number;
  highScoreOpportunities: number;
  trendingTopics: number;
  reportsGenerated: number;
}

export default function StatsOverview() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Opportunities",
      value: stats?.totalOpportunities?.toLocaleString() || "0",
      icon: Briefcase,
      bgColor: "bg-gov-blue bg-opacity-10",
      iconColor: "text-gov-blue",
      change: "+12.5%",
      testId: "stat-total-opportunities"
    },
    {
      title: "High Score Ops",
      value: stats?.highScoreOpportunities?.toLocaleString() || "0",
      icon: Star,
      bgColor: "bg-gov-emerald bg-opacity-10",
      iconColor: "text-gov-emerald",
      change: "+8.2%",
      testId: "stat-high-score-ops"
    },
    {
      title: "Trending Topics",
      value: stats?.trendingTopics?.toLocaleString() || "0",
      icon: TrendingUp,
      bgColor: "bg-gov-amber bg-opacity-10",
      iconColor: "text-gov-amber",
      change: "+15.7%",
      testId: "stat-trending-topics"
    },
    {
      title: "Reports Generated",
      value: stats?.reportsGenerated?.toLocaleString() || "0",
      icon: FileText,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "+22.1%",
      testId: "stat-reports-generated"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat) => (
        <div 
          key={stat.title}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          data-testid={stat.testId}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900" data-testid={`${stat.testId}-value`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={stat.iconColor} size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-gov-emerald text-sm font-medium">{stat.change}</span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
