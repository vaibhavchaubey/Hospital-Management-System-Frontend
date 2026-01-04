import { Avatar } from '@mantine/core';
import { bloodGroupMap } from '../../Data/DropdownData';

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
        <div className="text-gray-600">License No:</div>
        <div>{licenseNo}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Specialization:</div>
        <div>{specialization}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Department:</div>
        <div>{department}</div>
      </div>
      <div className="flex justify-between items-center text-sm gap-2">
        <div className="text-gray-600">Total Experience:</div>
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
