import {motion} from 'framer-motion';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-speedometer';

const SpeedometerComponent = ({speed}) => {
  const getMarkColor = value => {
    if (value < 40) return '#15ffbf';
    if (value < 80) return '#ddff00';
    return '#ff3200';
  };

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
      <h2 className="text-2xl font-medium text-gray-100 mb-6 p-3">
        Speedometer
      </h2>
      <div className="w-full flex justify-center">
        <Speedometer
          value={speed}
          max={110}
          accentColor="grey"
          angle={240}
          width={370}
          height={380}
          fontFamily="squada-one">
          <Background angle={360} color="#141526" opacity={0.4} />
          <Arc arcWidth={4} />
          <Needle baseOffset={40} circleRadius={20} offset={70} />
          <Progress arcWidth={10} />
          <Marks step={10} fontSize={18} lineSize={18} numbersRadius={30}>
            {mark => (
              <>
                <line
                  x1={mark.coordinates.x1}
                  y1={mark.coordinates.y1}
                  x2={mark.coordinates.x2}
                  y2={mark.coordinates.y2}
                  stroke={getMarkColor(mark.value)}
                  strokeWidth={mark.isEven ? 3 : 2}
                  strokeLinecap="round"
                />

                <text
                  {...mark.textProps}
                  fontSize={23}
                  fill={getMarkColor(mark.value)}
                  fontWeight="bold"
                  textAnchor="middle">
                  {mark.value}
                </text>
              </>
            )}
          </Marks>
          <Indicator>
            {(value, textProps) => (
              <text
                {...textProps}
                fontSize={45}
                fill="white"
                x={185}
                y={280}
                textAnchor="middle"
                fontFamily="squada-one">
                {value} km/h
              </text>
            )}
          </Indicator>
        </Speedometer>
      </div>
    </motion.div>
  );
};

export default SpeedometerComponent;
