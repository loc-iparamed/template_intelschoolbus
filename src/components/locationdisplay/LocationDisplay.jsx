import {motion} from 'framer-motion';

const LocationDisplay = ({name, icon: Icon, value, color}) => {
  const {latitude, longitude, gpsStatus} = value;

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-10 min-h-[500px] flex flex-col justify-between"
      whileHover={{y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'}}>
      <div className="flex items-center justify-center text-2xl font-medium text-gray-200">
        <Icon size={36} className="mr-2" style={{color}} />
        {name}
      </div>
      <div className="flex flex-col flex-grow justify-center space-y-4">
        <p className="text-3xl font-semibold text-white text-center flex justify-center items-center space-x-2">
          🌍 <span className="whitespace-nowrap">Latitude:</span>
          <span className="text-violet-400 text-4xl whitespace-nowrap">
            {latitude}
          </span>
        </p>

        <p className="text-3xl font-semibold text-white p-8 text-center flex justify-center items-center space-x-2">
          📍 <span className="whitespace-nowrap">Longitude:</span>
          <span className="text-teal-400 text-4xl whitespace-nowrap">
            {longitude}
          </span>
        </p>

        <p className="text-3xl font-semibold text-white text-center flex justify-center items-center space-x-2">
          📡 <span className="whitespace-nowrap">GPS Status:</span>
          <span className="text-orange-400 text-4xl whitespace-nowrap">
            {gpsStatus?.value === 'OK' ? 'Activate' : 'Unknown'}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default LocationDisplay;
