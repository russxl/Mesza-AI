import React, { useState } from 'react';

interface TableProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  colors: string[];
  sizes: {
    width: number;
    depth: number;
    label: string;
  }[];
  imageUrl: string;
}

const tablesData: TableProduct[] = [
  {
    id: 'mesza-pro',
    name: 'Mesza Pro',
    price: 699,
    description: 'Our flagship standing desk with premium features and robust construction. The Mesza Pro combines cutting-edge technology with elegant design.',
    features: [
      'Dual whisper-quiet motors',
      'Programmable height presets',
      'Anti-collision technology',
      'Premium bamboo or mahogany surface',
      'Cable management tray included',
      'Load capacity: 300 lbs',
      'Height range: 23.6" to 49.2"',
    ],
    colors: ['Natural Bamboo', 'Mahogany', 'Matte Black', 'Arctic White'],
    sizes: [
      { width: 48, depth: 30, label: 'Small (48" × 30")' },
      { width: 60, depth: 30, label: 'Medium (60" × 30")' },
      { width: 72, depth: 30, label: 'Large (72" × 30")' },
    ],
    imageUrl: '/images/mesza-pro.jpg'
  },
  {
    id: 'mesza-air',
    name: 'Mesza Air',
    price: 599,
    description: 'Sleek, lightweight design with the same powerful functionality. Perfect for modern, minimalist workspaces.',
    features: [
      'Single smooth motor operation',
      'Three height presets',
      'Slim frame design',
      'Premium laminate surface',
      'Built-in cable management',
      'Load capacity: 200 lbs',
      'Height range: 27.5" to 47.5"',
    ],
    colors: ['Matte Black', 'Arctic White', 'Walnut Finish', 'Oak Finish'],
    sizes: [
      { width: 48, depth: 24, label: 'Small (48" × 24")' },
      { width: 60, depth: 24, label: 'Medium (60" × 24")' },
    ],
    imageUrl: '/images/mesza-air.jpg'
  },
  {
    id: 'mesza-compact',
    name: 'Mesza Compact',
    price: 499,
    description: 'Perfect for smaller spaces without compromising on quality. Ideal for home offices and apartments.',
    features: [
      'Space-saving design',
      'Silent motor operation',
      'Two programmable presets',
      'Durable laminate surface',
      'Simple cable management solution',
      'Load capacity: 180 lbs',
      'Height range: 28.5" to 48.5"',
    ],
    colors: ['Matte Black', 'Arctic White', 'Natural Wood'],
    sizes: [
      { width: 40, depth: 24, label: 'Studio (40" × 24")' },
      { width: 48, depth: 24, label: 'Small (48" × 24")' },
    ],
    imageUrl: '/images/mesza-compact.jpg'
  },
  {
    id: 'mesza-corner',
    name: 'Mesza Corner',
    price: 799,
    description: 'Maximize your workspace with our L-shaped corner desk. Perfect for multi-monitor setups and collaborative environments.',
    features: [
      'Triple motor system for smooth operation',
      'Four programmable height presets',
      'Enhanced stability control',
      'Premium bamboo or mahogany surface',
      'Advanced cable management system',
      'Load capacity: 350 lbs',
      'Height range: 23.6" to 49.2"',
    ],
    colors: ['Natural Bamboo', 'Mahogany', 'Matte Black', 'Arctic White'],
    sizes: [
      { width: 60, depth: 60, label: 'Standard (60" × 60")' },
      { width: 72, depth: 72, label: 'Executive (72" × 72")' },
    ],
    imageUrl: '/images/mesza-corner.jpg'
  },
];

const TablesPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<TableProduct | null>(null);
  
  const openProductModal = (product: TableProduct) => {
    setSelectedProduct(product);
  };
  
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Standing Desk Collection</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Each Mesza desk is designed with precision engineering, premium materials, and intelligent features to enhance your workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tablesData.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="h-64 relative">
                  <div className="absolute inset-0 bg-gray-200">
                    {/* Product image would go here */}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <button 
                      onClick={() => openProductModal(product)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Compare Our Desks</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  {tablesData.map(product => (
                    <th key={product.id} className="py-4 px-6 text-center">{product.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium">Starting Price</td>
                  {tablesData.map(product => (
                    <td key={product.id} className="py-4 px-6 text-center">${product.price}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Motors</td>
                  <td className="py-4 px-6 text-center">Dual</td>
                  <td className="py-4 px-6 text-center">Single</td>
                  <td className="py-4 px-6 text-center">Single</td>
                  <td className="py-4 px-6 text-center">Triple</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Maximum Load</td>
                  <td className="py-4 px-6 text-center">300 lbs</td>
                  <td className="py-4 px-6 text-center">200 lbs</td>
                  <td className="py-4 px-6 text-center">180 lbs</td>
                  <td className="py-4 px-6 text-center">350 lbs</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Height Range</td>
                  <td className="py-4 px-6 text-center">23.6" - 49.2"</td>
                  <td className="py-4 px-6 text-center">27.5" - 47.5"</td>
                  <td className="py-4 px-6 text-center">28.5" - 48.5"</td>
                  <td className="py-4 px-6 text-center">23.6" - 49.2"</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Programmable Presets</td>
                  <td className="py-4 px-6 text-center">Yes (4)</td>
                  <td className="py-4 px-6 text-center">Yes (3)</td>
                  <td className="py-4 px-6 text-center">Yes (2)</td>
                  <td className="py-4 px-6 text-center">Yes (4)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Anti-Collision</td>
                  <td className="py-4 px-6 text-center">Yes</td>
                  <td className="py-4 px-6 text-center">Yes</td>
                  <td className="py-4 px-6 text-center">No</td>
                  <td className="py-4 px-6 text-center">Yes</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Warranty</td>
                  <td className="py-4 px-6 text-center">5 Years</td>
                  <td className="py-4 px-6 text-center">5 Years</td>
                  <td className="py-4 px-6 text-center">3 Years</td>
                  <td className="py-4 px-6 text-center">5 Years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button 
                  onClick={closeProductModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-200 rounded-lg h-80 w-full">
                  {/* Product image would go here */}
                </div>
                
                <div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-blue-600">${selectedProduct.price}</span>
                    <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map(color => (
                        <span key={color} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">{color}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(size => (
                        <span key={size.label} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">{size.label}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {selectedProduct.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablesPage;
