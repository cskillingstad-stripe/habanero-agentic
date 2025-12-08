'use client';

import { IconMicrophone, IconSend2 } from '@tabler/icons-react';
import { Stack, TextInput, Text } from '@mantine/core';

export const MessageInput = () => {
  return (
    <Stack gap={0} px="md">
      <TextInput
        variant="filled"
        size="lg"
        placeholder="Type message"
        leftSection={<IconMicrophone size={16} />}
        rightSection={<IconSend2 size={16} />}
      />

      <Text p="md" size="sm" ta="center">
        lora.com
      </Text>
    </Stack>
  );
};
