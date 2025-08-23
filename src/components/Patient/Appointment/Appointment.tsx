import { Button, Modal, Select, Textarea } from '@mantine/core';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';

// Type-only imports
import { TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import type { ColumnFilterElementTemplateOptions } from 'primereact/column';
import type { DataTableFilterMeta } from 'primereact/datatable';
import type { DropdownChangeEvent } from 'primereact/dropdown';
import type { MultiSelectChangeEvent } from 'primereact/multiselect';
import type { SliderChangeEvent } from 'primereact/slider';
import { getDoctorDropdowns } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReasons } from '../../Data/DropdownData';
import type { ScheduleAppointmentInput, User } from '../../../types';
import { useSelector } from 'react-redux';
import { scheduleAppointment } from '../../../Service/AppointmentService';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';

interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string | Date;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

const Appointment = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const user: User = useSelector((state: any) => state.user);

  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [representatives] = useState<Representative[]>([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' },
  ]);
  const [statuses] = useState<string[]>([
    'unqualified',
    'qualified',
    'new',
    'negotiation',
    'renewal',
  ]);

  const getSeverity = (status: string) => {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  };

  useEffect(() => {
    setCustomers([
      {
        id: 1001,
        name: 'Maria Anders',
        country: {
          name: 'Germany',
          code: 'de',
        },
        company: 'Alfreds Futterkiste',
        date: '2016-03-23',
        status: 'qualified',
        verified: false,
        activity: 42,
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png',
        },
        balance: 45890,
      },
      {
        id: 1002,
        name: 'Francisco Chang',
        country: {
          name: 'Mexico',
          code: 'mx',
        },
        company: 'Centro comercial Moctezuma',
        date: '2017-07-11',
        status: 'new',
        verified: true,
        activity: 33,
        representative: {
          name: 'Asiya Javayant',
          image: 'asiyajavayant.png',
        },
        balance: 120340,
      },
      {
        id: 1003,
        name: 'Helen Bennett',
        country: {
          name: 'UK',
          code: 'gb',
        },
        company: 'Island Trading',
        date: '2018-12-05',
        status: 'unqualified',
        verified: true,
        activity: 28,
        representative: {
          name: 'Onyama Lim',
          image: 'onyamalim.png',
        },
        balance: 86500,
      },
      {
        id: 1004,
        name: 'Yoshi Tannamuri',
        country: {
          name: 'Japan',
          code: 'jp',
        },
        company: 'Tokyo Traders',
        date: '2019-06-17',
        status: 'qualified',
        verified: false,
        activity: 14,
        representative: {
          name: 'Marcus Aurelius',
          image: 'marcusaurelius.png',
        },
        balance: 43210,
      },
      {
        id: 1005,
        name: 'Giovanni Rovelli',
        country: {
          name: 'Italy',
          code: 'it',
        },
        company: 'Rovelli & Co',
        date: '2020-01-29',
        status: 'negotiation',
        verified: true,
        activity: 39,
        representative: {
          name: 'Isabella Flores',
          image: 'isabellaflores.png',
        },
        balance: 97800,
      },
    ]);

    getDoctorDropdowns()
      .then((data) => {
        setDoctors(
          data.map((doctor: any) => ({
            value: '' + doctor.id,
            label: doctor.name,
          }))
        );
        console.log('Dropdown Data:', data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data: Customer[]) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const formatDate = (value: string | Date) => {
    return new Date(value).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
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

  const countryBodyTemplate = (rowData: Customer) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="flag"
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${rowData.country.code}`}
          style={{ width: '24px' }}
        />
        <span>{rowData.country.name}</span>
      </div>
    );
  };

  const representativeBodyTemplate = (rowData: Customer) => {
    const representative = rowData.representative;

    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={representative.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`}
          width="32"
        />
        <span>{representative.name}</span>
      </div>
    );
  };

  const representativeFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <React.Fragment>
        <div className="mb-3 font-bold">Agent Picker</div>
        <MultiSelect
          value={options.value}
          options={representatives}
          itemTemplate={representativesItemTemplate}
          onChange={(e: MultiSelectChangeEvent) =>
            options.filterCallback(e.value)
          }
          optionLabel="name"
          placeholder="Any"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const representativesItemTemplate = (option: Representative) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={option.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
          width="32"
        />
        <span>{option.name}</span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData: Customer) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const balanceBodyTemplate = (rowData: Customer) => {
    return formatCurrency(rowData.balance);
  };

  const balanceFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const statusBodyTemplate = (rowData: Customer) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const activityBodyTemplate = (rowData: Customer) => {
    return (
      <ProgressBar
        value={rowData.activity}
        showValue={false}
        style={{ height: '6px' }}
      ></ProgressBar>
    );
  };

  const activityFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <>
        <Slider
          value={options.value}
          onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)}
          range
          className="m-3"
        ></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </>
    );
  };

  const actionBodyTemplate = () => {
    return <Button type="button"></Button>;
  };

  const header = renderHeader();

  const handleSubmit = async (values: ScheduleAppointmentInput) => {
    console.log('Form Values:', values);

    setLoading(true);
    try {
      const data = await scheduleAppointment(values);
      successNotification('Appointment Scheduled Successfully.');
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || 'Failed to schedule appointment.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        header={header}
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedCustomers}
        onSelectionChange={(e) => {
          const customers = e.value as Customer[];
          setSelectedCustomers(customers);
        }}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          'name',
          'country.name',
          'representative.name',
          'balance',
          'status',
        ]}
        emptyMessage="No customers found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: '14rem' }}
        />
        <Column
          field="country.name"
          header="Country"
          sortable
          filterField="country.name"
          style={{ minWidth: '14rem' }}
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search by country"
        />
        <Column
          header="Agent"
          sortable
          sortField="representative.name"
          filterField="representative"
          showFilterMatchModes={false}
          filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '14rem' }}
          body={representativeBodyTemplate}
          filter
          filterElement={representativeFilterTemplate}
        />
        <Column
          field="date"
          header="Date"
          sortable
          filterField="date"
          dataType="date"
          style={{ minWidth: '12rem' }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
        />
        <Column
          field="balance"
          header="Balance"
          sortable
          dataType="numeric"
          style={{ minWidth: '12rem' }}
          body={balanceBodyTemplate}
          filter
          filterElement={balanceFilterTemplate}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '12rem' }}
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
        />
        <Column
          field="activity"
          header="Activity"
          sortable
          showFilterMatchModes={false}
          style={{ minWidth: '12rem' }}
          body={activityBodyTemplate}
          filter
          filterElement={activityFilterTemplate}
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

          <Button
            type="submit"
            variant="filled"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointment;
