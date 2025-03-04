import {BarChart2, ShoppingBag, Users, Zap} from 'lucide-react';
import {motion} from 'framer-motion';
import eraWidget from '@eohjsc/era-widget';
import {useEffect, useState} from 'react';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import SalesOverviewChart from '../components/overview/SalesOverviewChart';
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart';
import SalesChannelChart from '../components/overview/SalesChannelChart';

const OverviewPage = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [configLedValue, setConfigLedValue] = useState(0);

  let configLed = null;
  let totalSale = null;
  useEffect(() => {
    eraWidget.init({
      needRealtimeConfigs: true,
      needHistoryConfigs: true,
      needActions: true,
      maxRealtimeConfigsCount: 3,
      maxHistoryConfigsCount: 1,
      maxActionsCount: 2,
      minRealtimeConfigsCount: 0,
      minHistoryConfigsCount: 0,
      minActionsCount: 0,
      onConfiguration: configuration => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        configLed = configuration.realtime_configs[0];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        totalSale = configuration.realtime_configs[1];
      },
      onValues: values => {
        if (configLed || totalSale) {
          setTotalSales(values[totalSale.id]?.value || 0);
          setConfigLedValue(values[configLed.id]?.value || 0);
        }
      },
    });
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1}}>
          <StatCard
            name="Total Sales"
            icon={Zap}
            value={`$${totalSales}`}
            color="#6366F1"
          />
          <StatCard
            name="Lat"
            icon={Zap}
            value={configLedValue}
            color="#FACC15"
          />
          <StatCard
            name="New Users"
            icon={Users}
            value="1,234"
            color="#8B5CF6"
          />
          <StatCard
            name="Total Products"
            icon={ShoppingBag}
            value="567"
            color="#EC4899"
          />
          <StatCard
            name="Conversion Rate"
            icon={BarChart2}
            value="12.5%"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
