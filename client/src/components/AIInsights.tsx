import { Brain, Lightbulb, AlertTriangle } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200" data-testid="ai-insights">
      <div className="px-6 py-4 border-b border-purple-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Brain className="text-purple-600 mr-2" size={20} />
          AI Insights
        </h2>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="text-purple-600" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1" data-testid="insight-alert-title">
                Opportunity Alert
              </p>
              <p className="text-sm text-gray-600" data-testid="insight-alert-description">
                3 new SBIR opportunities matching your AI/ML expertise were posted in the last 24 hours.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gov-amber bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-gov-amber" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1" data-testid="market-shift-title">
                Market Shift
              </p>
              <p className="text-sm text-gray-600" data-testid="market-shift-description">
                Increased focus on quantum computing across defense agencies. Consider positioning for upcoming opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
