import { AreaChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { countAppointmentsByDoctor } from '../../../Service/AppointmentService';
import { useSelector } from 'react-redux';
import type { User } from '../../../types';
import { addZeroMonths } from '../../../Utility/OtherUtility';

const Metrics = () => {
  const user: User = useSelector((state: any) => state.user);

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    countAppointmentsByDoctor(user.profileId)
      .then((data) => {
        setAppointments(addZeroMonths(data, 'month', 'count'));
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const getSum = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  return (
    <div className="bg-violet-50 rounded-xl border ">
      <div className="flex justify-between items-center p-5">
        <div>
          <div className="font-semibold">Appointments</div>
          <div className="text-xs text-gray-500">
            {new Date().getFullYear()}
          </div>
        </div>
        <div className="text-2xl font-bold text-violet-500">
          {getSum(appointments, 'count')}+
        </div>
      </div>

      <AreaChart
        h={100}
        data={appointments}
        dataKey="month"
        series={[{ name: 'count', color: 'violet' }]}
        strokeWidth={5}
        withGradient
        fillOpacity={0.7}
        curveType="bump"
        tickLine="none"
        gridAxis="none"
        withXAxis={false}
        withYAxis={false}
        withDots={false}
      />
    </div>
  );
};

export default Metrics;
