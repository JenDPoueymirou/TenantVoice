import { Link } from "wouter";

type ResourceCardProps = {
  title: string;
  icon: string;
  description: string;
  link: string;
};

const ResourceCard = ({ title, icon, description, link }: ResourceCardProps) => {
  // Determine icon color based on the resource type
  const getIconColor = () => {
    switch (icon) {
      case 'gavel':
        return 'text-primary-dark';
      case 'account_balance':
        return 'text-secondary-dark';
      case 'groups':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="bg-neutral-100 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      <div className="flex items-center mb-4">
        <span className={`material-icons ${getIconColor()} mr-3`}>{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-neutral-600 text-sm mb-4">{description}</p>
      <Link href={link} className="text-primary font-medium text-sm flex items-center">
        {title === 'Legal Resources' 
          ? 'Access legal resources' 
          : title === 'Government Agencies' 
            ? 'View agency list' 
            : title === 'Community Resources'
              ? 'Access guides'
              : title === 'Data Tools'
              ? 'Use data tools'
              : 'Find organizations'}
        <span className="material-icons text-sm ml-1">arrow_forward</span>
      </Link>
    </div>
  );
};

export default ResourceCard;
