import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Lock, Mail, AlarmClock} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [timing, setTiming] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8001/ws/alert/');

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.message === 'ALERT') {
        setAlertMsg('🛑 CẢNH BÁO: Có người bị bỏ quên trên xe!');
      }
    };

    ws.onerror = e => {
      console.error('WebSocket error:', e);
    };

    return () => ws.close();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8080/users/login/', {
        username: email,
        password: password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/template_intelschoolbus/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTiming = async () => {
    if (!timing) return;

    try {
      await axios.post('http://127.0.0.1:8080/busdata/start-timing-alert/', {
        timing: parseInt(timing),
      });
      setAlertMsg('⏱ Đã bắt đầu hẹn giờ cảnh báo!');
    } catch (err) {
      console.error('Timing API Error:', err);
      setError('Không thể gửi thời gian đến máy chủ.');
    }
  };

  return (
    <div className="flex items-center max-w-full min-h-screen bg-gray-950 pl-12">
      <div className="w-full max-w-lg p-8 max-w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 relative">
        {/* Tiêu đề trang */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Đăng Nhập Hệ Thống
        </h2>

        {/* Hiển thị thông báo cảnh báo nếu có */}
        {alertMsg && (
          <p className="text-yellow-400 text-center text-sm mb-6">{alertMsg}</p>
        )}

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-6">{error}</p>
        )}

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trường Email */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full py-3 px-4 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-lg"
                type="text"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Trường Mật khẩu */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full py-3 px-4 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-lg"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center text-lg"
            disabled={loading}>
            {loading ? (
              <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </form>

        {/* Phần thiết lập thời gian cảnh báo */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Thiết Lập Cảnh Báo
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">
                Thời gian (giây)
              </label>
              <div className="relative">
                <AlarmClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={timing}
                  onChange={e => setTiming(e.target.value)}
                  className="w-full py-3 px-4 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-lg"
                  placeholder="Nhập số phút"
                />
              </div>
            </div>
            <button
              onClick={handleStartTiming}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition focus:outline-none text-lg">
              Bắt Đầu Cảnh Báo
            </button>
            <button
              onClick={() => setAlertMsg('')}
              className="w-full bg-green-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition focus:outline-none text-lg">
              Tắt Cảnh Báo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
