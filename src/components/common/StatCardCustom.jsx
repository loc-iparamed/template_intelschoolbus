import {motion} from 'framer-motion';

const StatCardCustom = ({name, icon: Icon, value, color}) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-60 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
      whileHover={{y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'}}>
      <div className="px-4 py-5 sm:p-6 h-full flex flex-col justify-center items-center">
        <span className="flex mb-8 items-center text-2xl font-medium text-gray-200">
          <Icon size={30} className="mr-2" style={{color}} />
          {name}
        </span>
        <p className="mt-2 text-7xl font-semibold text-white text-center">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCardCustom;
