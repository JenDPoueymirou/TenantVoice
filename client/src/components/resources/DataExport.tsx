import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { issueCategories } from "@/lib/issue-categories";

type Building = {
  id: number;
  address: string;
  city: string;
  state: string;
};

type DataExportProps = {
  buildings: Building[];
  exportFormat: 'csv' | 'json' | 'pdf';
  setExportFormat: (format: 'csv' | 'json' | 'pdf') => void;
  buildingFilter: string;
  setBuildingFilter: (filter: string) => void;
  issueTypeFilter: string;
  setIssueTypeFilter: (filter: string) => void;
  dateRangeFilter: string;
  setDateRangeFilter: (filter: string) => void;
  onExport: () => void;
};

const DataExport = ({
  buildings,
  exportFormat,
  setExportFormat,
  buildingFilter,
  setBuildingFilter,
  issueTypeFilter,
  setIssueTypeFilter,
  dateRangeFilter,
  setDateRangeFilter,
  onExport
}: DataExportProps) => {
  return (
    <div className="bg-neutral-100 rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Data Export</h3>
          <p className="text-neutral-600">Download anonymized data for research, advocacy, or legal action</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Button
            variant={exportFormat === 'csv' ? 'default' : 'outline'}
            onClick={() => setExportFormat('csv')}
            className="inline-flex items-center"
          >
            <span className="material-icons text-sm mr-1">download</span>
            CSV
          </Button>
          <Button
            variant={exportFormat === 'json' ? 'default' : 'outline'}
            onClick={() => setExportFormat('json')}
            className="inline-flex items-center"
          >
            <span className="material-icons text-sm mr-1">download</span>
            JSON
          </Button>
          <Button
            variant={exportFormat === 'pdf' ? 'default' : 'outline'}
            onClick={() => setExportFormat('pdf')}
            className="inline-flex items-center"
          >
            <span className="material-icons text-sm mr-1">download</span>
            PDF Report
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
        <h4 className="font-medium mb-3">Export Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="buildingFilter" className="block text-sm font-medium text-neutral-700 mb-1">Building</label>
            <Select
              value={buildingFilter}
              onValueChange={setBuildingFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Buildings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Buildings</SelectItem>
                {buildings.map((building) => (
                  <SelectItem key={building.id} value={building.id.toString()}>
                    {building.address}, {building.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="issueTypeFilter" className="block text-sm font-medium text-neutral-700 mb-1">Issue Type</label>
            <Select
              value={issueTypeFilter}
              onValueChange={setIssueTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Issue Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issue Types</SelectItem>
                {issueCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="dateRangeFilter" className="block text-sm font-medium text-neutral-700 mb-1">Date Range</label>
            <Select
              value={dateRangeFilter}
              onValueChange={setDateRangeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            className="inline-flex items-center"
            onClick={onExport}
          >
            Apply Filters
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-neutral-500">
        <p>Note: All exported data is anonymized to protect tenant privacy. Individual names and apartment numbers are removed.</p>
      </div>
    </div>
  );
};

export default DataExport;
