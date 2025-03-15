import {useRoutes} from 'react-router-dom';
// import Sidebar from './components/common/Sidebar';
import 'leaflet/dist/leaflet.css';
import DashBoardPage from './pages/DashboardPage';
import PresentsPage from './pages/ViewPage';
import UsersPage from './pages/UsersPage';
import PeoplePresentChart from './components/people_present_chart/PeoplePresentChart';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

const routes = [
  {path: '/', element: <DashBoardPage />},
  {path: '/presents', element: <PresentsPage />},
  {path: '/users', element: <UsersPage />},
  {path: '/sales', element: <PeoplePresentChart />},
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
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-95" />
        <div className="absolute inset-0 backdrop-blur-lg bg-[radial-gradient(circle_at_top_left,#38BDF8_0%,#1E293B_70%)] opacity-80" />
      </div>
      {/* <Sidebar /> */}
      {routing}
    </div>
  );
}

export default App;
