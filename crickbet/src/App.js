import Navbar from './components/Navbar';
import './App.css';
import PrivateComponent from './components/PrivateComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import Login from './components/Login';
import Stats from './components/Stats';
import Signup from './components/Signup';
import Home from './components/Home';
import User from './components/User';

function App() {
  const auth = localStorage.getItem("user");

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/stats" element={<Stats/>}></Route>
            <Route path="/user" element={<User name= {JSON.parse(auth).name}/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/logout" element={<h1>Logout</h1>}></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
