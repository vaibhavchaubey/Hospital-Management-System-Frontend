import {
  Avatar,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Table,
  TagsInput,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { User } from '../../../types';
import { bloodGroups } from '../../Data/DropdownData';

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

  const [opened, { open, close }] = useDisclosure(false);

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar
              variant="filled"
              src="/avatar.png"
              size={150}
              alt="it's me"
            />

            {editMode && (
              <Button
                size="sm"
                variant="filled"
                leftSection={<IconEdit />}
                onClick={open}
              >
                Upload
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl font-medium text-neutral-900">
              {user.name}
            </div>
            <div className="text-xl text-neutral-700">{user.email}</div>
          </div>
        </div>

        {!editMode ? (
          <Button
            size="lg"
            variant="filled"
            leftSection={<IconEdit />}
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        ) : (
          <Button size="lg" variant="filled" onClick={() => setEditMode(false)}>
            Submit
          </Button>
        )}
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
              {editMode ? (
                <Table.Td className="text-xl">
                  <DateInput placeholder="Date of birth" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{patient.dob}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Phone</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    placeholder="Phone number"
                    hideControls
                    maxLength={10}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{patient.phone}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Address</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <TextInput placeholder="Address" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{patient.address}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    placeholder="Aadhar number"
                    hideControls
                    maxLength={12}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{patient.aadharNo}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <Select placeholder="Blood group" data={bloodGroups} />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{patient.bloodGroup}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <TagsInput placeholder="Allergies separated by commas" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{patient.allergies}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Chronic Disease
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <TagsInput placeholder="Chronic Diseases separated by commas" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {patient.chronicDisease}
                </Table.Td>
              )}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={
          <span className="text-xl font-medium">Upload Profile Picture</span>
        }
      >
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Profile;
