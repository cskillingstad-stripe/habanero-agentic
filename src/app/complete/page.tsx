'use client';

import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { Stack, Text, Button, Box } from '@mantine/core';

export default function Complete() {
  return (
    <Box
      component="main"
      py="xl"
      px="md"
      style={{ minHeight: '60vh' }}
      className="flex flex-col items-center justify-center"
    >
      <Stack align="center" gap="lg" maw={320}>
        <Box
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #22c55e 0%, #16a34a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)',
          }}
        >
          <IconCheck size={48} color="white" strokeWidth={2.5} />
        </Box>

        <Stack align="center" gap={4}>
          <Text size="xl" fw={700} ta="center" lh={1.2}>
            Order successful!
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Thanks for your purchase. We&apos;ll get it on its way soon.
          </Text>
        </Stack>

        <Button
          component={Link}
          href="/"
          variant="filled"
          color="dark.8"
          size="md"
          radius="md"
          mt="sm"
          style={{ backgroundColor: '#222725' }}
        >
          Back to home
        </Button>
      </Stack>
    </Box>
  );
}
