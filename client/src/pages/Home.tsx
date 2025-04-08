import { Link } from "wouter";
import { issueCategories } from "@/lib/issue-categories";
import IssueCard from "@/components/issues/IssueCard";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-dark text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Document & Track Landlord Issues</h1>
            <p className="text-xl opacity-90 mb-8">A community-powered platform to report, track, and address issues with landlords - giving tenants a collective voice.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/report">
                <a className="bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                  Report an Issue
                </a>
              </Link>
              <Link href="/dashboard">
                <a className="bg-white text-primary-dark hover:bg-neutral-100 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                  View Issue Map
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Call to Action */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Document Your Experience?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
            Join hundreds of tenants who are creating accountability by documenting their experiences with landlords.
          </p>
          <Link href="/report">
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Start Reporting Issues
              <span className="material-icons ml-2">arrow_forward</span>
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
