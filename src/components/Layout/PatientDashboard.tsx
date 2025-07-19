import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Patient/Sidebar/Sidebar';

const PatientDashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Header />
          {/* This is where the main content will be rendered. The Outlet component will render the matched child route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
