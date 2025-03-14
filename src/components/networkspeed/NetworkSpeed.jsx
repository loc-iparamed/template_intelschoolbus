import {motion} from 'framer-motion';
import {Wifi} from 'lucide-react';
import Speedometer, {
  Background,
  Arc,
  Progress,
  Indicator,
} from 'react-speedometer';

const NetworkSpeed = ({speed}) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700 w-full flex flex-col items-center"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <h2 className="text-3xl font-medium text-gray-100 mb-6 p-3">
        Network Speed
      </h2>
      <div className="w-full flex justify-center relative">
        <Speedometer
          value={speed}
          max={30}
          accentColor="grey"
          angle={180}
          width={600}
          height={380}
          fontFamily="squada-one">
          <Background angle={180} color="white" opacity={0.3} />
          <Arc arcWidth={10} />
          <Progress arcWidth={15} color="#9dfa8b" />
          <Indicator>
            {(value, textProps) => (
              <text
                {...textProps}
                fontSize={70}
                fill="white"
                x={310}
                y={230}
                textAnchor="middle"
                fontFamily="squada-one">
                {value} Mbps
              </text>
            )}
          </Indicator>
        </Speedometer>
        <div className="absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Wifi size={100} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkSpeed;
