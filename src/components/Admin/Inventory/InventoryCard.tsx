import { Badge } from '@mantine/core';
import {
  IconMedicineSyrup,
  IconPill,
  IconPills,
  IconStack2,
  IconVaccine,
} from '@tabler/icons-react';
import { formatDate } from '../../../Utility/DateUtility';

const InventoryCard = ({
  medicineId,
  quantity,
  status,
  batchNo,
  expiryDate,
  medicineMap,
  onEdit,
}: any) => {
  return (
    <div
      onClick={onEdit}
      className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2"
    >
      <div className="flex items-center text-xs gap-2">
        <IconPill
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>
          {medicineMap[medicineId]?.name}{' '}
          <span className="text-gray-500">
            ({medicineMap[medicineId]?.manufacturer})
          </span>
        </div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconPills
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{batchNo}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconVaccine
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{formatDate(expiryDate)}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconStack2
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>Stock: {quantity}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconMedicineSyrup
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <Badge color={status === 'EXPIRED' ? 'red' : 'green'}>
          {status === 'EXPIRED' ? 'Expired' : 'Active'}
        </Badge>
      </div>
    </div>
  );
};

export default InventoryCard;
