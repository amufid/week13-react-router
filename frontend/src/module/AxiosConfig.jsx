import axios from 'axios';
import Cookies from 'js-cookie'

// Buat instance Axios khusus
const instance = axios.create({
   baseURL: 'http://localhost:8000/'
});

// Tambahkan interceptor request untuk memasukkan token ke header
instance.interceptors.request.use(
   (config) => {
      // Ambil token dari localStorage
      // const token = localStorage.getItem('token');
      const token = Cookies.get('token')

      // Jika token ada, tambahkan ke header Authorization
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default instance;
