import { Avatar, Divider } from '@mantine/core';
import {
  IconCalendarHeart,
  IconMail,
  IconMapPin,
  IconPhone
} from '@tabler/icons-react';
import { bloodGroupMap } from '../../Data/DropdownData';

interface PatientCardProps {
  id: number;
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  aadharNo: string;
  bloodGroup: string;
  allergies: string;
  chronicDisease: string;
}

const PatientCard = ({
  name,
  email,
  dob,
  phone,
  address,
  bloodGroup,
}: PatientCardProps) => {
  const getAge = (dob: string) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

  return (
    <div className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2">
      <div className="flex items-center gap-3">
        <Avatar size="lg" name={name} color="initials" variant="filled" />
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-xs text-gray-500">
            {bloodGroupMap[bloodGroup]}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex items-center text-xs gap-2">
        <IconMail
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{email}</div>
      </div>

      <div className="flex items-center text-xs gap-2">
        <IconPhone
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>+91 {phone}</div>
      </div>
      <div className="flex items-center text-xs gap-2">
        <IconMapPin
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{address}</div>
      </div>
      <div className="flex items-center text-xs gap-2">
        <IconCalendarHeart
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{getAge(dob)} Years</div>
      </div>
    </div>
  );
};

export default PatientCard;

// {
//     "id": 2,
//     "name": "demo",
//     "email": "demo@gmail.com",
//     "dob": "2002-05-02",
//     "phone": "9594939499",
//     "address": "A-23",
//     "aadharNo": "993994940440",
//     "bloodGroup": "A_POSITIVE",
//     "allergies": "[\"Cold\"]",
//     "chronicDisease": "[\"temp\",\"demo\"]"
// }
