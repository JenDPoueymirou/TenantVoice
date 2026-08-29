import { Link } from "wouter";
import { IssueCategory } from "@/lib/issue-categories";

type IssueCardProps = {
  category: IssueCategory;
};

const IssueCard = ({ category }: IssueCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className={`material-icons text-${category.iconColor} mr-3`}>{category.icon}</span>
          <h3 className="font-semibold text-lg">{category.name}</h3>
        </div>
        <p className="text-neutral-600 mb-4">{category.description}</p>
        <div className="space-y-2">
          {category.subIssues.slice(0, 3).map((subIssue) => (
            <div key={subIssue.id} className="flex items-center text-sm">
              <span className="material-icons text-neutral-400 text-xs mr-2">circle</span>
              <span>{subIssue.name}</span>
            </div>
          ))}
          {category.subIssues.length > 3 && (
            <div className="flex items-center text-sm">
              <span className="material-icons text-neutral-400 text-xs mr-2">circle</span>
              <span>More...</span>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200">
        <Link 
          href={`/report?category=${category.id}`}
          className="text-primary font-medium text-sm flex items-center"
        >
          View issues in this category
          <span className="material-icons text-sm ml-1">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export default IssueCard;
