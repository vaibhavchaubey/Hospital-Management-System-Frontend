import {
  ActionIcon,
  Badge,
  Button,
  Fieldset,
  Group,
  Loader,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
  type SelectProps,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconCheck,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
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
import { addSales } from '../../../Service/SalesService';

interface SaleItem {
  medicineId: string;
  quantity: number;
}

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [medicine, setMedicine] = useState<any[]>([]);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});

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
          }, {})
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
      saleItems: [
        {
          medicineId: '',
          quantity: 0,
        },
      ] as SaleItem[],
    },
    validate: {
      saleItems: {
        medicineId: (value) => (value ? null : 'Medicine is required'),
        quantity: (value) =>
          value > 0 ? null : 'Quantity must be greater than 0',
      },
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
    setLoading(true);

    const saleItems = values.saleItems.map((x: any) => ({
      ...x,
      unitPrice: medicineMap[x.medicineId]?.unitPrice,
    }));

    const totalAmount = saleItems.reduce(
      (acc: number, item: any) => acc + item.quantity * item.unitPrice,
      0
    );

    try {
      const res = await addSales({
        saleItems,
        totalAmount,
      });
      successNotification(`Medicines sold successfully`);
      form.reset();
      setEdit(false);
      fetchData();
    } catch (err: any) {
      console.error('Error creating report:', err);
      errorNotification(
        err?.response?.data?.errorMessage || `Failed to sold Medicines`
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

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <Button variant="filled" onClick={() => setEdit(true)}>
          Sell Medicine
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

  const statusBody = (rowData: any) => {
    const isExpired = new Date(rowData.expiryDate) < new Date();
    return (
      <Badge color={isExpired ? 'red' : 'green'}>
        {isExpired ? 'Expired' : 'Active'}
      </Badge>
    );
  };

  const addMore = () => {
    form.insertListItem('saleItems', { medicineId: '', quantity: 0 });
  };

  const header = renderHeader();

  return (
    <div>
      {!edit ? (
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
        <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
          <LoadingOverlay visible={loading} />
          <Fieldset
            className="grid gap-5"
            legend={
              <span className="text-lg font-medium text-primary-500">
                Medicine information
              </span>
            }
            radius="md"
          >
            <div className="grid grid-cols-5 gap-4">
              {form.values.saleItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-2">
                    <Select
                      {...form.getInputProps(`saleItems.${index}.medicineId`)}
                      label="Medicine"
                      placeholder="Select medicine"
                      data={medicine
                        .filter(
                          (x) =>
                            !form.values.saleItems.some(
                              (item1, idx) =>
                                item1.medicineId == x.id && idx != index
                            )
                        )
                        .map((item) => ({
                          ...item,
                          value: '' + item.id,
                          label: item.name,
                        }))}
                      renderOption={renderSelectOption}
                      withAsterisk
                    />
                  </div>

                  <div className="col-span-2">
                    <NumberInput
                      rightSectionWidth={80}
                      rightSection={
                        <div className="text-xs flex gap-1 text-white font-medium rounded-md bg-red-400 p-1">
                          Stock: {medicineMap[item.medicineId]?.stock}
                        </div>
                      }
                      min={0}
                      max={medicineMap[item.medicineId]?.stock || 0}
                      clampBehavior="strict"
                      {...form.getInputProps(`saleItems.${index}.quantity`)}
                      label="Quantity"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    {item.quantity && item.medicineId ? (
                      <div>
                        Total {item.quantity} X{' '}
                        {medicineMap[item.medicineId]?.unitPrice} ={' '}
                        {item.quantity *
                          medicineMap[item.medicineId]?.unitPrice}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <ActionIcon
                      type="button"
                      size="lg"
                      color="red"
                      onClick={() => form.removeListItem('saleItems', index)}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Button
                type="button"
                onClick={addMore}
                variant="outline"
                leftSection={<IconPlus size={16} />}
              >
                Add more
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
              Sell Medicine
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

export default Sales;
