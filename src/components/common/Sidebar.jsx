import {
  MonitorCog,
  Users,
  Cctv,
  DollarSign,
  ShoppingCart,
  Settings,
  Menu,
} from 'lucide-react';
import {useState, memo} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Link, useLocation} from 'react-router-dom';

const BASE_PATH = '/template_intelschoolbus';

const SIDEBAR_ITEMS = [
  {name: 'Dashboard', icon: MonitorCog, color: '#F59E0B', href: '/'},
  {name: 'View', icon: Cctv, color: '#6EE7B7', href: '/view'},
  {name: 'Users', icon: Users, color: '#EC4899', href: '/users'},
  {name: 'Sales', icon: DollarSign, color: '#10B981', href: '/sales'},
  {name: 'Orders', icon: ShoppingCart, color: '#F59E0B', href: '/orders'},
  {name: 'Settings', icon: Settings, color: '#6EE7B7', href: '/settings'},
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <motion.div
      className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0"
      animate={{width: isSidebarOpen ? 256 : 80}}>
      <div className="h-full bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        {/* Toggle Button */}
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit mt-6">
          <Menu size={35} />
        </motion.button>

        {/* Sidebar Items */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map(({name, icon: Icon, color, href}) => {
            const isActive = location.pathname === `${BASE_PATH}${href}`;

            return (
              <Link key={href} to={`${BASE_PATH}${href}`}>
                <motion.div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 
                    ${isActive ? 'bg-cyan-700 bg-opacity-70' : 'hover:bg-gray-700 bg-opacity-70'}`}>
                  <Icon size={25} style={{color, minWidth: '20px'}} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{opacity: 0, width: 0}}
                        animate={{opacity: 1, width: 'auto'}}
                        exit={{opacity: 0, width: 0}}
                        transition={{duration: 0.2, delay: 0.3}}>
                        {name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default memo(Sidebar);
