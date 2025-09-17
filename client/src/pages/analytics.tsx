import { useQuery } from "@tanstack/react-query";
import { BarChart3, TrendingUp, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Analytics() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  const analyticsData = [
    {
      title: "Success Rate by Agency",
      description: "Win rate analysis across different government agencies",
      chart: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
    },
    {
      title: "Opportunity Value Distribution", 
      description: "Contract value ranges and frequency analysis",
      chart: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
    },
    {
      title: "Trending Topics Over Time",
      description: "Evolution of hot topics in government contracting",
      chart: "https://images.unsplash.com/photo-1558618406-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
    },
    {
      title: "Competitive Landscape",
      description: "Market positioning and competitor analysis",
      chart: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
    }
  ];

  const kpis = [
    {
      title: "Average Feasibility Score",
      value: "74.2%",
      change: "+5.2%",
      icon: Target,
      color: "text-gov-blue",
      bgColor: "bg-gov-blue bg-opacity-10"
    },
    {
      title: "High-Impact Opportunities",
      value: stats?.highScoreOpportunities || "0",
      change: "+12.8%",
      icon: TrendingUp,
      color: "text-gov-emerald", 
      bgColor: "bg-gov-emerald bg-opacity-10"
    },
    {
      title: "Active Agencies",
      value: "24",
      change: "+3",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Avg. Processing Time",
      value: "18.2 mo",
      change: "-2.1 mo",
      icon: Calendar,
      color: "text-gov-amber",
      bgColor: "bg-gov-amber bg-opacity-10"
    }
  ];

  const agencyPerformance = [
    { agency: "DARPA", opportunities: 45, winRate: 89, avgValue: "$2.4M" },
    { agency: "NSF", opportunities: 38, winRate: 82, avgValue: "$890K" },
    { agency: "DOE", opportunities: 32, winRate: 76, avgValue: "$1.2M" },
    { agency: "DOD", opportunities: 28, winRate: 71, avgValue: "$3.1M" },
    { agency: "NASA", opportunities: 22, winRate: 68, avgValue: "$1.8M" }
  ];

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          <p className="text-gray-600">Deep insights into government contracting trends and performance metrics.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              data-testid={`kpi-${index}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={kpi.color} size={24} />
                </div>
                <span className={`text-sm font-medium ${kpi.color}`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {analyticsData.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              data-testid={`chart-${index}`}
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="p-6">
                <img 
                  src={item.chart}
                  alt={`${item.title} analytics chart`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" data-testid={`export-${index}`}>
                    Export
                  </Button>
                  <Button variant="outline" size="sm" data-testid={`details-${index}`}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Agency Performance Analysis</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opportunities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Contract Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agencyPerformance.map((agency, index) => (
                  <tr key={index} data-testid={`agency-row-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{agency.agency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{agency.opportunities}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gov-emerald h-2 rounded-full" 
                            style={{ width: `${agency.winRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{agency.winRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{agency.avgValue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="link" 
                        className="text-gov-blue p-0"
                        data-testid={`view-agency-${index}`}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Analytics</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" data-testid="export-csv">
              Export as CSV
            </Button>
            <Button variant="outline" data-testid="export-pdf">
              Export as PDF
            </Button>
            <Button variant="outline" data-testid="export-excel">
              Export to Excel
            </Button>
            <Button className="bg-gov-blue text-white hover:bg-blue-700" data-testid="schedule-report">
              Schedule Regular Reports
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}