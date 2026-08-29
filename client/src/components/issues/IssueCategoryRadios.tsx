import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// Define types for our components
type SubCategory = {
  id: string;
  name: string;
  indented?: boolean;
}

type IssueCategory = {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

// Define the issue categories and subcategories
const issueCategories: IssueCategory[] = [
  {
    id: 'harassment',
    name: 'Harassment Issues',
    subCategories: [
      { 
        id: 'lack_of_hot_water', 
        name: 'Lack of hot water (with duration tracking)',
        indented: true 
      },
      { 
        id: 'unreturned_leases', 
        name: 'Unreturned leases',
        indented: true 
      },
      { 
        id: 'physical_harassment', 
        name: 'Physical harassment (mugging, apartment break-ins)',
        indented: true 
      },
      { 
        id: 'apartment_breakins', 
        name: 'Apartment break-ins',
        indented: true 
      },
      { 
        id: 'lease_theft', 
        name: 'Apartment break-ins with signed lease theft',
        indented: true 
      },
      { 
        id: 'verbal_intimidation', 
        name: 'Verbal intimidation',
        indented: true 
      },
      { 
        id: 'illegal_entry', 
        name: 'Illegal entry',
        indented: true 
      },
    ]
  },
  {
    id: 'repairs',
    name: 'Repair Issues',
    subCategories: [
      { 
        id: 'leaks_water_damage_apartment', 
        name: 'Leaks/Water Damage in apartments',
        indented: true 
      },
      { 
        id: 'leaks_water_damage_public_areas', 
        name: 'Leaks/Water Damage in public areas',
        indented: true 
      },
      { 
        id: 'doorbell_not_working_apartment', 
        name: 'Doorbell not working - apartment',
        indented: true 
      },
      { 
        id: 'doorbell_not_working_outside', 
        name: 'Doorbell not working - outside buzzer',
        indented: true 
      },
      { 
        id: 'no_hot_water', 
        name: 'No hot water (with duration tracking)',
        indented: true 
      },
    ]
  },
  {
    id: 'rental_agreements',
    name: 'Rental Agreement Issues',
    subCategories: [
      { 
        id: 'unreturned_lease', 
        name: 'Landlord not returning the lease',
        indented: true 
      },
      { 
        id: 'different_rates', 
        name: 'Landlord offering two leases with different rates and switching rates',
        indented: true 
      },
      { 
        id: 'no_lease', 
        name: 'Landlord not giving a lease',
        indented: true 
      },
      { 
        id: 'lease_theft', 
        name: 'Super breaking into apartment and stealing leases',
        indented: true 
      },
      { 
        id: 'excessive_rent_increases', 
        name: 'Excessive rent increases',
        indented: true 
      },
      { 
        id: 'lease_violations', 
        name: 'Lease violations by landlord',
        indented: true 
      }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Attacks',
    subCategories: [
      { 
        id: 'incorrect_location', 
        name: 'Phone showing incorrect location',
        indented: true 
      },
      { 
        id: 'phone_malfunctioning', 
        name: 'Phone malfunctioning',
        indented: true 
      },
      { 
        id: 'communication_interference', 
        name: 'Communication interference',
        indented: true 
      },
      { 
        id: 'app_portal_problems', 
        name: 'App/portal problems',
        indented: true 
      },
      { 
        id: 'social_media_issues', 
        name: 'Social media account issues (lockouts, password changes, flagging)',
        indented: true 
      }
    ]
  },
  {
    id: 'financial',
    name: 'Financial Attacks',
    subCategories: [
      { 
        id: 'missing_money', 
        name: 'Money missing from accounts',
        indented: true 
      },
      { 
        id: 'identity_theft', 
        name: 'Identity theft',
        indented: true 
      },
      { 
        id: 'debt_collectors', 
        name: 'Debt collectors contacting about unused services',
        indented: true 
      },
      { 
        id: 'unexplained_charges', 
        name: 'Unexplained charges',
        indented: true 
      },
      { 
        id: 'illegal_late_fees', 
        name: 'Illegal late fees',
        indented: true 
      }
    ]
  },
  {
    id: 'displacement',
    name: 'Tenants Being Forced Out or Left',
    subCategories: [
      { 
        id: 'illegal_eviction', 
        name: 'Illegal eviction',
        indented: true 
      },
      { 
        id: 'buyout_pressure', 
        name: 'Buyout pressure',
        indented: true 
      },
      { 
        id: 'identity_theft', 
        name: 'Identity theft',
        indented: true 
      },
      { 
        id: 'lack_of_funds', 
        name: 'Lack of funds',
        indented: true 
      },
      { 
        id: 'harassment', 
        name: 'Harassment',
        indented: true 
      },
      { 
        id: 'lack_of_work', 
        name: 'Lack of work',
        indented: true 
      }
    ]
  }
];

type IssueCategoryRadiosProps = {
  onCategorySelect: (category: string, subcategory: string) => void;
};

const IssueCategoryRadios: React.FC<IssueCategoryRadiosProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategories([]); // Reset subcategories when category changes
  };

  const handleSubcategoryToggle = (subcategoryId: string) => {
    setSelectedSubcategories(prev => {
      // If already selected, remove it
      if (prev.includes(subcategoryId)) {
        return prev.filter(id => id !== subcategoryId);
      } 
      // Otherwise add it
      else {
        return [...prev, subcategoryId];
      }
    });
  };

  const handleSearch = () => {
    if (selectedCategory && selectedSubcategories.length > 0) {
      // Build a search term with the category name only, to keep the query simple
      // The UI will still show all selected subcategories in the results
      const searchTerm = issueCategories.find(c => c.id === selectedCategory)?.name || selectedCategory;
      
      // Use the first subcategory for the callback, but we're really just using
      // the category name for search to avoid overwhelming the search API
      onCategorySelect(selectedCategory, selectedSubcategories[0]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Issue Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCategory || ""}
            onValueChange={handleCategoryChange}
            className="space-y-3"
          >
            {issueCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id} className="font-medium cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {selectedCategory && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {issueCategories.find(c => c.id === selectedCategory)?.name} - Select Multiple Subcategories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {issueCategories
                .find(c => c.id === selectedCategory)
                ?.subCategories.map((sub) => (
                  <div key={sub.id} className={`flex items-center space-x-2 ${sub.indented ? 'ml-6' : ''}`}>
                    <Checkbox 
                      id={sub.id}
                      checked={selectedSubcategories.includes(sub.id)}
                      onCheckedChange={() => handleSubcategoryToggle(sub.id)}
                    />
                    <Label htmlFor={sub.id} className="cursor-pointer">
                      {sub.name}
                    </Label>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSearch}
              disabled={selectedSubcategories.length === 0}
              className="w-full"
            >
              Search with Selected Issues ({selectedSubcategories.length})
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default IssueCategoryRadios;