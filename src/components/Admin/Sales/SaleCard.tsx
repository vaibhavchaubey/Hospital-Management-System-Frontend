import {
  IconClock,
  IconCoinRupee,
  IconPhone,
  IconUserHeart,
} from '@tabler/icons-react';
import { formatDate } from '../../../Utility/DateUtility';

const SaleCard = ({
  buyerName,
  buyerContact,
  saleDate,
  totalAmount,
  onView,
}: any) => {
  return (
    <div
      onClick={onView}
      className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2"
    >
      <div className="flex items-center text-xs gap-2">
        <IconUserHeart
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{buyerName}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconPhone
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>+91 {buyerContact}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconCoinRupee
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{totalAmount}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconClock
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{formatDate(saleDate)}</div>
      </div>
    </div>
  );
};

export default SaleCard;
