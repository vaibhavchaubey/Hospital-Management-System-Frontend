import ProfileMenu from './ProfileMenu';
import { ActionIcon } from '@mantine/core';
import {
  IconAdjustments,
  IconBellRinging,
  IconLayoutSidebarLeftCollapseFilled,
} from '@tabler/icons-react';

const Header = () => {
  return (
    <div className="w-full h-16 flex justify-between px-5 items-center">
      <ActionIcon variant="transparent" size="xl" aria-label="Settings">
        <IconLayoutSidebarLeftCollapseFilled
          style={{ width: '70%', height: '90%' }}
          stroke={1.5}
        />
      </ActionIcon>
      <div className="flex gap-5 items-center">
        <ActionIcon variant="transparent" size="md" aria-label="Settings">
          <IconBellRinging style={{ width: '70%', height: '90%' }} stroke={2} />
        </ActionIcon>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
