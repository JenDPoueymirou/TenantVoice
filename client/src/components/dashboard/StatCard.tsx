type StatCardProps = {
  title: string;
  value: number;
  icon: string;
  color: string;
  change: number;
};

const StatCard = ({ title, value, icon, color, change }: StatCardProps) => {
  // Determine the change text color based on value
  const changeColor = change > 0 ? 'text-accent' : change < 0 ? 'text-status-error' : 'text-neutral-500';
  const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '-';
  
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${color} transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-neutral-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value.toLocaleString()}</p>
        </div>
        <span className={`material-icons text-${color}`}>{icon}</span>
      </div>
      <div className="mt-4">
        <p className="text-neutral-500 text-sm">
          <span className={`${changeColor} font-medium`}>
            {changeSymbol} {Math.abs(change)}%
          </span> from last year
        </p>
      </div>
    </div>
  );
};

export default StatCard;
