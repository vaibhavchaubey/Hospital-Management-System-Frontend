import { Avatar, Divider, Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import type { User } from '../../../types';

const patient = {
  dob: '1995-04-12',
  phone: '+91-9876543210',
  address: '221B Baker Street, Mumbai',
  aadharNo: '1234-5678-9012',
  bloodGroup: 'A+',
  allergies: 'Peanuts, Dust',
  chronicDisease: 'Hypertension',
};

const Profile = () => {
  const user: User = useSelector((state: any) => state.user);

  return (
    <div className="p-10">
      <div className="flex gap-5 items-center">
        <Avatar variant="filled" src="/avatar.png" size={150} alt="it's me" />
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-medium text-neutral-900">
            {user.name}
          </div>
          <div className="text-xl text-neutral-700">{user.email}</div>
        </div>
      </div>
      <Divider my="xl" />

      <div>
        <div className="text-2xl font-medium mb-5 text-neutral-900">
          Personal Information
        </div>
        <Table
          striped
          stripedColor="primary.1"
          verticalSpacing="md"
          withRowBorders={false}
        >
          <Table.Tbody>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Date of Birth
              </Table.Td>
              <Table.Td className="text-xl">{patient.dob}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Phone</Table.Td>
              <Table.Td className="text-xl">{patient.phone}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Address</Table.Td>
              <Table.Td className="text-xl">{patient.address}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
              <Table.Td className="text-xl">{patient.aadharNo}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
              <Table.Td className="text-xl">{patient.bloodGroup}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
              <Table.Td className="text-xl">{patient.allergies}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Chronic Disease
              </Table.Td>
              <Table.Td className="text-xl">{patient.chronicDisease}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
