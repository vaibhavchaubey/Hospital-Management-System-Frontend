import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Modal,
  SegmentedControl,
  Select,
  Text,
  Textarea,
} from '@mantine/core';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';

// Type-only imports
import { TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import type { DataTableFilterMeta } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { useSelector } from 'react-redux';
import {
  cancelAppointment,
  getAppointmentsByDoctor,
  scheduleAppointment,
} from '../../../Service/AppointmentService';
import { getDoctorDropdowns } from '../../../Service/DoctorProfileService';
import type {
  Appointment,
  DocotrDropdownOption,
  Doctor,
  ScheduleAppointmentFormValues,
  ScheduleAppointmentPayload,
  User,
} from '../../../types';
import { formatDateWithTime } from '../../../Utility/DateUtility';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import { appointmentReasons } from '../../Data/DropdownData';

const Appointment = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [doctors, setDoctors] = useState<DocotrDropdownOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [tab, setTab] = useState<string>('Today');

  const user: User = useSelector((state: any) => state.user);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    patientName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    reason: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    notes: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    status: {
      // value: null,
      // matchMode: FilterMatchMode.IN,
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const getSeverity = (status: string) => {
    switch (status) {
      case 'CANCELLED':
        return 'danger';

      case 'COMPLETED':
        return 'success';

      case 'SCHEDULED':
        return 'info';

      default:
        return null;
    }
  };

  useEffect(() => {
    fetchAppointmentsData();
    fetchDoctorsData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAppointmentsData = async () => {
    try {
      // ✅ Fetch appointments
      const appointmentsData: Appointment[] = await getAppointmentsByDoctor(
        user.profileId
      );
      setAppointments(appointmentsData);
      console.log('appointmentsData', appointmentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDoctorsData = async () => {
    try {
      // ✅ Fetch doctors
      const doctorsData: Doctor[] = await getDoctorDropdowns();
      const dropdowns: DocotrDropdownOption[] = doctorsData.map((doctor) => ({
        value: doctor.id.toString(),
        label: doctor.name,
      }));
      setDoctors(dropdowns);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters: any = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const form = useForm({
    initialValues: {
      doctorId: '',
      patientId: user.profileId,
      appointmentTime: new Date(),
      reason: '',
      notes: '',
    },

    validate: {
      doctorId: (value) => (value ? undefined : 'Doctor is required'),
      appointmentTime: (value) =>
        value ? undefined : 'Appointment time is required',
      reason: (value) => (value ? undefined : 'Reason is required'),
    },
  });

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <Button leftSection={<IconPlus />} onClick={open} variant="filled">
          Schedule Appoinment
        </Button>

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

  const statusBodyTemplate = (rowData: Appointment) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const handleDelete = (rowData: Appointment) => {
    modals.openConfirmModal({
      title: (
        <span className="text-xl font-serif font-semibold">Are You sure</span>
      ),
      centered: true,
      children: (
        <Text size="sm">
          You want to cancel this appointment? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },

      onConfirm: () => {
        cancelAppointment(rowData.id)
          .then(() => {
            successNotification('Appointment cancelled successfully');
            // Update the local state to remove the cancelled appointment
            setAppointments((prev) =>
              prev.map((appointment) =>
                appointment.id === rowData.id
                  ? { ...appointment, status: 'CANCELLED' }
                  : appointment
              )
            );
          })
          .catch((error) => {
            errorNotification(
              error?.response?.data?.errorMessage ||
                'Failed to cancel appointment.'
            );
          });
      },
    });
  };

  const actionBodyTemplate = (rowData: Appointment) => {
    return (
      <div className="flex gap-2">
        <ActionIcon color="red" onClick={() => handleDelete(rowData)}>
          <IconTrash size={20} stroke={1.5} />
        </ActionIcon>
      </div>
    );
  };

  const header = renderHeader();

  const handleSubmit = async (values: ScheduleAppointmentFormValues) => {
    console.log('Form Values:', values);

    const payload: ScheduleAppointmentPayload = {
      doctorId: Number(values.doctorId),
      patientId: Number(values.patientId),
      appointmentTime: new Date(values.appointmentTime)
        .toISOString()
        .slice(0, 19), // "yyyy-MM-ddTHH:mm:ss" (backend LocalDateTime format)
      reason: values.reason,
      notes: values.notes,
    };

    console.log('Payload Sent:', payload);

    setLoading(true);
    try {
      const data = await scheduleAppointment(payload);
      console.log(data);
      close();
      form.reset();
      fetchAppointmentsData();
      successNotification('Appointment scheduled Successfully.');
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || 'Failed to schedule appointment.'
      );
    } finally {
      setLoading(false);
    }
  };

  const timeTemplate = (rowData: Appointment) => {
    return <span>{formatDateWithTime(rowData.appointmentTime)}</span>;
  };

  const rightToolbarTemplate = () => {
    return (
      <TextInput
        leftSection={<IconSearch />}
        fw={500}
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
      />
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <SegmentedControl
        variant="filled"
        color={tab === 'Today' ? 'blue' : tab === 'Upcoming' ? 'green' : 'red'}
        value={tab}
        onChange={setTab}
        data={['Today', 'Upcoming', 'Past']}
      />
    );
  };

  const filteredAppointment = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentTime);

    // Calculate today's boundaries once
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    if (tab === 'Today') {
      return appointmentDate >= startOfToday && appointmentDate <= endOfToday;
    } else if (tab === 'Upcoming') {
      return appointmentDate > endOfToday;
    } else if (tab === 'Past') {
      return appointmentDate < startOfToday;
    }

    return true;
  });

  return (
    <div className="card">
      <Toolbar
        className="mb-4"
        start={leftToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        stripedRows
        value={filteredAppointment}
        size="small"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={['patientName', 'reason', 'notes', 'status']}
        emptyMessage="No appointment found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          field="patientName"
          header="Patient"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: '14rem' }}
        />
        <Column
          field="patientPhone"
          header="Phone"
          style={{ minWidth: '14rem' }}
          body={(rowData: Appointment) =>
            rowData.patientPhone ? rowData.patientPhone : '-'
          }
        />
        <Column
          field="appointmentTime"
          header="Appointment Time"
          sortable
          style={{ minWidth: '14rem' }}
          body={timeTemplate}
        />
        <Column
          field="reason"
          header="Reason"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: '14rem' }}
        />
        <Column
          field="notes"
          header="Notes"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: '14rem' }}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '12rem' }}
          body={statusBodyTemplate}
          filter
        />
        <Column
          headerStyle={{ width: '5rem', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          body={actionBodyTemplate}
        />
      </DataTable>

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title={
          <div className="text-xl font-semibold text-primary-500">
            Schedule Appointment
          </div>
        }
        centered
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="grid grid-cols-1 gap-5"
        >
          <Select
            {...form.getInputProps('doctorId')}
            withAsterisk
            data={doctors}
            label="Doctors"
            placeholder="Select Doctor"
          />
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps('appointmentTime')}
            withAsterisk
            label="Appointment Time"
            placeholder="Pick date and time"
          />
          <Select
            {...form.getInputProps('reason')}
            withAsterisk
            data={appointmentReasons}
            label="Reason for Appointment"
            placeholder="Enter reason for appointment"
          />
          <Textarea
            {...form.getInputProps('notes')}
            withAsterisk
            label="Additional Notes"
            placeholder="Enter any additional notes"
          />

          <Button type="submit" variant="filled" fullWidth>
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointment;
