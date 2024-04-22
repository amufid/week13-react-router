import { createContext, useState, useContext } from "react";
import instance from "../module/AxiosConfig";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import Cookies from 'js-cookie';

const AuthContext = createContext();
export function AuthProvider({ children }) {
   const [token, setToken] = useState(() => Cookies.get('token') || '');
   const navigate = useNavigate();
   const toast = useToast();

   const login = async (email, password) => {
      try {
         const response = await instance.post("/login", {
            email,
            password,
         });

         const token = response.data.token;
         // localStorage.setItem("token", token);
         // simpan token di cookies 
         Cookies.set('token', token, {
            expires: 7,
            secure: true,
         });

         setToken(token);
         navigate("/");
         toast({
            title: 'Success',
            description: 'Login successful',
            position: 'top',
            status: 'success',
            duration: 5000,
            isClosable: true,
         })
      } catch (error) {
         console.log(error)
         toast({
            title: 'Error',
            description: 'Email or password is incorrect',
            position: 'top',
            status: 'error',
            duration: 5000,
            isClosable: true,
         })
      }
   };

   const logout = () => {
      // localStorage.removeItem("token");
      // Hapus token dari cookies
      Cookies.remove('token');
      setToken("");
      navigate("/login");
   };

   return (
      <AuthContext.Provider value={{ login, token, logout }}>
         {children}
      </AuthContext.Provider>
   );
}

// Validasi prop yang diterima oleh komponen AuthProvider
AuthProvider.propTypes = {
   children: PropTypes.node.isRequired,
};

// Mengirim value dan function 
export const useAuth = () => {
   return useContext(AuthContext);
};
