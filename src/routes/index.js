import {Routes, Route} from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Forgot from '../pages/Forgot';

import Private from './Private';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
    </Routes>
  );
}

export default AppRoutes;

