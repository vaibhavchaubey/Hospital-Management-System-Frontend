import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title,
  type SelectProps,
} from '@mantine/core';
import { Spotlight, SpotlightAction, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconEye, IconPlus, IconTrash } from '@tabler/icons-react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import {
  getAllPrescriptions,
  getMedicinesByPrescriptionId,
} from '../../../Service/AppointmentService';
import { getAllMedicine } from '../../../Service/MedicineService';
import {
  addSales,
  getAllSaleItems,
  getAllSales,
} from '../../../Service/SalesService';
import { formatDate } from '../../../Utility/DateUtility';
import {
  errorNotification,
  successNotification,
} from '../../../Utility/NotificationUtil';
import { freqMap } from '../../Data/DropdownData';

interface SaleItem {
  medicineId: string;
  quantity: number;
}

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [medicine, setMedicine] = useState<any[]>([]);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});

  const [opened, { open, close }] = useDisclosure(false);

  const [saleItems, setSaleItems] = useState<any[]>([]);

  const [edit, setEdit] = useState<boolean>(false);

  const [actions, setActions] = useState<SpotlightAction[]>([]);

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
    getAllPrescriptions()
      .then((response) => {
        console.log('All Prescriptions Data:', response);
        setActions(
          response.map((prescription: any) => ({
            id: String(prescription.id),
            label: prescription.patientName,
            description: `Prescription by Dr. ${
              prescription.doctorName
            } on ${formatDate(prescription.prescriptionDate)}`,
            onClick: () => handleImport(prescription),
          }))
        );
      })
      .catch((err) => {
        console.error('Error fetching Prescriptions:', err);
      });
    fetchData();
  }, []);

  const fetchData = () => {
    getAllSales()
      .then((response) => {
        console.log('All Sales Data:', response);
        setData(response);
      })
      .catch((err) => {
        console.error('Error fetching Sales:', err);
      });
  };

  const form = useForm({
    initialValues: {
      buyerName: '',
      buyerContact: '',
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

  const handleDetails = (rowData: any) => {
    open();
    setLoading(true);
    getAllSaleItems(rowData.id)
      .then((response) => {
        console.log('Sale Items Data:', response);
        setSaleItems(response);
      })
      .catch((err) => {
        console.error('Error fetching Sale Items:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    let flag = false;
    values.saleItems.forEach((item: any, index:number) => {
      if (item.quantity > (medicineMap[item.medicineId]?.stock || 0)) {
        flag = true;
        form.setFieldError(`saleItems.${index}.quantity`, 'Quantity exceeds available stock');
      }
    });

    if (flag) {
      errorNotification(`Quantity for some medicines exceed available stock`);
      return;
    }

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
        ...values,
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
        <ActionIcon onClick={() => handleDetails(rowData)}>
          <IconEye size={20} stroke={1.5} />
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

  // const actions: SpotlightActionData[] = [
  //   {
  //     id: 'home',
  //     label: 'Home',
  //     description: 'Get to home page',
  //     onClick: () => console.log('Home'),
  //     leftSection: <IconHome size={24} stroke={1.5} />,
  //   },
  // ];

  const addMore = () => {
    form.insertListItem('saleItems', { medicineId: '', quantity: 0 });
  };

  const handleSpotlight = () => {
    spotlight.open();
  };

  const calculateQuantity = (freq: string, duration: number) => {
    const freqValue = freqMap[freq] || 0;
    return Math.ceil(freqValue * duration);
  };

  const handleImport = (prescription: any) => {
    setLoading(true);
    getMedicinesByPrescriptionId(prescription.id)
      .then((response) => {
        console.log('Medicines by Prescription Id:', response);
        // setSaleItems(response);
        form.setValues({
          buyerName: prescription.patientName,
          saleItems: response
            .filter((item: any) => item.medicineId != null)
            .map((item: any) => ({
              medicineId: String(item.medicineId),
              quantity: calculateQuantity(item.frequency, item.duration),
            })),
        });
      })
      .catch((err) => {
        console.error('Error fetching Medicines by Prescription Id:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const header = renderHeader();

  return (
    <div>
      {!edit ? (
        <DataTable
          header={header}
          removableSort
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
          emptyMessage="No sales found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column field="buyerName" header="Buyer" />
          <Column field="buyerContact" header="Contact" />
          {/* <Column field="prescriptionId" header="PrescriptionId" /> */}
          <Column field="totalAmount" header="Total Amount" sortable />
          <Column
            field="saleDate"
            header="Sale Date"
            sortable
            body={(rowData) => formatDate(rowData.saleDate)}
          />

          <Column
            headerStyle={{ textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
            body={actionBodyTemplate}
          />
        </DataTable>
      ) : (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl text-primary-500 font-medium">
              Sell Medicines
            </h3>
            <Button
              variant="filled"
              leftSection={<IconPlus />}
              onClick={handleSpotlight}
            >
              Import Prescription
            </Button>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
            <LoadingOverlay visible={loading} />
            <Fieldset
              className="grid gap-5"
              legend={
                <span className="text-lg font-medium text-primary-500">
                  Buyer Information
                </span>
              }
              radius="md"
            >
              <div className="grid grid-cols-2 gap-5">
                <TextInput
                  label="Buyer Name"
                  placeholder="Enter buyer name"
                  {...form.getInputProps('buyerName')}
                  withAsterisk
                />
                <NumberInput
                  maxLength={10}
                  label="Contact Number"
                  placeholder="Enter contact number"
                  {...form.getInputProps('buyerContact')}
                  withAsterisk
                />
              </div>
            </Fieldset>
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
                        min={1}
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
        </div>
      )}

      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} fz="xl">
            Sold Medicines
          </Text>
        }
        centered
      >
        <div className="grid grid-cols-2 gap-5">
          {saleItems?.map((saleItem: any, index: number) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="sm" className="capitalize">
                {medicineMap[saleItem.medicineId]?.name} -{' '}
                {medicineMap[saleItem.medicineId]?.dosage}{' '}
                <span className="text-gray-600">
                  ({medicineMap[saleItem.medicineId]?.manufacturer})
                </span>
              </Title>

              <Text size="xs" c="dimmed">
                {saleItem.batchNo}
              </Text>

              <Divider my="sm" />

              <Grid>
                <Grid.Col span={4}>
                  <Text size="sm" fw={500}>
                    Quantity:
                  </Text>
                  <Text c="dimmed">{saleItem.quantity}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm" fw={500}>
                    Unit Price:
                  </Text>
                  <Text c="dimmed">{saleItem.unitPrice}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm" fw={500}>
                    Total:
                  </Text>
                  <Text c="dimmed">
                    ₹ {saleItem.quantity * saleItem.unitPrice}
                  </Text>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </div>
        {saleItems.length === 0 && (
          <Text c="dimmed" size="sm" mt="md">
            No medicines sold in this sale.
          </Text>
        )}
      </Modal>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </div>
  );
};

export default Sales;
