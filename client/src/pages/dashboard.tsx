import Header from "../components/Header";
import StatsOverview from "../components/StatsOverview";
import OpportunityOfTheDay from "../components/OpportunityOfTheDay";
import RecentOpportunities from "../components/RecentOpportunities";
import TrendingTopics from "../components/TrendingTopics";
import QuickStats from "../components/QuickStats";
import AIInsights from "../components/AIInsights";
import DataVisualization from "../components/DataVisualization";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <OpportunityOfTheDay />
            <RecentOpportunities />
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <TrendingTopics />
            <QuickStats />
            <AIInsights />
          </div>
        </div>

        <DataVisualization />
      </div>

      <Footer />
    </div>
  );
}
