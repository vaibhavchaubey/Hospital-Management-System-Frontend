import { Button } from '@mantine/core';
import {
  IconClock,
  IconMedicineSyrup,
  IconNote,
  IconQuestionMark,
  IconUserHeart,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../Utility/DateUtility';

const ReportCard = ({
  id,
  appointmentId,
  doctorName,
  notes,
  createdAt,
  diagnosis,
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
        <IconQuestionMark
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{diagnosis}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconClock
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{formatDate(createdAt)}</div>
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

export default ReportCard;
