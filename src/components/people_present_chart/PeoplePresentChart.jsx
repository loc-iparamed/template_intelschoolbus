import {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {motion} from 'framer-motion';

const PeoplePresentChart = ({peoplePresent}) => {
  const [series, setSeries] = useState([{data: []}]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const vnTime = new Date(now.getTime() + 0 * 60 * 60 * 1000);
      setSeries(prevSeries => [
        {
          data: [
            ...prevSeries[0].data.slice(-19),
            {x: vnTime, y: peoplePresent},
          ],
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [peoplePresent]);

  const options = {
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {speed: 800},
      },
      toolbar: {show: false},
      zoom: {enabled: false},
      background: 'transparent',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {colors: '#E5E7EB', fontSize: '14px'},
        formatter: value => {
          return new Date(value).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
        },
      },
      min: new Date().getTime() - 5000,
      max: new Date().getTime(),
    },

    yaxis: {
      labels: {
        style: {
          colors: '#E5E7EB',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        formatter: value => `${Math.round(value)}`,
      },
      tickAmount: 5,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#5dd0fd'],
    },
    markers: {
      size: 2,
      colors: ['gray'],
      strokeColors: 'white',
      strokeWidth: 3,
      shape: 'circle',
      animate: {
        enabled: true,
        speed: 400,
      },
    },
    grid: {
      borderColor: 'gray',
    },
    theme: {
      mode: 'dark',
    },
  };

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
      <h2 className="text-2xl font-medium text-gray-100">People Present</h2>
      <div className="h-40 mb-7">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={200}
        />
      </div>
    </motion.div>
  );
};

export default PeoplePresentChart;
