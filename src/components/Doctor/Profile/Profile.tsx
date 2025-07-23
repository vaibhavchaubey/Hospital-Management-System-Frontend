import {
  Avatar,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { User } from '../../../types';
import {
  doctorDepartments,
  doctorSpecializations,
} from '../../Data/DropdownData';
import { getDoctor, updateDoctor } from '../../../Service/DoctorProfileService';
import { useForm } from '@mantine/form';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import { formatDate } from '../../../Utility/DateUtility';

const doctor = {
  dob: '1985-04-15',
  phone: '+91-9876543210',
  address: '123 Green Avenue, Sector 45, New Delhi, India',
  licenseNo: 'MEDL-56789',
  specialization: 'Cardiology',
  department: 'Cardiology',
  totalExp: 12,
};

const Profile = () => {
  const user: User = useSelector((state: any) => state.user);

  const [opened, { open, close }] = useDisclosure(false);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    getDoctor(user.profileId)
      .then((data: any) => {
        console.log(data);
        setProfile({
          ...data,
        });
      })
      .catch((error: any) => console.log(error));
  }, []);

  const form = useForm({
    initialValues: {
      dob: '',
      phone: '',
      address: '',
      licenseNo: '',
      specialization: '',
      department: '',
      totalExp: '',
    },

    validate: {
      dob: (value) => (!value ? 'Date of Birth is required' : undefined),
      phone: (value) => (!value ? 'Phone number is required' : undefined),
      address: (value) => (!value ? 'Address is required' : undefined),
      licenseNo: (value) => (!value ? 'License number is required' : undefined),
    },
  });

  const handleEdit = () => {
    /* JSON.parse as allergies and chronicDisease are arrays of strings and need to be converted to array */
    form.setValues({
      ...profile,
      dob: profile.dob ? new Date(profile.dob) : undefined,
    });
    setEditMode(true);
  };

  const handleSubmit = async (e: any) => {
    form.validate();
    if (!form.isValid()) return;
    const values = form.getValues();

    setLoading(true);
    try {
      console.log('VALUES', { ...values });
      /* JSON.stringify as allergies and chronicDisease are arrays of strings and need to be converted to string */
      const data = await updateDoctor({
        ...profile,
        ...values,
      });

      console.log('DATA', data);
      setProfile({
        ...profile,
        ...values,
      });
      setEditMode(false);
      successNotification('Profile updated successfully.');
    } catch (error: any) {
      console.log(error);
      errorNotification(
        error?.response?.data?.errorMessage || 'Update failed.'
      );
    } finally {
      setLoading(false);
    }
  };

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
            type="button"
            leftSection={<IconEdit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="lg"
            variant="filled"
            type="submit"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit}
          >
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
                  <DateInput
                    {...form.getInputProps('dob')}
                    placeholder="Date of birth"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {formatDate(profile.dob) ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Phone</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    {...form.getInputProps('phone')}
                    placeholder="Phone number"
                    hideControls
                    maxLength={10}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{profile.phone ?? '-'}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Address</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <TextInput
                    {...form.getInputProps('address')}
                    placeholder="Address"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.address ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">License No</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    {...form.getInputProps('licenseNo')}
                    placeholder="License number"
                    hideControls
                    maxLength={12}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.licenseNo ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Specialization
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <Select
                    {...form.getInputProps('specialization')}
                    placeholder="Specialization"
                    data={doctorSpecializations}
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.specialization ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Dapartment</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <Select
                    {...form.getInputProps('department')}
                    placeholder="Dapartment"
                    data={doctorDepartments}
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.department ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Total Experience
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    {...form.getInputProps('totalExp')}
                    placeholder="Total experience"
                    hideControls
                    maxLength={2}
                    max={50}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.totalExp
                    ? `${profile.totalExp} ${
                        profile.totalExp === 1 ? 'year' : 'years'
                      }`
                    : '-'}
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
