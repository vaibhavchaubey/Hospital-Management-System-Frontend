import { Avatar, Divider } from '@mantine/core';
import { bloodGroupMap } from '../../Data/DropdownData';
import {
  IconBriefcase,
  IconLicense,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';

interface DoctorCardProps {
  id: number;
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  licenseNo: string;
  specialization: string;
  department: string;
  totalExp: number;
}

const DoctorCard = ({
  id,
  name,
  email,
  dob,
  phone,
  address,
  licenseNo,
  specialization,
  department,
  totalExp,
}: DoctorCardProps) => {
  return (
    <div className="border border-gray-200 p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2">
      <div className="flex items-center gap-3">
        <Avatar size="lg" name={name} color="initials" variant="filled" />
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-xs text-gray-500">
            {specialization} &bull; {department}
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
        <IconBriefcase
          size={24}
          className="text-primary-700 bg-primary-100 p-1 rounded-full"
        />
        <div>{totalExp} years</div>
      </div>
    </div>
  );
};

export default DoctorCard;

// {
//     "id": 1,
//     "name": "vaibhavdr",
//     "email": "vaibhavdr@gmail.com",
//     "dob": "2002-08-08",
//     "phone": "9849383938",
//     "address": "India",
//     "licenseNo": "VC09P",
//     "specialization": "Cardiology",
//     "department": "Cardiology",
//     "totalExp": 5
// }
