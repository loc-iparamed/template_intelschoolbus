import {motion} from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#6EE7B7', '#FACC15'];

const GetOnOffChart = ({peopleGetOn, peopleGetOff}) => {
  const GET_ON_OFF_DATA = [
    {name: 'Get On', value: peopleGetOn ?? 0},
    {name: 'Get Off', value: peopleGetOff ?? 0},
  ];

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-3 border border-gray-700"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1, duration: 0.1}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}>
      <h2 className="text-xl font-medium text-gray-200">Get On Off</h2>
      <div className="h-40 mt-9 ml-[-30px] mr-5">
        <ResponsiveContainer >
          <BarChart data={GET_ON_OFF_DATA} barCategoryGap={10}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(75, 85, 99, 0.6)"
            />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{color: '#E5E7EB'}}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={220}>
              {GET_ON_OFF_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GetOnOffChart;
