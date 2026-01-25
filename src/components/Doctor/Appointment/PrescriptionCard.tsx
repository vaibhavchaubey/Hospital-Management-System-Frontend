import { Button } from '@mantine/core';
import {
  IconClock,
  IconMedicineSyrup,
  IconNote,
  IconUserHeart,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../Utility/DateUtility';

const PrescriptionCard = ({
  appointmentId,
  doctorName,
  notes,
  prescriptionDate,
  medicines,
  handleMedicine,
}: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/doctor/appointments/' + appointmentId)}
      className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2"
    >
      <div className="flex items-center text-xs gap-2">
        <IconUserHeart
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{doctorName}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconClock
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{formatDate(prescriptionDate)}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconMedicineSyrup
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div className="flex gap-2 items-center">
          {medicines.length}
          <Button size="compact-xs" onClick={() => handleMedicine(medicines)}>
            Viwe Meds
          </Button>
        </div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconNote
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{notes}</div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
