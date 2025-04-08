const About = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">About TenantVoice</h2>
            <div className="h-1 w-20 bg-primary-dark mb-6"></div>
            <p className="text-neutral-600 text-lg">
              Building tenant power through collective documentation and data visualization.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h3>Our Mission</h3>
            <p>
              TenantVoice is a community-powered platform dedicated to documenting and addressing issues 
              faced by tenants in properties owned by Goldmont Realty Corp and other landlords. 
              Our mission is to create transparency, build tenant power, and advocate for safe, 
              affordable, and dignified housing for all.
            </p>
            
            <h3>About Goldmont Realty Corp</h3>
            <p>
              Goldmont Realty Corp was started in 1983 by Leon Goldenberg. Since then, the company 
              has continued to grow, and now owns and operates over 3,000 units, including over 200 
              properties in New York, New Jersey, and across the United States. 
            </p>
            <p>
              While Goldmont has expanded significantly, many tenants have reported persistent issues 
              with maintenance, harassment, unfair financial practices, and more. Our platform aims to 
              document these issues and create a public record that can be used for advocacy.
            </p>
            
            <h3>How TenantVoice Works</h3>
            <p>
              Our platform allows tenants to:
            </p>
            <ul>
              <li>Document specific issues they're experiencing with their landlord</li>
              <li>View patterns of issues across buildings and landlords</li>
              <li>Connect with resources and support for addressing housing issues</li>
              <li>Download anonymized data for research and advocacy</li>
              <li>Join with other tenants to build collective power</li>
            </ul>
            
            <h3>Privacy and Safety</h3>
            <p>
              We take tenant privacy seriously. All exported data is anonymized to protect 
              tenant identities. Contact information is only collected when tenants explicitly 
              opt to provide it, and is never shared publicly.
            </p>
            
            <h3>Get Involved</h3>
            <p>
              TenantVoice is a community project, and we welcome involvement from tenants, 
              advocates, technologists, and anyone who believes in housing justice. Here's how 
              you can contribute:
            </p>
            <ul>
              <li>Document issues in your building</li>
              <li>Share the platform with other tenants</li>
              <li>Use our data for advocacy and organizing</li>
              <li>Suggest improvements or new features</li>
            </ul>
            
            <div className="mt-8 bg-neutral-100 p-6 rounded-lg border border-neutral-200">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p>
                Have questions, suggestions, or want to get involved? Reach out to our team at:
              </p>
              <p className="font-medium">contact@tenantvoice.org</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
