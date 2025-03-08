import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gray-900 opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('/images/hero-desk.jpg')" }}>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">Transform Your Workspace</h1>
            <p className="text-xl text-white mb-8">
              Elevate your work experience with our premium standing desks, 
              designed for comfort, productivity, and well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/tables" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center">
                Explore Tables
              </a>
              <a href="/contact" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block text-center">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Mesza?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our standing desks combine innovative design, premium materials, and advanced technology to deliver an unparalleled workspace experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10-Year Warranty</h3>
              <p className="text-gray-600">We stand behind our products with an industry-leading warranty. Quality you can trust for years to come.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Whisper-Quiet Motors</h3>
              <p className="text-gray-600">Our advanced dual-motor technology operates silently, ensuring a distraction-free environment.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customizable Settings</h3>
              <p className="text-gray-600">Save your preferred heights with our programmable memory settings for effortless transitions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Our Best Sellers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-64 relative bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mesza Pro</h3>
                <p className="text-gray-600 mb-4">Our flagship standing desk with premium features and construction.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">$699</span>
                  <a href="/tables" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">View Details</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-64 relative bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mesza Air</h3>
                <p className="text-gray-600 mb-4">Sleek, lightweight design with the same powerful functionality.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">$599</span>
                  <a href="/tables" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">View Details</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-64 relative bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mesza Compact</h3>
                <p className="text-gray-600 mb-4">Perfect for smaller spaces without compromising on quality.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">$499</span>
                  <a href="/tables" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">View Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">Graphic Designer</p>
                </div>
              </div>
              <p className="text-gray-700">"I've been using my Mesza Pro for 6 months now, and it has completely transformed my workflow. The smooth transitions and programmable heights make it so easy to switch between sitting and standing."</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-gray-600">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-700">"The build quality of my Mesza Air is exceptional. I appreciate the attention to detail in the design and the intuitive controls. It's been a great addition to my home office setup."</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-bold">Emily Rodriguez</h4>
                  <p className="text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-700">"I was hesitant about investing in a standing desk, but my Mesza Compact has proven to be worth every penny. The customer service was excellent, and the desk itself exceeds my expectations."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Workspace?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Join thousands of satisfied customers who have improved their work experience with Mesza standing desks.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/tables" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block">
              Browse Tables
            </a>
            <a href="/contact" className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
