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
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
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
import useProtectedImage from '../../Utility/Dropzone/useProtectedImage';
import DropzoneButton from '../../Utility/Dropzone/DropzoneButton';


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
      profilePictureId: '',
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

  const handleSubmit = async () => {
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
        error?.response?.data?.errorMessage || 'Update failed.',
      );
    } finally {
      setLoading(false);
    }
  };

  const url = useProtectedImage(profile.profilePictureId);
  const matches = useMediaQuery('(max-width: 768px)');

  return (
    <div className="md:p-10 p-5">
      <div className="flex lg:flex-row flex-col justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar
              variant="filled"
              src={url}
              size={matches ? 120 : 150}
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
            <div className="md:text-3xl text-xl font-medium text-neutral-900">
              {user.name}
            </div>
            <div className="md:text-xl text-lg text-neutral-700">
              {user.email}
            </div>
          </div>
        </div>

        {!editMode ? (
          <Button
            size={matches ? 'sm' : 'lg'}
            variant="filled"
            type="button"
            leftSection={<IconEdit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <Button
            size={matches ? 'sm' : 'lg'}
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
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                Date of Birth
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
                  <DateInput
                    {...form.getInputProps('dob')}
                    placeholder="Date of birth"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="md:text-xl text-lg">
                  {formatDate(profile.dob) ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                Phone
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
                  <NumberInput
                    {...form.getInputProps('phone')}
                    placeholder="Phone number"
                    hideControls
                    maxLength={10}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="md:text-xl text-lg">
                  {profile.phone ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                Address
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
                  <TextInput
                    {...form.getInputProps('address')}
                    placeholder="Address"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="md:text-xl text-lg">
                  {profile.address ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                License No
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
                  <TextInput
                    {...form.getInputProps('licenseNo')}
                    placeholder="License number"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="md:text-xl text-lg">
                  {profile.licenseNo ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                Specialization
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
                  <Select
                    {...form.getInputProps('specialization')}
                    placeholder="Specialization"
                    data={doctorSpecializations}
                  />
                </Table.Td>
              ) : (
                <Table.Td className="md:text-xl text-lg">
                  {profile.specialization ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                Dapartment
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
                  <Select
                    {...form.getInputProps('department')}
                    placeholder="Dapartment"
                    data={doctorDepartments}
                  />
                </Table.Td>
              ) : (
                <Table.Td className="md:text-xl text-lg">
                  {profile.department ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="md:font-semibold md:text-xl font-medium text-lg">
                Total Experience
              </Table.Td>
              {editMode ? (
                <Table.Td className="md:text-xl text-lg">
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
                <Table.Td className="md:text-xl text-lg">
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
        <DropzoneButton close={close} form={form} id="profilePictureId" />
      </Modal>
    </div>
  );
};

export default Profile;
