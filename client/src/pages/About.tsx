import React from 'react';

const About = () => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto px-2 sm:px-3 lg:px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">About TenantVoice</h1>
          
          <div className="space-y-6">
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p>
                We aim to give tenants tools to document issues with their buildings and share this information with others,
                helping to create transparency and accountability in the rental housing market. By collecting and visualizing 
                data about landlord practices, we help identify patterns that might otherwise go unnoticed.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">What We Do</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide a secure platform for tenants to document building issues and violations</li>
                <li>Create visual representations of collected data to identify patterns</li>
                <li>Offer resources to help tenants understand their rights</li>
                <li>Connect tenants with similar experiences to build community power</li>
                <li>Generate reports that can be used for advocacy and organizing</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Our Focus</h2>
              <p>
                TenantVoice focuses on properties owned by Goldmont, a company that started in 1983 and now owns and operates 
                over 3,000 units across more than 200 properties in New York, New Jersey, and other states. We're starting with 
                a focus on one building but designed to scale to all Goldmont properties.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">How You Can Help</h2>
              <p>
                Your participation makes this platform stronger. By sharing your experiences, you help other tenants 
                avoid similar issues and contribute to a database that can help advocate for better housing conditions.
                Join us in creating a more transparent rental ecosystem where landlords are held accountable for their actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;