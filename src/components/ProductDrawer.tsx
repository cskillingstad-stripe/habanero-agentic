'use client';

import {
  Drawer,
  Text,
  Group,
  Image,
  Stack,
  Button,
} from '@mantine/core';
import { Item } from './ProductMessage';
import { formatPrice } from './ProductMessage';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import Habanero from './Habanero';

export const ProductDrawer = ({
  opened,
  onClose,
  onExitTransitionEnd,
  item,
}: {
  opened: boolean;
  onClose: () => void;
  onExitTransitionEnd?: () => void;
  item: Item | null;
}) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      onExitTransitionEnd={onExitTransitionEnd}
      position="bottom"
      closeOnClickOutside
      portalProps={{ target: '#iphone-drawer-portal' }}
      styles={{
        root: {
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          ['--drawer-height' as string]: 'auto',
          ['--drawer-flex' as string]: '0 0 auto',
        },
        overlay: { position: 'absolute', inset: 0 },
        inner: { position: 'absolute', inset: 0 },
        content: {
          height: 'auto',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        },
      }}
      title={
        <Group gap={6}>
          <Image src="/galtee.svg" alt="Galtee" maw={36} mah={36} />
          <Stack gap={0}>
            <Text size="sm" fw={500}>Galtee</Text>
            <Text size="sm" c="dimmed">galteeoutdoors.com</Text>
          </Stack>
        </Group>
      }
    >
      <Stack gap="lg">
        <Group>
          <Image src={item?.image} alt={item?.name} maw={48} bdrs="md" />
          <Stack gap="xs">
            <Text size="sm" fw={500}>{item?.name}</Text>
            <Group gap="sm">
              <Text size="md" fw={500}>{formatPrice(item?.price ?? 0)}</Text>
              <Button.Group>
                <Button variant="default" size="xs" p={5} h={24}>
                  <IconMinus size={12} />
                </Button>
                <Button.GroupSection
                  variant="default"
                  bg="var(--mantine-color-body)"
                  size="xs"
                  h={24}
                  w={24}
                >
                  1
                </Button.GroupSection>
                <Button variant="default" size="xs" p={5} h={24}>
                  <IconPlus size={12} />
                </Button>
              </Button.Group>
            </Group>
          </Stack>
        </Group>
        <Habanero />
      </Stack>
    </Drawer>
  );
};
