import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import IssueFormSteps from "@/components/issues/IssueFormSteps";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { issueCategories, getSubIssuesByCategory } from "@/lib/issue-categories";

// Form steps
const STEPS = [
  { id: 1, name: "Building" },
  { id: 2, name: "Issue Type" },
  { id: 3, name: "Details" },
  { id: 4, name: "Submit" },
];

// Validation schema for building step
const buildingFormSchema = z.object({
  address: z.string().min(3, "Address is required"),
  unit: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  landlord: z.string().min(2, "Landlord name is required"),
});

// Validation schema for issue type step
const issueTypeFormSchema = z.object({
  category: z.enum(issueCategories.map(c => c.id) as [string, ...string[]]),
  subIssues: z.array(z.string()).min(1, "Select at least one sub-issue"),
});

// Validation schema for details step
const detailsFormSchema = z.object({
  description: z.string().min(10, "Please provide more details about the issue"),
  date: z.string().min(1, "Date is required"),
  contactInfo: z.string().optional(),
});

type BuildingFormValues = z.infer<typeof buildingFormSchema>;
type IssueTypeFormValues = z.infer<typeof issueTypeFormSchema>;
type DetailsFormValues = z.infer<typeof detailsFormSchema>;

const ReportIssue = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    building: {} as BuildingFormValues,
    issueType: {
      category: "",
      subIssues: [],
    } as IssueTypeFormValues,
    details: {
      description: "",
      date: new Date().toISOString().split('T')[0],
      contactInfo: "",
    } as DetailsFormValues,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Building step form
  const buildingForm = useForm<BuildingFormValues>({
    resolver: zodResolver(buildingFormSchema),
    defaultValues: {
      address: "",
      unit: "",
      city: "New York",
      state: "NY",
      zipCode: "",
      landlord: "Goldmont Realty Corp",
    },
  });

  // Issue type step form
  const issueTypeForm = useForm<IssueTypeFormValues>({
    resolver: zodResolver(issueTypeFormSchema),
    defaultValues: {
      category: "",
      subIssues: [],
    },
  });

  // Details step form
  const detailsForm = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      description: "",
      date: new Date().toISOString().split('T')[0],
      contactInfo: "",
    },
  });

  // Get existing buildings
  const { data: buildings, isLoading: buildingsLoading } = useQuery({
    queryKey: ['/api/buildings'],
  });

  // Create building mutation
  const createBuildingMutation = useMutation({
    mutationFn: async (data: BuildingFormValues) => {
      const response = await apiRequest("POST", "/api/buildings", data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/buildings'] });
      setSelectedBuilding(data.id);
      nextStep();
    },
    onError: (error) => {
      toast({
        title: "Failed to create building",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Create issue mutation
  const createIssueMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/issues", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/issues'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/categories'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/top-buildings'] });
      
      toast({
        title: "Issue reported successfully",
        description: "Thank you for documenting this issue. Your report will help build accountability.",
        variant: "default",
      });
      
      // Reset form and go back to step 1
      setCurrentStep(1);
      buildingForm.reset();
      issueTypeForm.reset();
      detailsForm.reset();
      setSelectedBuilding(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to create issue report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle building selection from search
  const handleBuildingSelect = (buildingId: number) => {
    setSelectedBuilding(buildingId);
    
    // Find the selected building and populate the form
    const selectedBuildingData = Array.isArray(buildings) ? buildings.find((b: any) => b.id === buildingId) : undefined;
    if (selectedBuildingData) {
      buildingForm.reset({
        address: selectedBuildingData.address,
        unit: selectedBuildingData.unit || "",
        city: selectedBuildingData.city,
        state: selectedBuildingData.state,
        zipCode: selectedBuildingData.zipCode,
        landlord: selectedBuildingData.landlord,
      });
    }
  };

  // Handle sub-issues when category changes
  const handleCategoryChange = (category: string) => {
    issueTypeForm.setValue("category", category);
    issueTypeForm.setValue("subIssues", []);
  };

  // Handle form submission for each step
  const handleBuildingSubmit = (data: BuildingFormValues) => {
    if (selectedBuilding) {
      // If a building is already selected, just store the data and move to next step
      setFormData({ ...formData, building: data });
      nextStep();
    } else {
      // Otherwise create a new building
      createBuildingMutation.mutate(data);
    }
  };

  const handleIssueTypeSubmit = (data: IssueTypeFormValues) => {
    setFormData({ ...formData, issueType: data });
    nextStep();
  };

  const handleDetailsSubmit = (data: DetailsFormValues) => {
    const completeData = {
      ...formData,
      details: data
    };
    
    // Create the issue
    createIssueMutation.mutate({
      buildingId: selectedBuilding,
      category: completeData.issueType.category,
      subIssues: completeData.issueType.subIssues,
      description: completeData.details.description,
      date: new Date(completeData.details.date),
      status: "open",
      contactInfo: completeData.details.contactInfo || null,
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold mb-2">Report a Landlord Issue</h2>
            <p className="text-neutral-600">Document your experience to help create accountability</p>
          </div>
          
          {/* Form Wizard Steps */}
          <IssueFormSteps steps={STEPS} currentStep={currentStep} />
          
          {/* Form Container */}
          <div className="bg-white border border-neutral-200 rounded-xl shadow-lg p-6 sm:p-8">
            {/* Step 1: Building Information */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Building Information</h3>
                
                {/* Building Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Search Building</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-icons text-neutral-400 text-lg">search</span>
                    </span>
                    <select 
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      onChange={(e) => handleBuildingSelect(Number(e.target.value))}
                      value={selectedBuilding || ""}
                      disabled={buildingsLoading}
                    >
                      <option value="">Search by address or landlord name</option>
                      {Array.isArray(buildings) && buildings.map((building: any) => (
                        <option key={building.id} value={building.id}>
                          {building.address}, {building.city} - {building.landlord}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">Can't find your building? Add a new one below.</p>
                </div>
                
                {/* Building Form */}
                <Form {...buildingForm}>
                  <form onSubmit={buildingForm.handleSubmit(handleBuildingSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={buildingForm.control}
                        name="landlord"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Landlord/Management Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter landlord name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={buildingForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={buildingForm.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apartment/Unit (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apt 4B" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={buildingForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={buildingForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NY">New York</SelectItem>
                                <SelectItem value="NJ">New Jersey</SelectItem>
                                <SelectItem value="CT">Connecticut</SelectItem>
                                <SelectItem value="PA">Pennsylvania</SelectItem>
                                <SelectItem value="MA">Massachusetts</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={buildingForm.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        type="submit" 
                        className="inline-flex items-center px-6 py-3"
                        disabled={createBuildingMutation.isPending}
                      >
                        Next: Select Issue Type
                        <span className="material-icons ml-2">arrow_forward</span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {/* Step 2: Issue Type */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Select Issue Type</h3>
                
                <Form {...issueTypeForm}>
                  <form onSubmit={issueTypeForm.handleSubmit(handleIssueTypeSubmit)} className="space-y-6">
                    <FormField
                      control={issueTypeForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Category</FormLabel>
                          <Select 
                            onValueChange={(value) => handleCategoryChange(value)} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an issue category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {issueCategories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {issueTypeForm.watch("category") && (
                      <FormField
                        control={issueTypeForm.control}
                        name="subIssues"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Specific Issues</FormLabel>
                              <div className="text-sm text-neutral-500 mb-2">
                                Select all that apply
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {getSubIssuesByCategory(issueTypeForm.watch("category")).map(subIssue => (
                                <FormField
                                  key={subIssue.id}
                                  control={issueTypeForm.control}
                                  name="subIssues"
                                  render={({ field }) => {
                                    return (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(subIssue.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, subIssue.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== subIssue.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {subIssue.name}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                      >
                        <span className="material-icons mr-2">arrow_back</span>
                        Back
                      </Button>
                      <Button type="submit">
                        Next: Issue Details
                        <span className="material-icons ml-2">arrow_forward</span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {/* Step 3: Issue Details */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Issue Details</h3>
                
                <Form {...detailsForm}>
                  <form onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)} className="space-y-6">
                    <FormField
                      control={detailsForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about the issue. Be specific about what happened, when it occurred, and any interactions with the landlord or management."
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={detailsForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Issue</FormLabel>
                          <FormControl>
                            <Input 
                              type="date"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={detailsForm.control}
                      name="contactInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Information (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Email or phone number if you'd like to be contacted about this issue"
                              {...field} 
                            />
                          </FormControl>
                          <div className="text-xs text-neutral-500 mt-1">
                            Your contact information is private and will only be used for follow-up about this specific issue.
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                      >
                        <span className="material-icons mr-2">arrow_back</span>
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        disabled={createIssueMutation.isPending}
                      >
                        Submit Report
                        {createIssueMutation.isPending ? (
                          <span className="material-icons ml-2 animate-spin">autorenew</span>
                        ) : (
                          <span className="material-icons ml-2">check_circle</span>  
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && !createIssueMutation.isPending && !createIssueMutation.isError && (
              <div className="text-center py-8">
                <span className="material-icons text-5xl text-accent mb-4">check_circle</span>
                <h3 className="text-2xl font-semibold mb-3">Issue Reported Successfully!</h3>
                <p className="text-neutral-600 mb-6">Thank you for documenting this issue. Your report will help build accountability and strengthen tenant power.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                  >
                    Report Another Issue
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    View Dashboard
                    <span className="material-icons ml-2">dashboard</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportIssue;
