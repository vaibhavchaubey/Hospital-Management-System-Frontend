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
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getPatient,
  updatePatient,
} from '../../../Service/PatientProfileService';
import type { User } from '../../../types';
import { formatDate } from '../../../Utility/DateUtility';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import { arrayToCSV } from '../../../Utility/OtherUtility';
import { bloodGroup, bloodGroups } from '../../Data/DropdownData';
import DropzoneButton from '../../Utility/Dropzone/DropzoneButton';
import useProtectedImage from '../../Utility/Dropzone/useProtectedImage';

const Profile = () => {
  const user: User = useSelector((state: any) => state.user);
  console.log('USER ', user);

  const [opened, { open, close }] = useDisclosure(false);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    getPatient(user.profileId)
      .then((data: any) => {
        console.log(data);
        setProfile({
          ...data,
          allergies: data.allergies ? JSON.parse(data.allergies) : null,
          chronicDisease: data.chronicDisease
            ? JSON.parse(data.chronicDisease)
            : null,
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
      aadharNo: '',
      bloodGroup: '',
      allergies: [],
      chronicDisease: [],
    },

    validate: {
      dob: (value) => (!value ? 'Date of Birth is required' : undefined),
      phone: (value) => (!value ? 'Phone number is required' : undefined),
      address: (value) => (!value ? 'Address is required' : undefined),
      aadharNo: (value) => (!value ? 'Aadhar number is required' : undefined),
    },
  });

  const handleEdit = () => {
    /* JSON.parse as allergies and chronicDisease are arrays of strings and need to be converted to array */
    form.setValues({
      ...profile,
      dob: profile.dob ? new Date(profile.dob) : undefined,
      // chronicDisease: profile.chronicDisease ?? [],
      // allergies: profile.allergies ?? [],

      chronicDisease: profile.chronicDisease ?? [],
      allergies: profile.allergies ?? [],
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
      const data = await updatePatient({
        ...profile,
        ...values,
        allergies: values.allergies ? JSON.stringify(values.allergies) : null,
        chronicDisease: values.chronicDisease
          ? JSON.stringify(values.chronicDisease)
          : null,
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

  const url = useProtectedImage(profile.profilePictureId);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar variant="filled" src={url} size={150} alt="it's me" />

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
            <div className="text-3xl font-medium text-neutral-900 capitalize">
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
            <Table.Tr className="[&>tr]:!mb-3 [&_td]:!w-1/2">
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
              <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    {...form.getInputProps('aadharNo')}
                    placeholder="Aadhar number"
                    hideControls
                    maxLength={12}
                    clampBehavior="strict"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.aadharNo ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <Select
                    {...form.getInputProps('bloodGroup')}
                    placeholder="Blood group"
                    data={bloodGroups}
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {bloodGroup[profile.bloodGroup] ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <TagsInput
                    {...form.getInputProps('allergies')}
                    placeholder="Allergies separated by commas"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {arrayToCSV(profile.allergies) ?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Chronic Disease
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <TagsInput
                    {...form.getInputProps('chronicDisease')}
                    placeholder="Chronic Diseases separated by commas"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {arrayToCSV(profile.chronicDisease) ?? '-'}
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
