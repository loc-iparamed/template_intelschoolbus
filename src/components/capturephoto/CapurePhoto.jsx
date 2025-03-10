import {useState, useEffect} from 'react';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import {motion} from 'framer-motion';
import {storage} from './firebaseConfig';

const CapturePhoto = ({peoplePresent}) => {
  const [photoUrl, setPhotoUrl] = useState(
    localStorage.getItem('latestPhoto') || '',
  );

  useEffect(() => {
    let interval;
    const photosRef = ref(storage, 'photos/');

    const fetchPhoto = async () => {
      try {
        const res = await listAll(photosRef);
        if (res.items.length > 0) {
          const latestPhotoRef = res.items[res.items.length - 1];
          const url = await getDownloadURL(latestPhotoRef);

          if (url !== photoUrl) {
            setPhotoUrl(url);
            localStorage.setItem('latestPhoto', url);
          }
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    if (peoplePresent > 0) {
      fetchPhoto();
      interval = setInterval(fetchPhoto, 2000);
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peoplePresent]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-3 border border-gray-700"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}>
      <h2 className="text-xl font-medium text-gray-100 mt-2 ml-2">Latest Photo</h2>
      <div className="h-96 w-full flex justify-center items-center mt-8">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Captured"
            className="max-w-xl w-full h-auto rounded-lg shadow-md object-contain mx-auto"
          />
        ) : (
          <p className="text-gray-400">No photo available</p>
        )}
      </div>
    </motion.div>
  );
};

export default CapturePhoto;
