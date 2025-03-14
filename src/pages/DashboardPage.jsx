import {Users, ArrowBigUp, ArrowBigDown, MapPinned} from 'lucide-react';
import {motion} from 'framer-motion';
import eraWidget from '@eohjsc/era-widget';
import {useEffect, useState, useRef} from 'react';
import Header from '../components/common/Header';
import SpeedometerComponent from '../components/speedometer/SpeedometerComponent';
import StatCard from '../components/common/StatCard';
import StatCardCustom from '../components/common/StatCardCustom';
import StorageChart from '../components/storagechart/StorageChart';
import ThermalCpu from '../components/thermalcpu/ThermalCpu';
import UsageCpu from '../components/UsageCpu/UsageCpu';
import NetworkSpeed from '../components/networkspeed/NetworkSpeed';
import PeoplePresentChart from '../components/people_present_chart/PeoplePresentChart';

import MapComponent from '../components/map/MapComponent';
import GetOnOffChart from '../components/overview/GetOnOffChart';
import LocationDisplay from '../components/locationdisplay/LocationDisplay';
import CapturePhoto from '../components/capturephoto/CapurePhoto';

const DashBoardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    peopleGetOn: 4,
    peopleGetOff: 2,
    peoplePresent: 0,
    latitude: 10.784239,
    longitude: 106.6403606,
    speed: 45,
    totalGb: 238.68,
    usedGb: 38.68,
    freeGb: 200,
    cpuUsage: 20,
    isStorageFull: false,
    cpuTemp: 36,
    gpsStatus: null,
    uploadSpeed: 0,
  });

  const dataIds = useRef({});

  useEffect(() => {
    eraWidget.init({
      needRealtimeConfigs: true,
      maxRealtimeConfigsCount: 14,
      onConfiguration: config => {
        dataIds.current = {
          latitudeId: config.realtime_configs[0],
          longitudeId: config.realtime_configs[1],
          speedId: config.realtime_configs[2],
          peopleGetOnId: config.realtime_configs[3],
          peopleGetOffId: config.realtime_configs[4],
          totalGbId: config.realtime_configs[5],
          usedGbId: config.realtime_configs[6],
          freeGbId: config.realtime_configs[7],
          cpuUsageId: config.realtime_configs[8],
          isStorageFullId: config.realtime_configs[9],
          cpuTempId: config.realtime_configs[10],
          gpsStatusId: config.realtime_configs[11],
          peoplePresentId: config.realtime_configs[12],
          uploadSpeedId: config.realtime_configs[13],
        };
      },
      onValues: values => {
        setDashboardData(prev => ({
          ...prev,
          peopleGetOn: values[dataIds.current.peopleGetOnId?.id]?.value || 0,
          peopleGetOff: values[dataIds.current.peopleGetOffId?.id]?.value || 0,
          speed: values[dataIds.current.speedId?.id]?.value || 0,
          latitude:
            values[dataIds.current.latitudeId?.id]?.value || prev.latitude,
          longitude:
            values[dataIds.current.longitudeId?.id]?.value || prev.longitude,
          totalGb: values[dataIds.current.totalGbId?.id]?.value || 0,
          usedGb: values[dataIds.current.usedGbId?.id]?.value || 0,
          freeGb: values[dataIds.current.freeGbId?.id]?.value || 0,
          cpuUsage: values[dataIds.current.cpuUsageId?.id]?.value || 0,
          isStorageFull: values[dataIds.current.isStorageFullId?.id] || false,
          cpuTemp: values[dataIds.current.cpuTempId?.id]?.value || 0,
          gpsStatus: values[dataIds.current.gpsStatusId?.id] || null,
          peoplePresent:
            values[dataIds.current.peoplePresentId?.id]?.value || 0,
          uploadSpeed: values[dataIds.current.uploadSpeedId?.id]?.value || 0,
        }));
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
          transition={{duration: 0.5}}>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <StatCard
                name="Get On"
                icon={ArrowBigUp}
                value={dashboardData.peopleGetOn}
                color="#6EE7B7"
              />
              <StatCard
                name="Get Off"
                icon={ArrowBigDown}
                value={dashboardData.peopleGetOff}
                color="#FACC15"
              />
            </div>
            <StatCardCustom
              name="Student Presence Count"
              icon={Users}
              value={dashboardData.peoplePresent}
              color="#EC4899"
            />
          </div>
          <div className="grid grid-rows-[1fr_0.8fr] gap-5">
            <GetOnOffChart
              peopleGetOn={dashboardData.peopleGetOn}
              peopleGetOff={dashboardData.peopleGetOff}
            />
            <PeoplePresentChart peoplePresent={dashboardData.peoplePresent} />
          </div>
          <CapturePhoto peoplePresent={dashboardData.peoplePresent} />
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LocationDisplay
                name="GPS Location"
                icon={MapPinned}
                value={{
                  latitude: dashboardData.latitude,
                  longitude: dashboardData.longitude,
                  gpsStatus: dashboardData.gpsStatus,
                }}
                color="#60a5fa"
              />
              <SpeedometerComponent speed={dashboardData.speed} />
            </div>
            <MapComponent
              latitude={dashboardData.latitude}
              longitude={dashboardData.longitude}
              speed={dashboardData.speed}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <div className="grid grid-cols-3 gap-5">
            <StorageChart
              totalGb={dashboardData.totalGb}
              usedGb={dashboardData.usedGb}
              freeGb={dashboardData.freeGb}
            />
            <div className="grid grid-rows-2 gap-5">
              <ThermalCpu cpuTemp={dashboardData.cpuTemp} />
              <UsageCpu cpuUsage={dashboardData.cpuUsage} />
            </div>
            <NetworkSpeed speed={dashboardData.uploadSpeed} />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashBoardPage;
