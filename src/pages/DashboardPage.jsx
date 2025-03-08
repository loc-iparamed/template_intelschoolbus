import {
  BarChart2,
  ShoppingBag,
  Users,
  Zap,
  ArrowBigUp,
  ArrowBigDown,
} from 'lucide-react';
import {motion} from 'framer-motion';
import eraWidget from '@eohjsc/era-widget';
import {useEffect, useState} from 'react';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import SalesOverviewChart from '../components/overview/SalesOverviewChart';
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart';
import MapComponent from '../components/map/MapComponent';
import SalesChannelChart from '../components/overview/SalesChannelChart';

const DashBoardPage = () => {
  const [peopleGetOn, setPeopleGetOn] = useState(0);
  const [peopleGetOff, setPeopleGetOff] = useState(0);
  const [peoplePresent, setPeoplePresent] = useState(0);
  const [longitude, setLongitude] = useState(105.8542);
  const [latitude, setLatitude] = useState(21.0285);
  const [speed, setSpeed] = useState(0);

  let peopleGetOnId = null;
  let peopleGetOffId = null;
  useEffect(() => {
    eraWidget.init({
      needRealtimeConfigs: true,
      needHistoryConfigs: true,
      needActions: true,
      maxRealtimeConfigsCount: 10,
      maxHistoryConfigsCount: 10,
      maxActionsCount: 10,
      minRealtimeConfigsCount: 0,
      minHistoryConfigsCount: 0,
      minActionsCount: 0,
      onConfiguration: configuration => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        peopleGetOnId = configuration.realtime_configs[0];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        peopleGetOffId = configuration.realtime_configs[1];
      },
      onValues: values => {
        if (peopleGetOnId || peopleGetOffId) {
          setPeopleGetOn(values[peopleGetOnId.id]?.value || 0);
          setPeopleGetOff(values[peopleGetOffId.id]?.value || 0);
        }
      },
    });
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="MaixCam Dashboard" />

      <main className="max-w-8xl mx-auto py-8 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-3 gap-5 mb-8"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1}}>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <StatCard
                name="Get On"
                icon={ArrowBigUp}
                value={peopleGetOn}
                color="#6366F1"
              />
              <StatCard
                name="Get Off"
                icon={ArrowBigDown}
                value={peopleGetOff}
                color="#FACC15"
              />
            </div>
            <StatCard
              name="Student Presence Count"
              icon={Users}
              value={peoplePresent}
              color="#8B5CF6"
            />
          </div>
          <SalesOverviewChart />
          <MapComponent latitude={latitude} longitude={longitude} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />

          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default DashBoardPage;
