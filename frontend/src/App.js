import { Route, Routes } from 'react-router';
import HomeNavbar from './components/HomeNavbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Admin from './pages/Admin';
import Manager from './pages/Manager';
import User from './pages/User';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/manager" element={<Manager/>} />
        <Route path="/user" element={<User/>} />
      </Routes>
    </div>
  );
}


export default App;
