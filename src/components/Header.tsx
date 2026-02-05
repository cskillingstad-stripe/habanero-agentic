'use client';

import { Group } from '@mantine/core';
import { IconFilter2Spark, IconUpload, IconDots } from '@tabler/icons-react';

export const Header = () => {
  return (
    <Group justify="space-between" align="center" p="md">
      <a href="https://go/loginas/acct_1SxXw4LkR3ESQLj1" target="_blank">
        <IconFilter2Spark size={16} />
      </a>

      <Group>
        <IconUpload size={16} />
        <IconDots size={16} />
      </Group>
    </Group>
  );
};
