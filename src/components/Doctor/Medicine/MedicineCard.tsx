import {
  IconCurrencyRupee,
  IconMedicineSyrup,
  IconPill,
  IconPills,
  IconStack2,
  IconVaccine,
} from '@tabler/icons-react';

const MedicineCard = ({
  name,
  dosage,
  manufacturer,
  stock,
  category,
  type,
  unitPrice,
}: any) => {
  return (
    <div className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2">
      <div className="flex items-center text-xs gap-2">
        <IconPill
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>
          {name} <span className="text-gray-500">({manufacturer})</span>
        </div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconPills
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{dosage}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconStack2
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>Stock: {stock}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconMedicineSyrup
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{category}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconVaccine
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{type}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconCurrencyRupee
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>Price: {unitPrice}</div>
      </div>
    </div>
  );
};

export default MedicineCard;
