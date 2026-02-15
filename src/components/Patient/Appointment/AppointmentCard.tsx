import {
  IconClock,
  IconEmergencyBed,
  IconNote,
  IconProgress,
  IconUserHeart,
} from '@tabler/icons-react';
import { Tag } from 'primereact/tag';
import { formatDateWithTime } from '../../../Utility/DateUtility';

const AppointmentCard = ({
  doctorName,
  notes,
  reason,
  status,
  appointmentTime,
}: any) => {
  const getSeverity = (status: string) => {
    switch (status) {
      case 'CANCELLED':
        return 'danger';

      case 'COMPLETED':
        return 'success';

      case 'SCHEDULED':
        return 'info';

      default:
        return null;
    }
  };
  return (
    <div className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2">
      <div className="flex items-center text-xs gap-2">
        <IconUserHeart
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{doctorName}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconNote
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{notes}</div>
      </div>
      <div className="flex items-center text-xs gap-2">
        <IconEmergencyBed
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{reason}</div>
      </div>
      <div className="flex items-center text-xs gap-2">
        <IconClock
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{formatDateWithTime(appointmentTime)}</div>
      </div>
      <div className="flex items-center text-xs gap-2">
        <IconProgress
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <Tag value={status} severity={getSeverity(status)} />
      </div>
    </div>
  );
};

export default AppointmentCard;
