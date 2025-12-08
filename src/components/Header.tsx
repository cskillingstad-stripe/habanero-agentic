'use client';

import { Group } from '@mantine/core';
import { IconFilter2Spark, IconUpload, IconDots } from '@tabler/icons-react';

export const Header = () => {
  return (
    <Group justify="space-between" align="center" p="md">
      <IconFilter2Spark size={16} />

      <Group>
        <IconUpload size={16} />
        <IconDots size={16} />
      </Group>
    </Group>
  );
};
