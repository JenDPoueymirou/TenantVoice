import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getIssueCategoryDetails } from "@/lib/issue-categories";

type CategoryData = {
  [key: string]: number;
};

type IssuesByCategoryChartProps = {
  data: CategoryData | undefined;
};

const IssuesByCategoryChart = ({ data }: IssuesByCategoryChartProps) => {
  // Transform category data for the chart
  const chartData = data
    ? Object.entries(data).map(([category, count]) => {
        const categoryDetails = getIssueCategoryDetails(category);
        return {
          category: categoryDetails?.name || category,
          categoryId: category,
          count,
        };
      })
    : [];

  // Category colors mapping
  const categoryColors: { [key: string]: string } = {
    repairs: "#1976D2", // primary-light
    harassment: "#F44336", // status-error
    rental_agreements: "#1565C0", // primary-dark
    financial: "#F57C00", // secondary
    digital: "#2196F3", // primary-light
    displacement: "#FF9800", // status-warning
  };

  // Handle CSV download
  const handleDownloadCSV = () => {
    if (!data) return;
    
    // Create CSV content
    const csvContent = [
      "Category,Count",
      ...Object.entries(data).map(([category, count]) => {
        const categoryDetails = getIssueCategoryDetails(category);
        return `"${categoryDetails?.name || category}",${count}`;
      }),
    ].join("\n");
    
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "issues-by-category.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Issues by Category</h3>
        <div>
          <button 
            className="text-neutral-500 hover:text-neutral-700 p-1" 
            title="Download as CSV"
            onClick={handleDownloadCSV}
          >
            <span className="material-icons text-sm">file_download</span>
          </button>
        </div>
      </div>
      
      {!data ? (
        <div className="h-48 flex items-center justify-center">
          <span className="material-icons animate-spin mr-2">autorenew</span>
          <span>Loading data...</span>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-48 flex items-center justify-center">
          <span className="text-neutral-500">No data available</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 30, left: 5 }}>
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 10 }} 
              tickLine={false}
              axisLine={{ stroke: '#E4E7EB' }}
              interval={0}
              angle={-45} 
              textAnchor="end"
            />
            <YAxis 
              hide={true}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} issues`, 'Count']}
              contentStyle={{ 
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '1px solid #E4E7EB'
              }}
            />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
              barSize={28}
              // Use different colors for each category
              fill={(entry) => categoryColors[entry.categoryId] || "#1565C0"}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IssuesByCategoryChart;
