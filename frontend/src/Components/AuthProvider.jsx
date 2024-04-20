import { createContext, useState, useEffect, useContext } from "react";
import instance from "../module/AxiosConfig";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [token, setToken] = useState(() => localStorage.getItem("token") || "");
   const navigate = useNavigate();
   const toast = useToast();

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         setToken(token);
      }
   }, []);

   const login = async (email, password) => {
      try {
         const response = await instance.post("/login", {
            email,
            password,
         });

         const token = response.data.token;
         localStorage.setItem("token", token);
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
      localStorage.removeItem("token");
      setToken("");
      navigate("/login");
   };

   return (
      <AuthContext.Provider value={{ token, login, logout }}>
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
