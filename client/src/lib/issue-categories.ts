export type IssueCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  subIssues: SubIssue[];
};

export type SubIssue = {
  id: string;
  name: string;
  description?: string;
};

// Define issue categories
export const issueCategories: IssueCategory[] = [
  {
    id: "repairs",
    name: "Repairs & Maintenance",
    description: "Issues related to building maintenance, repairs, and habitability standards.",
    icon: "build",
    iconColor: "secondary",
    subIssues: [
      { id: "heat_hot_water", name: "Heat & Hot Water" },
      { id: "plumbing_leaks", name: "Plumbing & Leaks" },
      { id: "electrical", name: "Electrical Issues" },
      { id: "pests", name: "Pests & Vermin" },
      { id: "structural", name: "Structural Problems" },
      { id: "appliances", name: "Appliance Failures" },
      { id: "mold", name: "Mold & Mildew" },
      { id: "ventilation", name: "Ventilation Issues" },
      { id: "common_areas", name: "Common Area Issues" },
      { id: "other_repairs", name: "Other Repair Issues" }
    ]
  },
  {
    id: "harassment",
    name: "Harassment",
    description: "Issues related to landlord harassment, intimidation, and illegal behavior.",
    icon: "warning",
    iconColor: "status-error",
    subIssues: [
      { id: "verbal_intimidation", name: "Verbal Intimidation" },
      { id: "illegal_entry", name: "Illegal Entry" },
      { id: "service_disruptions", name: "Service Disruptions" },
      { id: "threats", name: "Threats & Coercion" },
      { id: "privacy_violations", name: "Privacy Violations" },
      { id: "other_harassment", name: "Other Harassment Issues" }
    ]
  },
  {
    id: "rental_agreements",
    name: "Rental Agreements",
    description: "Issues related to lease terms, rent increases, and contract violations.",
    icon: "description",
    iconColor: "primary",
    subIssues: [
      { id: "excessive_rent_increases", name: "Excessive Rent Increases" },
      { id: "lease_violations", name: "Lease Violations" },
      { id: "security_deposit", name: "Security Deposit Issues" },
      { id: "lease_renewal", name: "Lease Renewal Problems" },
      { id: "illegal_fees", name: "Illegal Fees or Charges" },
      { id: "other_agreement", name: "Other Agreement Issues" }
    ]
  },
  {
    id: "financial",
    name: "Financial Issues",
    description: "Issues related to financial disputes, illegal fees, and accounting problems.",
    icon: "payments",
    iconColor: "secondary-dark",
    subIssues: [
      { id: "unexplained_charges", name: "Unexplained Charges" },
      { id: "illegal_late_fees", name: "Illegal Late Fees" },
      { id: "rent_overcharges", name: "Rent Overcharges" },
      { id: "payment_processing", name: "Payment Processing Issues" },
      { id: "billing_errors", name: "Billing Errors" },
      { id: "other_financial", name: "Other Financial Issues" }
    ]
  },
  {
    id: "digital",
    name: "Digital Issues",
    description: "Issues related to digital systems, technology access, and online harassment.",
    icon: "computer",
    iconColor: "primary-light",
    subIssues: [
      { id: "app_portal_problems", name: "App/Portal Problems" },
      { id: "internet_wifi", name: "Internet/WiFi Issues" },
      { id: "digital_communication", name: "Digital Communication Problems" },
      { id: "online_harassment", name: "Online Harassment" },
      { id: "other_digital", name: "Other Digital Issues" }
    ]
  },
  {
    id: "displacement",
    name: "Tenant Displacement",
    description: "Issues related to illegal evictions, buyouts, and displacement pressure.",
    icon: "home_work",
    iconColor: "status-warning",
    subIssues: [
      { id: "illegal_eviction", name: "Illegal Eviction Attempts" },
      { id: "buyout_pressure", name: "Buyout Pressure" },
      { id: "construction_harassment", name: "Construction Harassment" },
      { id: "essential_service_denial", name: "Essential Service Denial" },
      { id: "other_displacement", name: "Other Displacement Issues" }
    ]
  }
];

// Helper function to get category by ID
export function getIssueCategoryDetails(categoryId: string): IssueCategory | undefined {
  return issueCategories.find(category => category.id === categoryId);
}

// Helper function to get sub-issues by category ID
export function getSubIssuesByCategory(categoryId: string): SubIssue[] {
  const category = getIssueCategoryDetails(categoryId);
  return category ? category.subIssues : [];
}
