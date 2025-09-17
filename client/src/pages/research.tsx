import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Search, Brain } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Research() {
  const [selectedSector, setSelectedSector] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!selectedSector) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sector: selectedSector }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // In a real app, you might display the report or download it
        console.log('Generated report:', data.report);
        alert('Report generated successfully! Check the console for details.');
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const recentReports = [
    {
      title: "Defense Technology Opportunities Q1 2024",
      sector: "Defense",
      date: "March 15, 2024",
      opportunities: 45,
      status: "completed"
    },
    {
      title: "AI/ML Government Contracts Analysis",
      sector: "Technology",
      date: "March 10, 2024", 
      opportunities: 32,
      status: "completed"
    },
    {
      title: "Cybersecurity Market Intelligence Report",
      sector: "Cybersecurity",
      date: "March 5, 2024",
      opportunities: 28,
      status: "completed"
    },
    {
      title: "Small Business Set-Aside Opportunities",
      sector: "General",
      date: "February 28, 2024",
      opportunities: 67,
      status: "completed"
    }
  ];

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Research Reports</h1>
          <p className="text-gray-600">Generate comprehensive AI-powered research reports on government contracting opportunities.</p>
        </div>

        {/* Generate New Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-4">
            <Brain className="text-purple-600 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Generate New Report</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger data-testid="select-sector">
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defense">Defense</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
            
            <Input 
              placeholder="Custom keywords (optional)"
              data-testid="input-keywords"
            />
            
            <Button 
              onClick={handleGenerateReport}
              disabled={!selectedSector || isGenerating}
              className="bg-gov-blue text-white hover:bg-blue-700"
              data-testid="button-generate-report"
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Reports include market analysis, opportunity scoring, competitive landscape, and strategic recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search reports..."
                      className="pl-10 w-64"
                      data-testid="search-reports"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentReports.map((report, index) => (
                  <div 
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-colors"
                    data-testid={`report-${index}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <FileText className="text-gov-blue" size={20} />
                          <h3 className="font-semibold text-gray-900">
                            {report.title}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gov-blue bg-opacity-10 text-gov-blue">
                            {report.sector}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>Generated: {report.date}</span>
                          <span>{report.opportunities} opportunities analyzed</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`view-report-${index}`}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`download-report-${index}`}
                        >
                          <Download className="mr-1" size={14} />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Templates & Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Report Templates</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-900">Sector Analysis</h4>
                  <p className="text-xs text-gray-600">Comprehensive market overview and trends</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-900">Opportunity Deep Dive</h4>
                  <p className="text-xs text-gray-600">Detailed analysis of specific opportunities</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-900">Competitive Intelligence</h4>
                  <p className="text-xs text-gray-600">Market positioning and competitor analysis</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
              <div className="flex items-center mb-3">
                <Brain className="text-purple-600 mr-2" size={20} />
                <h3 className="font-semibold text-gray-900">AI-Powered Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Our reports use advanced AI to analyze market trends, identify opportunities, and provide strategic recommendations.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Market trend analysis</div>
                <div>• Opportunity scoring</div>
                <div>• Risk assessment</div>
                <div>• Strategic recommendations</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Report Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Reports</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Analysis Time</span>
                  <span className="font-medium">3.2 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}