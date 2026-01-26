import { ActionIcon, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';
import PatientSidebar from '../Patient/Sidebar/Sidebar';
import DoctorSidebar from '../Doctor/Sidebar/Sidebar';
import AdminSidebar from '../Admin/Sidebar/Sidebar';

import type { User } from '../../types';
import { useSelector } from 'react-redux';

const SideDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const user: User = useSelector((state: any) => state.user);

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        padding={0}
        size="auto"
        withCloseButton={false}
      >
        {user.role === 'PATIENT' ? (
          <PatientSidebar />
        ) : user.role === 'DOCTOR' ? (
          <DoctorSidebar />
        ) : (
          <AdminSidebar />
        )}
      </Drawer>

      <ActionIcon onClick={open} variant="filled" size="lg" aria-label="Menu">
        <IconMenu2 style={{ width: '70%', height: '90%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );
};

export default SideDrawer;
