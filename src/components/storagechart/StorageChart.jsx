import {motion} from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#fc7fa0', '#5dd0fd'];

const StorageChart = ({totalGb, usedGb, freeGb}) => {
  const storageData = [
    {name: 'Used', value: usedGb},
    {name: 'Free', value: freeGb},
  ];

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-10 border border-gray-700"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      transition={{delay: 0.1}}>
      <h2 className="text-2xl font-medium mb-4 text-gray-100">Storage Usage</h2>
      <p className="text-gray-300 text-center mb-2 text-xl ">
        Total Storage:{' '}
        <span className="text-white font-semibold">{totalGb} GB</span>
      </p>
      <div className="h-80">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <PieChart>
            <Pie
              data={storageData}
              cx={'50%'}
              cy={'50%'}
              labelLine={true}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }>
              {storageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{color: '#E5E7EB'}}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StorageChart;
