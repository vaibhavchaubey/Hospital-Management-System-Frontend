import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Patient/Sidebar/Sidebar';
import { useMediaQuery } from '@mantine/hooks';

const PatientDashboard = () => {
  const matches = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <div className="flex">
        {!matches && <Sidebar />}
        <div className="w-full overflow-hidden flex flex-col">
          <Header />
          {/* This is where the main content will be rendered. The Outlet component will render the matched child route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
