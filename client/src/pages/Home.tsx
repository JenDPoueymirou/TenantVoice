import { Link } from "wouter";
import { issueCategories } from "@/lib/issue-categories";
import IssueCard from "@/components/issues/IssueCard";
import IssueClusterVisualization from "@/components/visualizations/IssueClusterVisualization";

const Home = () => {
  return (
    <>
      {/* Issue Categories */}
      <section className="py-12 bg-neutral-100">
        <div className="mx-auto px-2 sm:px-3 lg:px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold mb-2">Issue Categories</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Our platform tracks various types of landlord issues to help identify patterns and provide resources</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issueCategories.map((category) => (
              <IssueCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Issue Cluster Visualization - Added below Digital Issues and Tenant Displacement */}
      <section className="py-12 bg-white">
        <div className="mx-auto px-2 sm:px-3 lg:px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold mb-2">Issue Clusters</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore patterns and connections in tenant issues across properties
            </p>
          </div>
          <IssueClusterVisualization buildingAddress="1273 Pacific St, Brooklyn, NY 11216" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-neutral-100">
        <div className="mx-auto px-2 sm:px-3 lg:px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Document Your Experience?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Join hundreds of tenants who are creating accountability by documenting their experiences with landlords.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
