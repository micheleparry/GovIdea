import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Building, Search, Filter } from "lucide-react";
import { Opportunity } from "@shared/schema";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Opportunities() {
  const { data: opportunities, isLoading } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
  });

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Opportunities</h1>
          <p className="text-gray-600">Browse and analyze government contract opportunities with AI-powered insights.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search opportunities..."
                className="pl-10"
                data-testid="search-opportunities"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>
            <Select>
              <SelectTrigger className="w-48" data-testid="filter-agency">
                <SelectValue placeholder="All Agencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
                <SelectItem value="darpa">DARPA</SelectItem>
                <SelectItem value="nsf">NSF</SelectItem>
                <SelectItem value="doe">DOE</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48" data-testid="filter-category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
                <SelectItem value="cyber">Cybersecurity</SelectItem>
                <SelectItem value="research">Research</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" data-testid="advanced-filter">
              <Filter className="mr-2" size={16} />
              Advanced
            </Button>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            // Loading state
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            opportunities?.map((opportunity) => (
              <div 
                key={opportunity.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                data-testid={`opportunity-card-${opportunity.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900" data-testid="opportunity-title">
                        {opportunity.title}
                      </h3>
                      {opportunity.isHot && (
                        <Badge variant="destructive" className="bg-red-100 text-red-700">
                          Hot
                        </Badge>
                      )}
                      {opportunity.isHighImpact && (
                        <Badge className="bg-gov-emerald bg-opacity-20 text-gov-emerald">
                          High Impact
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4" data-testid="opportunity-description">
                      {opportunity.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="mr-1" size={14} />
                      Deadline
                    </p>
                    <p className="font-semibold text-gray-900">
                      {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 flex items-center">
                      <DollarSign className="mr-1" size={14} />
                      Contract Value
                    </p>
                    <p className="font-semibold text-gray-900">
                      {opportunity.contractValue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Building className="mr-1" size={14} />
                      {opportunity.agency}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Feasibility</div>
                      <div className="text-sm font-medium text-gov-emerald">
                        {opportunity.feasibilityScore}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Impact</div>
                      <div className="text-sm font-medium text-gov-blue">
                        {opportunity.impactScore}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-gov-blue text-white hover:bg-blue-700"
                    data-testid={`view-details-${opportunity.id}`}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline"
                    data-testid={`generate-report-${opportunity.id}`}
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8" data-testid="load-more">
            Load More Opportunities
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}