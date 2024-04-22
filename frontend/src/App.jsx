import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./Components/AuthProvider";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddBook from "./Pages/AddBook";
import UpdateBook from "./Pages/UpdateBook";
import DetailBook from "./Pages/DetailBook";
import Navbar from './Components/Navbar';
import { Heading } from '@chakra-ui/react'
import Auth from './Pages/Auth'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/addBook" element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            } />
            <Route path="/updateBook/:id" element={
              <PrivateRoute>
                <UpdateBook />
              </PrivateRoute>
            } />
            <Route path="/book/:id" element={<DetailBook />} />
            <Route path='/*' element={<Heading align="center">Page Not Found!</Heading>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
