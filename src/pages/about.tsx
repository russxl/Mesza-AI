import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h1>
            <p className="text-xl text-gray-600 mb-8">
              Founded in 2018, Mesza was born from a simple idea: workspaces should adapt to people, not the other way around.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-gray-200 rounded-lg h-96 w-full">
                {/* Founder image would go here */}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Mesza, we believe that the way we work matters. Our mission is to create exceptional standing desks that enhance wellbeing and productivity in the modern workspace.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our founder, Mark Chen, spent years working in tech, experiencing firsthand the physical toll of desk work. After struggling to find a standing desk that combined quality, functionality, and design, he decided to create his own solution.
              </p>
              <p className="text-lg text-gray-700">
                Today, Mesza has grown from a small garage operation to a team of engineers, designers, and craftspeople dedicated to reimagining what a workspace can be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">
              These principles guide everything we do, from design to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Without Compromise</h3>
              <p className="text-gray-600">We use only the finest materials and components, rigorously testing each desk to ensure it meets our exacting standards.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Human-Centered Innovation</h3>
              <p className="text-gray-600">We design our products around real human needs, constantly refining and innovating to improve the user experience.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Environmental Responsibility</h3>
              <p className="text-gray-600">We're committed to sustainable practices, using eco-friendly materials and minimizing waste in our manufacturing process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind Mesza who are dedicated to transforming workspaces around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-48 w-48 mx-auto mb-6">
                {/* Team member image would go here */}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Mark Chen</h3>
              <p className="text-gray-600 mb-4">Founder & CEO</p>
              <p className="text-gray-700">Former tech executive with a passion for ergonomic design and workplace wellness.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-48 w-48 mx-auto mb-6">
                {/* Team member image would go here */}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-gray-600 mb-4">Lead Designer</p>
              <p className="text-gray-700">Award-winning industrial designer with 15 years of experience creating intuitive, functional products.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-48 w-48 mx-auto mb-6">
                {/* Team member image would go here */}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">David Martinez</h3>
              <p className="text-gray-600 mb-4">Engineering Director</p>
              <p className="text-gray-700">Mechanical engineer with extensive experience in precision manufacturing and quality control.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-48 w-48 mx-auto mb-6">
                {/* Team member image would go here */}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Lisa Wong</h3>
              <p className="text-gray-600 mb-4">Customer Experience</p>
              <p className="text-gray-700">Dedicated to ensuring every customer interaction with Mesza exceeds expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Workspace */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Workspace</h2>
              <p className="text-lg text-gray-700 mb-6">
                Located in the heart of San Francisco, our headquarters embodies our design philosophy: functional, beautiful, and human-centered.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our design studio, engineering lab, and showroom are all under one roof, fostering collaboration and enabling rapid prototyping and iteration.
              </p>
              <p className="text-lg text-gray-700">
                And yes, everyone at Mesza uses our standing desks. We're our own most demanding customers, constantly refining our products based on daily use.
              </p>
            </div>
            <div>
              <div className="bg-gray-200 rounded-lg h-96 w-full">
                {/* Office image would go here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Certifications</h2>
            <p className="text-xl text-gray-600">
              We're proud to meet and exceed industry standards for quality, safety, and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-gray-200 rounded-full h-24 w-24 mx-auto mb-4">
                {/* Certification logo would go here */}
              </div>
              <h3 className="font-bold text-gray-900">UL Certified</h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-gray-200 rounded-full h-24 w-24 mx-auto mb-4">
                {/* Certification logo would go here */}
              </div>
              <h3 className="font-bold text-gray-900">BIFMA Certified</h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-gray-200 rounded-full h-24 w-24 mx-auto mb-4">
                {/* Certification logo would go here */}
              </div>
              <h3 className="font-bold text-gray-900">FSC Certified</h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-gray-200 rounded-full h-24 w-24 mx-auto mb-4">
                {/* Certification logo would go here */}
              </div>
              <h3 className="font-bold text-gray-900">Energy Star Partner</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join the Mesza Movement</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Be part of our mission to transform workspaces around the world.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/tables" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block">
              Explore Our Products
            </a>
            <a href="/contact" className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
