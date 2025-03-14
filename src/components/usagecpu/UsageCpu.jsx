import ProgressBar from '@ramonak/react-progress-bar';
import {motion} from 'framer-motion';

const UsageCpu = ({cpuUsage}) => {
  const getTempColor = usage => {
    if (usage < 50) return '#0866ff';
    if (usage < 80) return '#FACC15';
    return '#EF4444';
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-700 flex flex-col justify-between"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1, duration: 0.1}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}>
      <h2 className="text-2xl font-medium text-gray-200 mt-2">CPU Usage</h2>

      <p className="text-6xl font-bold text-gray-100 text-center ">
        {cpuUsage}%
      </p>

      <div className="mt-auto px-5 py-3">
        <ProgressBar
          completed={cpuUsage}
          maxCompleted={100}
          bgColor={getTempColor(cpuUsage)}
          baseBgColor="#374151"
          height="40px"
          width="100%"
          labelAlignment="right"
          labelColor="#ffffff"
          customLabel={`${cpuUsage}%`}
        />
      </div>
    </motion.div>
  );
};

export default UsageCpu;
