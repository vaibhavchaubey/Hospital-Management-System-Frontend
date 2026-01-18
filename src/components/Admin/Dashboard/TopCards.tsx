import { AreaChart } from '@mantine/charts';
import { ThemeIcon } from '@mantine/core';
import {
  IconFileReport,
  IconStethoscope,
  IconUsers,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { countAllAppointments } from '../../../Service/AppointmentService';
import { addZeroMonths } from '../../../Utility/OtherUtility';
import { getRegistrationCounts } from '../../../Service/UserService';

const TopCards = () => {
  const [appointmentData, setAppointmentData] = useState<any[]>([]);
  const [patientData, setPatientData] = useState<any[]>([]);
  const [doctorData, setDoctorData] = useState<any[]>([]);

  useEffect(() => {
    countAllAppointments()
      .then((data) => {
        console.log('Appointments Data:', data);
        setAppointmentData(addZeroMonths(data, 'month', 'count'));
      })
      .catch((error) => {
        console.error('Error fetching appointment data:', error);
      });

    getRegistrationCounts()
      .then((data) => {
        console.log('Registration Counts Data:', data);
        console.log('Registration Counts Patient Data:', data.patientCounts);
        console.log('Registration Counts Doctor Data:', data.doctorCounts);
        setPatientData(addZeroMonths(data.patientCounts, 'month', 'count'));
        setDoctorData(addZeroMonths(data.doctorCounts, 'month', 'count'));
      })
      .catch((error) => {
        console.error('Error fetching registration counts:', error);
      });
  }, []);

  const getSum = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };
  const card = (
    name: string,
    id: string,
    color: string,
    bg: string,
    icon: React.ReactNode,
    data: any[],
  ) => {
    return (
      <div className={`${bg} rounded-xl`}>
        <div className="flex justify-between p-5 items-center gap-5">
          <ThemeIcon className="!shadow-xl" size="xl" radius="md" color={color}>
            {icon}
          </ThemeIcon>
          <div className="flex flex-col font-medium items-end">
            <div>{name}</div>
            <div className="text-lg">{getSum(data, id)}</div>
          </div>
        </div>
        <AreaChart
          h={100}
          data={data}
          dataKey="month"
          series={[{ name: id, color: color }]}
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

  const cards = [
    {
      name: 'Appointments',
      id: 'count',
      color: 'violet',
      bg: 'bg-violet-100',
      icon: <IconFileReport />,
      data: appointmentData,
    },
    {
      name: 'Patients',
      id: 'count',
      color: 'orange',
      bg: 'bg-orange-100',
      icon: <IconUsers />,
      data: patientData,
    },
    {
      name: 'Doctors',
      id: 'count',
      color: 'green',
      bg: 'bg-green-100',
      icon: <IconStethoscope />,
      data: doctorData,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      {cards.map((cardItem) =>
        card(
          cardItem.name,
          cardItem.id,
          cardItem.color,
          cardItem.bg,
          cardItem.icon,
          cardItem.data,
        ),
      )}
    </div>
  );
};

export default TopCards;
