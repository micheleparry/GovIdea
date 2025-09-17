import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Building, Filter } from "lucide-react";
import { Opportunity } from "@shared/schema";

export default function RecentOpportunities() {
  const { data: opportunities, isLoading } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Opportunities</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-16 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200" data-testid="recent-opportunities">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Opportunities</h2>
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger className="w-40" data-testid="select-agency">
                <SelectValue placeholder="All Agencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
                <SelectItem value="darpa">DARPA</SelectItem>
                <SelectItem value="nsf">NSF</SelectItem>
                <SelectItem value="doe">DOE</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" data-testid="button-filter">
              <Filter className="mr-1" size={14} />
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {opportunities?.slice(0, 5).map((opportunity) => (
          <div 
            key={opportunity.id} 
            className="p-6 hover:bg-gray-50 transition-colors"
            data-testid={`opportunity-${opportunity.id}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900" data-testid="opportunity-title">
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
                <p className="text-gray-600 text-sm mb-3" data-testid="opportunity-summary">
                  {opportunity.description.substring(0, 150)}...
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="mr-1" size={14} />
                    Due: {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'TBD'}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="mr-1" size={14} />
                    {opportunity.contractValue}
                  </span>
                  <span className="flex items-center">
                    <Building className="mr-1" size={14} />
                    {opportunity.agency}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gov-emerald h-1.5 rounded-full" 
                      style={{ width: `${Math.max(opportunity.feasibilityScore, opportunity.impactScore)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {Math.max(opportunity.feasibilityScore, opportunity.impactScore)}%
                  </span>
                </div>
                <Button 
                  variant="link" 
                  className="text-gov-blue p-0 h-auto"
                  data-testid={`button-view-details-${opportunity.id}`}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <Button 
          variant="link" 
          className="w-full text-gov-blue font-medium"
          data-testid="button-view-all"
          onClick={() => window.location.href = '/opportunities'}
        >
          View All Opportunities
        </Button>
      </div>
    </div>
  );
}
