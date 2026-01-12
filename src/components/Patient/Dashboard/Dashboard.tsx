import DiseaseChart from './DiseaseChart';
import Visits from './Visits';
import Welcome from './Welcome';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <Welcome />
        <Visits />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <DiseaseChart />
      </div>
    </div>
  );
};

export default Dashboard;
