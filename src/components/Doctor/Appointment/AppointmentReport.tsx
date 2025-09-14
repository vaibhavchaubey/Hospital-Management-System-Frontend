import {
  ActionIcon,
  Button,
  Fieldset,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { dosageFrequencies, symptoms, tests } from '../../Data/DropdownData';
import { IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { createAppointmentReport } from '../../../Service/AppointmentService';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

type Medicine = {
  name: string;
  medicineId?: number;
  dosage: string;
  frequency: string;
  duration: number;
  route: string;
  type: string;
  instructions: string;
  prescriptionId?: number;
};

const AppointmentReport = ({ appointment }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      symptoms: [] as string[],
      tests: [] as string[],
      diagnosis: '',
      refferal: '',
      notes: '',
      prescription: { medicines: [] as Medicine[] },
    },
    validate: {
      symptoms: (value) =>
        value.length > 0 ? null : 'Select at least one symptom',
      diagnosis: (value) => (value.trim() ? null : 'Diagnosis is required'),
      prescription: {
        medicines: {
          name: (value: string) =>
            value.trim() ? null : 'Medicine name is required',
          dosage: (value: string) =>
            value.trim() ? null : 'Dosage is required',
          frequency: (value: string) =>
            value.trim() ? null : 'Frequency is required',
          duration: (value: number) =>
            value > 0 ? null : 'Duration should be greater than 0',
          route: (value: string) => (value.trim() ? null : 'Route is required'),
          type: (value: string) => (value.trim() ? null : 'Type is required'),
          instructions: (value: string) =>
            value.trim() ? null : 'Instructions are required',
        },
      },
    },
  });

  const insertMeidicne = () => {
    form.insertListItem('prescription.medicines', {
      name: '',
      dosage: '',
      frequency: '',
      duration: 0,
      route: '',
      type: '',
      instructions: '',
    });
  };

  const removeMedicine = (index: number) => {
    form.removeListItem('prescription.medicines', index);
  };

  const handleSubmit = async (values: typeof form.values) => {
    const data = {
      ...values,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      appointmentId: appointment.id,
      prescription: {
        ...values.prescription,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        appointmentId: appointment.id,
      },
    };
    console.log(data);

    setLoading(true);
    try {
      const res = await createAppointmentReport(data);

      successNotification('Report created successfully');
      form.reset();
    } catch (err: any) {
      console.error('Error creating report:', err);
      errorNotification(
        err?.response?.data?.errorMessage || 'Failed to create report'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
      <Fieldset
        className="grid grid-cols-2 gap-4
      "
        legend={
          <span className="text-lg font-medium text-primary-500">
            Personal information
          </span>
        }
        radius="md"
      >
        <MultiSelect
          {...form.getInputProps('symptoms')}
          className="col-span-2"
          withAsterisk
          label="Symptoms"
          placeholder="Pick symptoms"
          data={symptoms}
        />
        <MultiSelect
          {...form.getInputProps('tests')}
          className="col-span-2"
          label="Tests"
          placeholder="Pick tests"
          data={tests}
        />

        <TextInput
          {...form.getInputProps('diagnosis')}
          withAsterisk
          label="Diagnosis"
          placeholder="Enter diagnosis"
        />
        <TextInput
          {...form.getInputProps('refferal')}
          label="Refferal"
          placeholder="Enter refferal details"
        />
        <Textarea
          {...form.getInputProps('notes')}
          className="col-span-2"
          label="Notes"
          placeholder="Enter any additional notes"
        />
      </Fieldset>

      <Fieldset
        className="grid gap-5
      "
        legend={
          <span className="text-lg font-medium text-primary-500">
            Prescription
          </span>
        }
        radius="md"
      >
        {form.values.prescription.medicines.map(
          (_medicine: Medicine, index: number) => (
            <Fieldset
              legend={
                <div className="flex items-center gap-5">
                  <h1 className="text-lg font-medium">Medicine {index + 1}</h1>
                  <ActionIcon
                    onClick={() => removeMedicine(index)}
                    variant="filled"
                    color="red"
                    size="md"
                    className="mb-2"
                  >
                    <IconTrash />
                  </ActionIcon>
                </div>
              }
              className="grid gap-4 col-span-2 grid-cols-2"
            >
              <TextInput
                {...form.getInputProps(`prescription.medicines.${index}.name`)}
                withAsterisk
                label="Medicine"
                placeholder="Enter medicine name"
              />

              <TextInput
                {...form.getInputProps(
                  `prescription.medicines.${index}.dosage`
                )}
                withAsterisk
                label="Dosage"
                placeholder="Enter dosage"
              />
              <Select
                {...form.getInputProps(
                  `prescription.medicines.${index}.frequency`
                )}
                withAsterisk
                label="Frequency"
                placeholder="Select frequency"
                data={dosageFrequencies}
              />

              <NumberInput
                {...form.getInputProps(
                  `prescription.medicines.${index}.duration`
                )}
                withAsterisk
                label="Duration (days)"
                placeholder="Enter duration in days"
              />

              <Select
                {...form.getInputProps(`prescription.medicines.${index}.route`)}
                withAsterisk
                label="Route"
                placeholder="Select route"
                data={[
                  'Oral',
                  'Intravenous',
                  'Topical',
                  'Inhalation',
                  'Injection',
                ]}
              />

              <Select
                {...form.getInputProps(`prescription.medicines.${index}.type`)}
                withAsterisk
                label="Type"
                placeholder="Select type"
                data={['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment']}
              />

              <TextInput
                {...form.getInputProps(
                  `prescription.medicines.${index}.instructions`
                )}
                withAsterisk
                label="Instructions"
                placeholder="Enter instructions"
              />
            </Fieldset>
          )
        )}

        <div className="flex justify-center items-center col-span-2">
          <Button
            onClick={insertMeidicne}
            variant="outline"
            color="primary"
            className="col-span-2"
          >
            Add Medicine
          </Button>
        </div>
      </Fieldset>
      <div className="flex items-center gap-5 justify-center">
        <Button
          loading={loading}
          type="submit"
          className="w-full"
          variant="filled"
          color="primary"
        >
          Submit Report
        </Button>
        <Button loading={loading} variant="filled" color="red">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AppointmentReport;
