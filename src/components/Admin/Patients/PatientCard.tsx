import { Avatar } from '@mantine/core';
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
  id,
  name,
  email,
  dob,
  phone,
  address,
  aadharNo,
  bloodGroup,
  allergies,
  chronicDisease,
}: PatientCardProps) => {
  return (
    <div className="border-0 p-3 flex flex-col gap-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-3">
        <Avatar name={name} color="initials" variant="filled" />
        <div>{name}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Email:</div>
        <div>{email}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">DOB:</div>
        <div>{dob}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Phone:</div>
        <div>{phone}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Address:</div>
        <div>{address}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Blood Group:</div>
        <div>{bloodGroupMap[bloodGroup]}</div>
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
