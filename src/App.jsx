import {useRoutes} from 'react-router-dom';
import Sidebar from './components/common/Sidebar';

import OverviewPage from './pages/OverviewPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import SalesPage from './pages/SalesPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

const routes = [
  {path: '/', element: <OverviewPage />},
  {path: '/products', element: <ProductsPage />},
  {path: '/users', element: <UsersPage />},
  {path: '/sales', element: <SalesPage />},
  {path: '/orders', element: <OrdersPage />},
  {path: '/analytics', element: <AnalyticsPage />},
  {path: '/settings', element: <SettingsPage />},
];

function App() {
  const routing = useRoutes(
    routes.map(({path, element}) => ({
      path: `/template_intelschoolbus${path}`,
      element,
    })),
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      {routing}
    </div>
  );
}

export default App;
