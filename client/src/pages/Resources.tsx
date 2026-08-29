import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataExport from "@/components/resources/DataExport";

type Building = {
  id: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const Resources = () => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('all');
  
  const { data: buildings = [] } = useQuery<Building[]>({
    queryKey: ['/api/buildings'],
  });

  // Handle export
  const handleExport = () => {
    // In a real implementation, this would call the API with the filters
    // and trigger a download of the requested format
    console.log('Export format:', exportFormat);
    console.log('Filters:', { buildingFilter, issueTypeFilter, dateRangeFilter });
    
    const apiUrl = `/api/export?format=${exportFormat}&building=${buildingFilter}&issueType=${issueTypeFilter}&dateRange=${dateRangeFilter}`;
    
    // For demo purposes, simply log the URL
    console.log('Export URL:', apiUrl);
    
    // In a real implementation, this would trigger a download
    // window.location.href = apiUrl;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Resources & Data Export</h2>
          <p className="text-neutral-800">Access helpful resources and download anonymized data for advocacy</p>
        </div>
        
        {/* Resource Categories Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a href="#legal-resources" className="text-sm text-neutral-700 hover:text-neutral-900">Legal Resources</a>
          <span className="text-neutral-300">|</span>
          <a href="#government-agencies" className="text-sm text-neutral-700 hover:text-neutral-900">Government Agencies</a>
          <span className="text-neutral-300">|</span>
          <a href="#tenant-organizations" className="text-sm text-neutral-700 hover:text-neutral-900">Tenant Organizations</a>
          <span className="text-neutral-300">|</span>
          <a href="#community-resources" className="text-sm text-neutral-700 hover:text-neutral-900">Community Resources</a>
          <span className="text-neutral-300">|</span>
          <a href="#data-tools" className="text-sm text-neutral-700 hover:text-neutral-900">Data Tools</a>
        </div>
        
        {/* Resource Content Sections */}
        <div className="mb-12">
          {/* Legal Resources */}
          <div id="legal-resources" className="py-6 border-t border-neutral-200">
            <h3 className="text-xl font-semibold mb-4">Legal Resources</h3>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary-dark mt-1 mr-2">account_balance</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.nycourts.gov/housing/" target="_blank" rel="noopener noreferrer" className="hover:underline">NYC Housing Court</a></h4>
                    <p className="text-sm text-neutral-600">Resources for tenants facing eviction or needing to take landlords to court.</p>
                    <a href="https://www.nycourts.gov/housing/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.nycourts.gov/housing/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary-dark mt-1 mr-2">people</span>
                  <div>
                    <h4 className="font-medium"><a href="https://legalaidnyc.org/housing-problems/" target="_blank" rel="noopener noreferrer" className="hover:underline">Legal Aid Society</a></h4>
                    <p className="text-sm text-neutral-600">Free legal services for low-income tenants having issues with their landlords.</p>
                    <a href="https://legalaidnyc.org/housing-problems/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://legalaidnyc.org/housing-problems/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary-dark mt-1 mr-2">gavel</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.justfix.org/en/" target="_blank" rel="noopener noreferrer" className="hover:underline">JustFix: Technology for Housing Justice</a></h4>
                    <p className="text-sm text-neutral-600">Automated resources for tenants including repair requests, landlord research, and rent history tools.</p>
                    <a href="https://www.justfix.org/en/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.justfix.org/en/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary-dark mt-1 mr-2">shield</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.righttocounselnyc.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Right to Counsel NYC</a></h4>
                    <p className="text-sm text-neutral-600">Information on your right to free legal representation in housing court.</p>
                    <a href="https://www.righttocounselnyc.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.righttocounselnyc.org/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary-dark mt-1 mr-2">home</span>
                  <div>
                    <h4 className="font-medium"><a href="https://goodcausenyc.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Good Cause Eviction Protections</a></h4>
                    <p className="text-sm text-neutral-600">Eligibility screener and rent calculator to see if you have legal rights to renew your lease.</p>
                    <a href="https://goodcausenyc.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://goodcausenyc.org/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary-dark mt-1 mr-2">receipt_long</span>
                  <div>
                    <h4 className="font-medium"><a href="https://app.justfix.org/en/rh/splash" target="_blank" rel="noopener noreferrer" className="hover:underline">Order Your Apartment's Rent History</a></h4>
                    <p className="text-sm text-neutral-600">Request official rent history records for your apartment to check for illegal increases.</p>
                    <a href="https://app.justfix.org/en/rh/splash" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://app.justfix.org/en/rh/splash</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Government Agencies */}
          <div id="government-agencies" className="py-6 border-t border-neutral-200">
            <h3 className="text-xl font-semibold mb-4">Government Agencies</h3>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-sm text-secondary-dark mt-1 mr-2">apartment</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www1.nyc.gov/site/hpd/index.page" target="_blank" rel="noopener noreferrer" className="hover:underline">NYC Department of Housing Preservation & Development (HPD)</a></h4>
                    <p className="text-sm text-neutral-600">Report building code violations, lack of heat/hot water, or other housing issues.</p>
                    <a href="https://www1.nyc.gov/site/hpd/index.page" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www1.nyc.gov/site/hpd/index.page</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-secondary-dark mt-1 mr-2">campaign</span>
                  <div>
                    <h4 className="font-medium"><a href="https://hcr.ny.gov/" target="_blank" rel="noopener noreferrer" className="hover:underline">NY State Division of Housing and Community Renewal (DHCR)</a></h4>
                    <p className="text-sm text-neutral-600">Information about rent regulation and handling complaints against landlords.</p>
                    <a href="https://hcr.ny.gov/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://hcr.ny.gov/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-secondary-dark mt-1 mr-2">phone</span>
                  <div>
                    <h4 className="font-medium"><a href="https://portal.311.nyc.gov/" target="_blank" rel="noopener noreferrer" className="hover:underline">NYC 311: Complaint Portal</a></h4>
                    <p className="text-sm text-neutral-600">Report housing complaints including maintenance issues, mold, pests, and violations.</p>
                    <a href="https://portal.311.nyc.gov/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://portal.311.nyc.gov/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-secondary-dark mt-1 mr-2">spa</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.nyc.gov/site/hpd/services-and-information/indoor-allergen-hazards-mold-and-pests.page" target="_blank" rel="noopener noreferrer" className="hover:underline">Indoor Allergen Hazards (Mold, Mice, Roaches and Rats)</a></h4>
                    <p className="text-sm text-neutral-600">Information about landlord obligations regarding mold and pest infestations.</p>
                    <a href="https://www.nyc.gov/site/hpd/services-and-information/indoor-allergen-hazards-mold-and-pests.page" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.nyc.gov/site/hpd/services-and-information/indoor-allergen-hazards-mold-and-pests.page</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-secondary-dark mt-1 mr-2">warning</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.nyc.gov/site/hpd/services-and-information/report-tenant-harassment.page" target="_blank" rel="noopener noreferrer" className="hover:underline">Tenant Harassment Prevention Task Force</a></h4>
                    <p className="text-sm text-neutral-600">Report tenant harassment through NYC's official channels. Hotline: 917-661-4505</p>
                    <a href="https://www.nyc.gov/site/hpd/services-and-information/report-tenant-harassment.page" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.nyc.gov/site/hpd/services-and-information/report-tenant-harassment.page</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-secondary-dark mt-1 mr-2">calendar_today</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.nyc.gov/site/hpd/services-and-information/code-enforcement.page" target="_blank" rel="noopener noreferrer" className="hover:underline">HPD Code Enforcement - Schedule Appointment</a></h4>
                    <p className="text-sm text-neutral-600">Schedule appointments with HPD's Code Enforcement office for violations, dismissal requests, and documentation.</p>
                    <a href="https://www.nyc.gov/site/hpd/services-and-information/code-enforcement.page" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.nyc.gov/site/hpd/services-and-information/code-enforcement.page</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Tenant Organizations */}
          <div id="tenant-organizations" className="py-6 border-t border-neutral-200">
            <h3 className="text-xl font-semibold mb-4">Tenant Organizations</h3>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-sm text-accent mt-1 mr-2">groups</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.metcouncilonhousing.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Met Council on Housing</a></h4>
                    <p className="text-sm text-neutral-600">NYC's tenant union offering resources, organizing assistance, and a tenant hotline.</p>
                    <a href="https://www.metcouncilonhousing.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.metcouncilonhousing.org/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-accent mt-1 mr-2">home</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.crownheightstenantunion.org" target="_blank" rel="noopener noreferrer" className="hover:underline">Crown Heights Tenants' Union</a></h4>
                    <p className="text-sm text-neutral-600">Coalition of tenants organizing for safer, more affordable housing in Crown Heights.</p>
                    <a href="https://www.crownheightstenantunion.org" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.crownheightstenantunion.org</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-accent mt-1 mr-2">policy</span>
                  <div>
                    <h4 className="font-medium"><a href="https://housingjusticeforall.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Housing Justice for All</a></h4>
                    <p className="text-sm text-neutral-600">Coalition fighting for tenants' rights and housing justice across New York State.</p>
                    <a href="https://housingjusticeforall.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://housingjusticeforall.org/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-accent mt-1 mr-2">campaign</span>
                  <div>
                    <h4 className="font-medium"><a href="https://actionnetwork.org/events/join-us-in-albany-to-make-rent-affordable" target="_blank" rel="noopener noreferrer" className="hover:underline">Action Network: Rent Justice</a></h4>
                    <p className="text-sm text-neutral-600">Organizing actions and events to advocate for affordable rent and tenant protections.</p>
                    <a href="https://actionnetwork.org/events/join-us-in-albany-to-make-rent-affordable" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://actionnetwork.org/events/join-us-in-albany-to-make-rent-affordable</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Community Resources */}
          <div id="community-resources" className="py-6 border-t border-neutral-200">
            <h3 className="text-xl font-semibold mb-4">Community Resources</h3>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">menu_book</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.nyc.gov/assets/buildings/pdf/HousingMaintenanceCode.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">NYC Housing Maintenance Code</a></h4>
                    <p className="text-sm text-neutral-600">Official NYC Administrative Code establishing minimum housing standards for health, safety, and habitability.</p>
                    <a href="https://www.nyc.gov/assets/buildings/pdf/HousingMaintenanceCode.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">Download PDF</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">data_array</span>
                  <div>
                    <h4 className="font-medium"><a href="https://opendata.cityofnewyork.us/" target="_blank" rel="noopener noreferrer" className="hover:underline">NYC Open Data</a></h4>
                    <p className="text-sm text-neutral-600">Access public data from NYC agencies including housing violations, inspections, and building information.</p>
                    <a href="https://opendata.cityofnewyork.us/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://opendata.cityofnewyork.us/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">child_care</span>
                  <div>
                    <h4 className="font-medium"><a href="https://cccnewyork.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Citizens Committee for Children</a></h4>
                    <p className="text-sm text-neutral-600">Research and data on child and family well-being in New York, including housing conditions.</p>
                    <a href="https://cccnewyork.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://cccnewyork.org/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">wifi</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.needhelppayingbills.com/html/free_internet_access.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Free or Subsidized Internet Access</a></h4>
                    <p className="text-sm text-neutral-600">Resources for low-income households to access free or reduced-cost internet service.</p>
                    <a href="https://www.needhelppayingbills.com/html/free_internet_access.html" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.needhelppayingbills.com/html/free_internet_access.html</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">forum</span>
                  <div>
                    <h4 className="font-medium"><a href="#" className="hover:underline">Tenant Support Forum</a></h4>
                    <p className="text-sm text-neutral-600">Connect with other Goldmont tenants to share experiences and strategies.</p>
                    <a href="#" className="text-xs text-primary-dark hover:underline">Join Discussion</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Data Tools */}
          <div id="data-tools" className="py-6 border-t border-neutral-200">
            <h3 className="text-xl font-semibold mb-4">Data Tools</h3>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">insights</span>
                  <div>
                    <h4 className="font-medium"><a href="#" className="hover:underline">Violations Explorer</a></h4>
                    <p className="text-sm text-neutral-600">Interactive tool to analyze patterns of violations across Goldmont properties.</p>
                    <a href="#" className="text-xs text-primary-dark hover:underline">Open Explorer</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">map</span>
                  <div>
                    <h4 className="font-medium"><a href="#" className="hover:underline">Property Map</a></h4>
                    <p className="text-sm text-neutral-600">Map-based visualization of Goldmont properties and reported violations.</p>
                    <a href="#" className="text-xs text-primary-dark hover:underline">View Map</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">search</span>
                  <div>
                    <h4 className="font-medium"><a href="https://www.justfix.org/en/" target="_blank" rel="noopener noreferrer" className="hover:underline">JustFix Research Tool</a></h4>
                    <p className="text-sm text-neutral-600">Research your landlord and building to learn about violations and other properties they own.</p>
                    <a href="https://www.justfix.org/en/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://www.justfix.org/en/</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">calculate</span>
                  <div>
                    <h4 className="font-medium"><a href="https://goodcausenyc.org/rent_calculator" target="_blank" rel="noopener noreferrer" className="hover:underline">Rent Increase Calculator</a></h4>
                    <p className="text-sm text-neutral-600">Calculate legal rent increases and determine if you're protected by Good Cause Eviction laws.</p>
                    <a href="https://goodcausenyc.org/rent_calculator" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-dark hover:underline">https://goodcausenyc.org/rent_calculator</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-sm text-primary mt-1 mr-2">text_format</span>
                  <div>
                    <h4 className="font-medium"><a href="#" className="hover:underline">Rent History Text Bot</a></h4>
                    <p className="text-sm text-neutral-600">Text "RENT HISTORY" to (855) 610-2450 to get your apartment's rent history.</p>
                    <a href="tel:8556102450" className="text-xs text-primary-dark hover:underline">(855) 610-2450</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Data Export Section */}
        <DataExport 
          buildings={buildings}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          buildingFilter={buildingFilter}
          setBuildingFilter={setBuildingFilter}
          issueTypeFilter={issueTypeFilter}
          setIssueTypeFilter={setIssueTypeFilter}
          dateRangeFilter={dateRangeFilter}
          setDateRangeFilter={setDateRangeFilter}
          onExport={handleExport}
        />
      </div>
    </section>
  );
};

export default Resources;
