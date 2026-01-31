import {
  ActionIcon,
  Badge,
  Button,
  Fieldset,
  Group,
  NumberInput,
  SegmentedControl,
  Select,
  TextInput,
  type SelectProps,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconCheck,
  IconEdit,
  IconLayoutGrid,
  IconSearch,
  IconTable,
} from '@tabler/icons-react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useState } from 'react';
import {
  addStock,
  getAllStocks,
  updateStock,
} from '../../../Service/InventoryService';
import { getAllMedicine } from '../../../Service/MedicineService';
import { formatDate } from '../../../Utility/DateUtility';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import InventoryCard from './InventoryCard';
import { useMediaQuery } from '@mantine/hooks';

const Inventory = () => {
  const [view, setView] = useState('table');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [medicine, setMedicine] = useState<any[]>([]);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});
  const matches = useMediaQuery('(max-width: 768px)');

  const [edit, setEdit] = useState<boolean>(false);

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
    fetchData();
  }, []);

  const fetchData = () => {
    getAllStocks()
      .then((response) => {
        console.log('All Stocks Data:', response);
        setData(response);
      })
      .catch((err) => {
        console.error('Error fetching Stocks:', err);
      });
  };

  const form = useForm({
    initialValues: {
      id: null,
      medicineId: '',
      batchNo: '',
      quantity: '',
      expiryDate: null,
    },

    validate: {
      medicineId: (value) => (value ? null : 'Medicine is required'),
      batchNo: (value) => (value ? null : 'Batch number is required'),
      quantity: (value) => (value ? null : 'Quantity is required'),
      expiryDate: (value) => (value ? null : 'Expiry date is required'),
    },
  });

  const cancel = () => {
    form.reset();
    setEdit(false);
  };

  const onEdit = (rowData: any) => {
    setEdit(true);
    form.setValues({
      ...rowData,
      medicineId: rowData.medicineId ? String(rowData.medicineId) : '',
      batchNo: rowData.batchNo,
      quantity: rowData.quantity,
      expiryDate: new Date(rowData.expiryDate),
    });
  };

  const handleSubmit = async (values: any) => {
    let update = false;
    let method;
    if (values.id) {
      update = true;
      method = updateStock;
    } else {
      method = addStock;
    }

    setLoading(true);
    try {
      const res = await method(values);
      successNotification(`Stock ${update ? 'updated' : 'added'} successfully`);
      form.reset();
      setEdit(false);
      fetchData();
    } catch (err: any) {
      console.error('Error creating report:', err);
      errorNotification(
        err?.response?.data?.errorMessage ||
          `Failed to ${update ? 'update' : 'add'} stock`,
      );
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <ActionIcon onClick={() => onEdit(rowData)}>
          <IconEdit size={20} stroke={1.5} />
        </ActionIcon>
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
            {option.manufacturer}
          </span>
        )}
      </div>
      {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );

  const statusBody = (rowData: any) => {
    const isExpired = new Date(rowData.expiryDate) < new Date();
    return (
      <Badge color={isExpired ? 'red' : 'green'}>
        {isExpired ? 'Expired' : 'Active'}
      </Badge>
    );
  };

  const startToolbarTemplate = () => {
    return (
      <Button variant="filled" onClick={() => setEdit(true)}>
        Add Stock
      </Button>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="md:flex hidden flex-wrap gap-2 justify-end items-center">
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
              <Column
                field="name"
                header="Medicine"
                body={(rowData) => (
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {medicineMap['' + rowData.medicineId]?.name}
                    </span>

                    <span className="text-xs text-gray-600">
                      {medicineMap['' + rowData.medicineId]?.manufacturer}
                    </span>
                  </div>
                )}
              />
              <Column field="batchNo" header="Batch No." />
              <Column field="initialQuantity" header="Quantity" />
              <Column field="quantity" header="Remaining Quantity" />
              <Column
                field="expiryDate"
                header="Expiry Date"
                sortable
                body={(rowData) => formatDate(rowData.expiryDate)}
              />
              <Column field="status" header="Status" body={statusBody} />

              <Column
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                body={actionBodyTemplate}
              />
            </DataTable>
          ) : (
            <div
              className="grid lg:grid-cols-4
        md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
            >
              {data.map((inventory) => (
                <InventoryCard
                  key={inventory.id}
                  {...inventory}
                  medicineMap={medicineMap}
                  onEdit={() => onEdit(inventory)}
                />
              ))}
              {data.length === 0 && (
                <div className="col-span-4 text-center text-gray-500">
                  No inventory found.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
          <Fieldset
            className="grid sm:grid-cols-2 gap-4"
            legend={
              <span className="text-lg font-medium text-primary-500">
                Medicine information
              </span>
            }
            radius="md"
          >
            <Select
              {...form.getInputProps('medicineId')}
              label="Medicine"
              placeholder="Select medicine"
              data={medicine.map((item) => ({
                ...item,
                value: '' + item.id,
                label: item.name,
              }))}
              renderOption={renderSelectOption}
              withAsterisk
            />

            <TextInput
              {...form.getInputProps('batchNo')}
              withAsterisk
              label="Batch No."
              placeholder="Enter batch number"
            />
            <NumberInput
              min={0}
              clampBehavior="strict"
              {...form.getInputProps('quantity')}
              label="Quantity"
              placeholder="Enter quantity"
            />
            <DateInput
              {...form.getInputProps('expiryDate')}
              minDate={new Date()}
              label="Expiry Date"
              placeholder="Select expiry date"
            />
          </Fieldset>
          <div className="flex items-center gap-5 justify-center">
            <Button
              loading={loading}
              type="submit"
              className="w-full"
              variant="filled"
              color="primary"
            >
              {form.values?.id ? 'Update Stock' : 'Add Stock'}
            </Button>
            <Button
              loading={loading}
              onClick={cancel}
              variant="filled"
              color="red"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Inventory;
