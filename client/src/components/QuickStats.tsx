export default function QuickStats() {
  const stats = [
    { label: "Avg. Opportunity Score", value: "74.2%" },
    { label: "Success Rate", value: "68%", color: "text-gov-emerald" },
    { label: "New This Week", value: "23", color: "text-gov-blue" }
  ];

  const agencies = [
    { name: "DARPA", score: "89%" },
    { name: "NSF", score: "82%" },
    { name: "DOE", score: "76%" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200" data-testid="quick-stats">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Analytics</h2>
      </div>
      <div className="p-6">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
          alt="Business analytics dashboard with charts and data visualization" 
          className="w-full h-32 object-cover rounded-lg mb-4" 
        />
        
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className={`font-semibold ${stat.color || 'text-gray-900'}`} data-testid={`stat-${index}`}>
                {stat.value}
              </span>
            </div>
          ))}
          
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Top Performing Agencies</p>
            <div className="space-y-2">
              {agencies.map((agency, index) => (
                <div key={agency.name} className="flex justify-between text-sm">
                  <span>{agency.name}</span>
                  <span className="text-gov-emerald font-medium" data-testid={`agency-score-${index}`}>
                    {agency.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
