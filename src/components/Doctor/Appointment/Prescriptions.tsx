import { ActionIcon, Card, Divider, Grid, Modal, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconEye,
  IconMedicineSyrup,
  IconSearch
} from '@tabler/icons-react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrescriptionsByPatientId } from '../../../Service/AppointmentService';
import { formatDate } from '../../../Utility/DateUtility';

const Prescriptions = ({ appointment }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [medicinesData, setMedicinesData] = useState<any>([]);
  const navigate = useNavigate();

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
    getPrescriptionsByPatientId(appointment.patientId)
      .then((response) => {
        console.log('Prescriptions Data:', response);
        setData(response);
      })
      .catch((err) => {
        console.error('Error fetching prescriptions:', err);
      });
  }, [appointment?.patientId]);

  const handleMedicine = (medicines: any[]) => {
    open();
    setMedicinesData(medicines);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <ActionIcon
          onClick={() =>
            navigate('/doctor/appointments/' + rowData.appointmentId)
          }
        >
          <IconEye size={20} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() => handleMedicine(rowData.medicines)}
        >
          <IconMedicineSyrup size={20} stroke={1.5} />
        </ActionIcon>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-end items-center">
        <TextInput
          leftSection={<IconSearch />}
          fw={500}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <DataTable
        header={header}
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

        <Column
          field="prescriptionDate"
          header="Prescription Date"
          sortable
          body={(rowData) => formatDate(rowData.prescriptionDate)}
        />
        <Column
          field="medicine"
          header="Medicines"
          body={(rowData) => rowData.medicines?.length ?? 0}
        />

        <Column field="notes" header="Notes" style={{ minWidth: '14rem' }} />
        <Column
          headerStyle={{ width: '5rem', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          body={actionBodyTemplate}
        />
      </DataTable>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} fz="xl">
            Medicines
          </Text>
        }
        centered
      >
        <div className="grid grid-cols-2 gap-5">
          {medicinesData?.map((medicine: any, index: number) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="sm" className="capitalize">
                {medicine.name} ({medicine.type})
              </Title>
              {/* <Text fw={600} fz="lg" mb="sm">
              {medicine.name} ({medicine.type})
            </Text> */}
              <Divider mb="md" />

              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Medicine ID:
                  </Text>
                  <Text c="dimmed">{medicine.medicineId ?? 'N/A'}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Prescription ID:
                  </Text>
                  <Text c="dimmed">{medicine.prescriptionId}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Dosage:
                  </Text>
                  <Text c="dimmed">{medicine.dosage}</Text>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Frequency:
                  </Text>
                  <Text c="dimmed">{medicine.frequency}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Duration:
                  </Text>
                  <Text c="dimmed">{medicine.duration} days</Text>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Route:
                  </Text>
                  <Text c="dimmed">{medicine.route}</Text>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Text size="sm" fw={500}>
                    Instructions:
                  </Text>
                  <Text c="dimmed">{medicine.instructions}</Text>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </div>
        {medicinesData.length === 0 && (
          <Text c="dimmed" size="sm" mt="md">
            No medicines prescribed for this appointment.
          </Text>
        )}
      </Modal>
    </div>
  );
};

export default Prescriptions;
