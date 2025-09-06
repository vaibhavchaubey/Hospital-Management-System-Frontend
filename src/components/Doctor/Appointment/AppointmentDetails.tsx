import {
  Badge,
  Breadcrumbs,
  Card,
  Divider,
  Group,
  Tabs,
  Text,
} from '@mantine/core';
import {
  IconClipboard,
  IconClipboardHeart,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconStethoscope,
  IconVaccine,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAppointmentDetails } from '../../../Service/AppointmentService';
import { formatDateWithTime } from '../../../Utility/DateUtility';
import AppointmentReport from './AppointmentReport';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<any>({});

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        if (id) {
          const data = await getAppointmentDetails(Number(id));
          console.log('Appointment Details:', data);
          setAppointment(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAppointmentDetails();
  }, [id]);

  return (
    <div>
      <Breadcrumbs mb="md">
        <Link
          className="text-primary-400 hover:underline"
          to="/doctor/dashboard"
        >
          Dashboard{' '}
        </Link>
        <Link
          className="text-primary-400 hover:underline"
          to="/doctor/appointments"
        >
          Appointments
        </Link>
        <Text className="text-primary-400 ">Details</Text>
      </Breadcrumbs>

      <div>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="sm">
            <Text fw={700} fz={26} tt="capitalize">
              {appointment.patientName}
            </Text>
            <Badge
              color={appointment.status === 'CANCELLED' ? 'red' : 'green'}
              variant="light"
            >
              {appointment.status}
            </Badge>
          </Group>

          <div className="grid grid-cols-2 gap-5 mb-2">
            <Text>
              <strong>Email:</strong> {appointment.patientEmail}
            </Text>
            <Text>
              <strong>Phone:</strong> {appointment.patientPhone}
            </Text>
          </div>

          <div className="grid grid-cols-2 gap-5 ">
            <Text>
              <strong>Reason:</strong> {appointment.reason}
            </Text>
            <Text>
              <strong>Appointment Time:</strong>{' '}
              {formatDateWithTime(appointment.appointmentTime)}
            </Text>
          </div>

          {appointment.notes && (
            <Text c="dimmed" mt="sm" size="sm">
              <strong>Notes:</strong> {appointment.notes}
            </Text>
          )}
        </Card>

        <Tabs variant="pills" defaultValue="medical" my="md">
          <Tabs.List>
            <Tabs.Tab
              value="medical"
              leftSection={<IconStethoscope size={20} />}
            >
              Medical History
            </Tabs.Tab>
            <Tabs.Tab
              value="prescriptions"
              leftSection={<IconVaccine size={20} />}
            >
              Prescriptions
            </Tabs.Tab>
            <Tabs.Tab
              value="reports"
              leftSection={<IconClipboardHeart size={20} />}
            >
              Reports
            </Tabs.Tab>
          </Tabs.List>

          <Divider my="md" />

          <Tabs.Panel value="medical">Medical History</Tabs.Panel>

          <Tabs.Panel value="prescriptions">Prescriptions</Tabs.Panel>

          <Tabs.Panel value="reports">
            <AppointmentReport />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default AppointmentDetails;
