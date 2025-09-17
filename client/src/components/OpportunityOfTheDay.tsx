import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Bookmark, Calendar, DollarSign } from "lucide-react";
import { Opportunity } from "@shared/schema";

export default function OpportunityOfTheDay() {
  const { data: opportunity, isLoading } = useQuery<Opportunity>({
    queryKey: ['/api/opportunities/featured'],
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gov-blue to-blue-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Star className="mr-2" size={20} />
            Opportunity of the Day
          </h2>
        </div>
        <div className="p-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gov-blue to-blue-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Star className="mr-2" size={20} />
            Opportunity of the Day
          </h2>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-500">No featured opportunity available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" data-testid="opportunity-of-the-day">
      <div className="bg-gradient-to-r from-gov-blue to-blue-600 px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Star className="mr-2" size={20} />
          Opportunity of the Day
        </h2>
      </div>
      <div className="p-6">
        <img 
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
          alt="Government contractor analytics workspace" 
          className="w-full h-48 object-cover rounded-lg mb-4" 
        />
        
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid="opportunity-title">
              {opportunity.title}
            </h3>
            <p className="text-gray-600 mb-4" data-testid="opportunity-description">
              {opportunity.description}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Feasibility Score</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gov-emerald h-2 rounded-full" 
                  style={{ width: `${opportunity.feasibilityScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gov-emerald" data-testid="feasibility-score">
                {opportunity.feasibilityScore}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Impact Score</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gov-blue h-2 rounded-full" 
                  style={{ width: `${opportunity.impactScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gov-blue" data-testid="impact-score">
                {opportunity.impactScore}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {opportunity.tags?.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-gov-blue bg-opacity-10 text-gov-blue"
              data-testid={`tag-${index}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="mr-1" size={14} />
              Deadline
            </p>
            <p className="font-semibold text-gray-900" data-testid="opportunity-deadline">
              {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'TBD'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center">
              <DollarSign className="mr-1" size={14} />
              Est. Contract Value
            </p>
            <p className="font-semibold text-gray-900" data-testid="contract-value">
              {opportunity.contractValue}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            className="flex-1 bg-gov-blue text-white hover:bg-blue-700"
            data-testid="button-view-analysis"
          >
            View Full Analysis
          </Button>
          <Button 
            variant="outline" 
            className="px-4"
            data-testid="button-save"
          >
            <Bookmark className="mr-2" size={16} />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
