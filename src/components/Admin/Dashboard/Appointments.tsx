import { ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getTodaysAppointments } from '../../../Service/AppointmentService';
import { extractTimeIn12HourFormat } from '../../../Utility/DateUtility';

const Appointments = () => {
  const [todayAppointment, setTodayAppointment] = useState<any[]>([]);

  useEffect(() => {
    getTodaysAppointments()
      .then((res: any) => {
        console.log('Today Appointments Data:', res);
        setTodayAppointment(res);
      })
      .catch((error: any) => {
        console.error('Error fetching today appointments:', error);
      });
  }, []);

  const card = (app: any) => {
    return (
      <div
        className="p-3 mb-3 rounded-xl justify-between border-l-4 border-violet-500 shadow-md flex bg-violet-100"
        key={app.id}
      >
        <div>
          <div className="font-semibold text-sm">{app.patientName}</div>
          <div className="text-xs text-gray-500">Dr. {app.doctorName}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">
            {extractTimeIn12HourFormat(app.appointmentTime)}
          </div>
          <div className="text-xs text-gray-500">{app.reason}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 border rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
      <div className="text-xl font-semibold">Today's Appointments</div>
      <div>
        <ScrollArea.Autosize mah={300} mx="auto">
          {todayAppointment.map((app) => card(app))}
        </ScrollArea.Autosize>
      </div>
    </div>
  );
};

export default Appointments;
