import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  MultiSelect,
  NumberInput,
  SegmentedControl,
  Select,
  Textarea,
  TextInput,
  type SelectProps,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCheck,
  IconLayoutGrid,
  IconSearch,
  IconTable,
  IconTrash,
} from '@tabler/icons-react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import {
  createAppointmentReport,
  getReportsByPatientId,
  isReportExists,
} from '../../../Service/AppointmentService';
import { getAllMedicine } from '../../../Service/MedicineService';
import { formatDate } from '../../../Utility/DateUtility';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import {
  dosageFrequencies,
  medicineTypes,
  symptoms,
  tests,
} from '../../Data/DropdownData';
import { Toolbar } from 'primereact/toolbar';
import ReportCard from './ReportCard';
import { useMediaQuery } from '@mantine/hooks';

type Medicine = {
  name: string;
  medicineId?: string | number | undefined;
  dosage: string;
  frequency: string;
  duration: number;
  // route: string;
  type: string;
  instructions: string;
  prescriptionId?: number;
};

const AppointmentReport = ({ appointment }: any) => {
  const [view, setView] = useState('table');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [allowAdd, setAllowAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [medicine, setMedicine] = useState<any[]>([]);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});
  const matches = useMediaQuery('(max-width: 768px)');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters: any = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    fetchData();
  }, [appointment?.patientId, appointment?.id]);

  const fetchData = () => {
    getReportsByPatientId(appointment?.patientId)
      .then((response) => {
        console.log('Reports Data:', response);
        setData(response);
      })
      .catch((err) => {
        console.error('Error fetching Reports:', err);
      });

    isReportExists(appointment?.id)
      .then((response) => {
        console.log('Is Report Exists:', response);
        setAllowAdd(!response);
      })
      .catch((err) => {
        console.error('Error checking report existence:', err);
        setAllowAdd(false);
      });
  };

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
          // route: (value: string) => (value.trim() ? null : 'Route is required'),
          type: (value: string) => (value.trim() ? null : 'Type is required'),
          instructions: (value: string) =>
            value.trim() ? null : 'Instructions are required',
        },
      },
    },
  });

  useEffect(() => {
    getAllMedicine()
      .then((response) => {
        console.log('All Medicines Data:', response);
        setMedicine(response);
        setMedicineMap(
          response.reduce((acc: any, item: any) => {
            acc[item.id] = item;
            return acc;
          }, {}),
        );
      })
      .catch((err) => {
        console.error('Error fetching Medicines:', err);
      });
  }, []);

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
        medicines: values.prescription.medicines.map((med) => ({
          ...med,
          medicineId: med.medicineId === 'OTHER' ? null : med.medicineId,
        })),
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
      setEdit(false);
      fetchData();
    } catch (err: any) {
      console.error('Error creating report:', err);
      errorNotification(
        err?.response?.data?.errorMessage || 'Failed to create report',
      );
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        {/* <ActionIcon
          onClick={() =>
            navigate('/doctor/appointments/' + rowData.appointmentId)
          }
        >  
          <IconEye size={20} stroke={1.5} />
        </ActionIcon> */}
      </div>
    );
  };

  const renderSelectOption: SelectProps['renderOption'] = ({
    option,
    checked,
  }: any) => (
    <Group flex="1" gap="xs">
      <div className="flex gap-2 items-center">
        {option.label}
        {option?.manufacturer && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.8rem',
              color: 'gray',
            }}
          >
            {option.manufacturer} - {option.dosage}
          </span>
        )}
      </div>
      {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );

  const handleChangeMed = (medId: any, index: number) => {
    if (medId && medId !== 'OTHER') {
      form.setFieldValue(`prescription.medicines.${index}.medicineId`, medId);
      form.setFieldValue(
        `prescription.medicines.${index}.name`,
        medicineMap[medId]?.name || '',
      );
      form.setFieldValue(
        `prescription.medicines.${index}.dosage`,
        medicineMap[medId]?.dosage || '',
      );
      form.setFieldValue(
        `prescription.medicines.${index}.type`,
        medicineMap[medId]?.type || '',
      );
    } else {
      form.setFieldValue(`prescription.medicines.${index}.medicineId`, 'OTHER');
      form.setFieldValue(`prescription.medicines.${index}.name`, null);
      form.setFieldValue(`prescription.medicines.${index}.dosage`, null);
      form.setFieldValue(`prescription.medicines.${index}.type`, null);
    }
  };

  const startToolbarTemplate = () => {
    return (
      allowAdd && (
        <Button variant="filled" onClick={() => setEdit(true)}>
          Add Report
        </Button>
      )
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="md:flex hidden flex-wrap gap-5 justify-end items-center">
        <SegmentedControl
          value={view}
          onChange={setView}
          size={matches ? 'xs' : 'md'}
          color="primary"
          data={[
            { label: <IconTable />, value: 'table' },
            { label: <IconLayoutGrid />, value: 'card' },
          ]}
        />

        <TextInput
          className="lg:block hidden"
          leftSection={<IconSearch />}
          fw={500}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </div>
    );
  };

  return (
    <div>
      {!edit ? (
        <div>
          <Toolbar
            className="mb-4 !p-1"
            start={startToolbarTemplate}
            end={rightToolbarTemplate}
          ></Toolbar>
          {view === 'table' && !matches ? (
            <DataTable
              stripedRows
              value={data}
              size="small"
              paginator
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="id"
              filterDisplay="menu"
              globalFilterFields={['doctorName', 'notes']}
              emptyMessage="No appointment found."
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
              <Column field="doctorName" header="Doctor" />

              <Column field="diagnosis" header="Diagnosis" />

              <Column
                field="reportDate"
                header="Report Date"
                sortable
                body={(rowData) => formatDate(rowData.createdAt)}
              />

              <Column
                field="notes"
                header="Notes"
                style={{ minWidth: '14rem' }}
              />
              <Column
                headerStyle={{ width: '5rem', textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                body={actionBodyTemplate}
              />
            </DataTable>
          ) : (
            <div
              className="grid lg:grid-cols-4
        md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
            >
              {data.map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
              {data.length === 0 && (
                <div className="col-span-4 text-center text-gray-500">
                  No reports found.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
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
              className="col-span-2 sm:col-span-1"
              withAsterisk
              label="Diagnosis"
              placeholder="Enter diagnosis"
            />
            <TextInput
              {...form.getInputProps('refferal')}
              className="col-span-2 sm:col-span-1"
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
              (med: Medicine, index: number) => (
                <Fieldset
                  legend={
                    <div className="flex items-center gap-5">
                      <h1 className="text-lg font-medium">
                        Medicine {index + 1}
                      </h1>
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
                  className="grid gap-4 col-span-2 sm:grid-cols-2"
                >
                  <Select
                    {...form.getInputProps(
                      `prescription.medicines.${index}.medicineId`,
                    )}
                    label="Medicine"
                    placeholder="Select medicine"
                    onChange={(value: any) => handleChangeMed(value, index)}
                    data={[
                      ...medicine
                        .filter(
                          (x: any) =>
                            !form.values.prescription.medicines.some(
                              (item1, idx) =>
                                item1.medicineId == x.id && idx != index,
                            ),
                        )
                        .map((item) => ({
                          ...item,
                          value: '' + item.id,
                          label: item.name,
                        })),
                      {
                        value: 'OTHER',
                        label: 'Other',
                      },
                    ]}
                    renderOption={renderSelectOption}
                    withAsterisk
                  />

                  {med.medicineId == 'OTHER' && (
                    <TextInput
                      {...form.getInputProps(
                        `prescription.medicines.${index}.name`,
                      )}
                      withAsterisk
                      label="Medicine"
                      placeholder="Enter medicine name"
                    />
                  )}

                  <TextInput
                    disabled={med.medicineId != 'OTHER'}
                    {...form.getInputProps(
                      `prescription.medicines.${index}.dosage`,
                    )}
                    withAsterisk
                    label="Dosage"
                    placeholder="Enter dosage"
                  />
                  <Select
                    {...form.getInputProps(
                      `prescription.medicines.${index}.frequency`,
                    )}
                    withAsterisk
                    label="Frequency"
                    placeholder="Select frequency"
                    data={dosageFrequencies}
                  />

                  <NumberInput
                    {...form.getInputProps(
                      `prescription.medicines.${index}.duration`,
                    )}
                    withAsterisk
                    label="Duration (days)"
                    placeholder="Enter duration in days"
                  />

                  {/* <Select
                    {...form.getInputProps(
                      `prescription.medicines.${index}.route`
                    )}
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
                  /> */}

                  <Select
                    disabled={med.medicineId != 'OTHER'}
                    {...form.getInputProps(
                      `prescription.medicines.${index}.type`,
                    )}
                    withAsterisk
                    label="Type"
                    placeholder="Select type"
                    data={medicineTypes}
                  />

                  <TextInput
                    {...form.getInputProps(
                      `prescription.medicines.${index}.instructions`,
                    )}
                    withAsterisk
                    label="Instructions"
                    placeholder="Enter instructions"
                  />
                </Fieldset>
              ),
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
      )}
    </div>
  );
};

export default AppointmentReport;
