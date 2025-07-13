import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const successNotification = (message: string) => {
  notifications.show({
    title: 'Success',
    message,
    color: 'teal',
    icon: <IconCheck />,
    withCloseButton: true,
    withBorder: true,
    className: '!border-green-500',
  });
};

const errorNotification = (message: string) => {
  notifications.show({
    title: 'Error',
    message,
    color: 'red',
    icon: <IconX />,
    withCloseButton: true,
    withBorder: true,
    className: '!border-red-500',
  });
};

export { successNotification, errorNotification };
