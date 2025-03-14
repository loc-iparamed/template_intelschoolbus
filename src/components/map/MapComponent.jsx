import {useEffect, useRef} from 'react';
import L from 'leaflet';
import {motion} from 'framer-motion';
import {Locate, RotateCw} from 'lucide-react';

const MapComponent = ({latitude, longitude, zoom = 17, speed}) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const pathRef = useRef([]);
  const polylineRef = useRef(null);

  const busIcon = L.icon({
    iconUrl: '/template_intelschoolbus/school-bus-marker.svg',
    iconSize: [70, 70],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });

  useEffect(() => {
    const savedPath = JSON.parse(localStorage.getItem('busPath'));
    if (savedPath) {
      pathRef.current = savedPath;
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    if (latitude !== 0 && longitude !== 0) {
      if (
        pathRef.current.length === 0 ||
        latitude !== pathRef.current[pathRef.current.length - 1][0] ||
        longitude !== pathRef.current[pathRef.current.length - 1][1]
      ) {
        pathRef.current.push([latitude, longitude]);
        localStorage.setItem('busPath', JSON.stringify(pathRef.current));
      }

      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude], {icon: busIcon})
          .addTo(mapRef.current)
          .bindPopup(`<b>Bus Location</b><br>Speed: ${speed.toFixed(0)} km/h`);
      }

      if (polylineRef.current) {
        polylineRef.current.setLatLngs(pathRef.current);
      } else {
        polylineRef.current = L.polyline(pathRef.current, {
          color: 'blue',
          weight: 5,
          opacity: 0.7,
        }).addTo(mapRef.current);
      }

      mapRef.current.setView([latitude, longitude], zoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  const clearPath = () => {
    localStorage.removeItem('busPath');
    pathRef.current = [];
    if (polylineRef.current) {
      mapRef.current.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }
  };

  const focusCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], zoom, {animate: true});
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700 w-full h-full"
      initial={{opacity: 0, y: 20}}
      whileHover={{y: -5, boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.5)'}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-medium text-gray-100">Live Bus Map</h2>
        <div className="flex space-x-2 items-center">
          <button
            onClick={focusCurrentLocation}
            className="bg-blue-700 text-white h-10 w-10 flex items-center justify-center rounded-lg hover:bg-blue-400 transition">
            <Locate size={20} />
          </button>
          <button
            onClick={clearPath}
            className="bg-red-700 text-white h-10 w-10 flex items-center justify-center rounded-lg hover:bg-red-400 transition">
            <RotateCw size={20} />
          </button>
        </div>
      </div>
      <div
        id="map"
        className="w-full h-[400px] rounded-lg shadow-md border border-gray-600"
      />
    </motion.div>
  );
};

export default MapComponent;
