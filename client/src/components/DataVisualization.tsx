import { Button } from "@/components/ui/button";

export default function DataVisualization() {
  const fundingData = [
    {
      category: "Defense",
      amount: "$2.4B",
      percentage: 65,
      color: "bg-gov-blue"
    },
    {
      category: "Energy", 
      amount: "$890M",
      percentage: 24,
      color: "bg-gov-emerald"
    },
    {
      category: "Research",
      amount: "$320M", 
      percentage: 8.5,
      color: "bg-purple-600"
    },
    {
      category: "Other",
      amount: "$95M",
      percentage: 2.5,
      color: "bg-gov-amber"
    }
  ];

  const periods = ["30 Days", "90 Days", "1 Year"];

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200" data-testid="data-visualization">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Opportunity Analytics</h2>
          <div className="flex space-x-2">
            {periods.map((period, index) => (
              <Button
                key={period}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-gov-blue text-white" : "text-gray-600 hover:bg-gray-100"}
                data-testid={`button-period-${index}`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Opportunities by Agency</h3>
            <img 
              src="https://images.unsplash.com/photo-1558618406-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
              alt="Data visualization charts showing analytics and metrics on computer screens" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Success Rate Trends</h3>
            <img 
              src="https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
              alt="Dashboard with trend analysis charts and data visualization graphs" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Funding Distribution by Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fundingData.map((item) => (
              <div 
                key={item.category}
                className={`${item.category.toLowerCase()}-50 rounded-lg p-4`}
                style={{ backgroundColor: `${item.color.replace('bg-', 'hsl(var(--')})` }}
                data-testid={`funding-${item.category.toLowerCase()}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <span className={`text-lg font-bold ${item.color.replace('bg-', 'text-')}`}>
                    {item.amount}
                  </span>
                </div>
                <div className={`w-full ${item.color.replace('bg-', 'bg-')}-200 rounded-full h-2`}>
                  <div 
                    className={`${item.color} h-2 rounded-full`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-1">{item.percentage}% of total funding</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
