'use client';

import { IconMicrophone, IconSend2 } from '@tabler/icons-react';
import { Stack, TextInput } from '@mantine/core';

export const MessageInput = () => {
  return (
    <Stack gap={0} px="md" pb="md">
      <TextInput
        variant="filled"
        size="lg"
        placeholder="Type message"
        leftSection={<IconMicrophone size={16} />}
        rightSection={<IconSend2 size={16} />}
      />
    </Stack>
  );
};
