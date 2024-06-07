import axios from 'axios';
import Cookies from 'js-cookie'

// Buat instance Axios khusus
const instance = axios.create({
   baseURL: 'https://nodejs-prisma-16n8iq9hf-mufids-projects-16b66c7d.vercel.app'
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
