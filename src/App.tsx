import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/index';
import TablesPage from './pages/tables';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/accessories" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Accessories Page</h1><p className="mt-4">Enhance your workspace with our thoughtfully designed accessories.</p></div>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Page Not Found</h1><p className="mt-4">Sorry, the page you're looking for doesn't exist.</p></div>} />
      </Routes>
    </Layout>
  );
}

export default App;
