'use client';

import React, { useState, useEffect } from 'react';
import { ITEMS } from '@/constants';
import {
  Group,
  Paper,
  Stack,
  Image,
  Text,
  Rating,
  Button,
  Divider,
} from '@mantine/core';
import { ProductDrawer } from './ProductDrawer';

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const items = [
  {
    id: 'fleece',
    name: 'Tunnel Vision',
    description: 'Next-gen tech.',
    price: ITEMS.fleece.price,
    image: ITEMS.fleece.image,
  },
  {
    id: 'puffer',
    name: 'Passive Thought',
    description: 'Elevate your game.',
    price: ITEMS.puffer.price,
    image: ITEMS.puffer.image,
  },
] as const;

export const formatPrice = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

export default function ProductMessage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [closingItem, setClosingItem] = useState<Item | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const isClosing = closingItem !== null;

  // Delay opened to true so Mantine can run the enter (slide-up) transition
  useEffect(() => {
    if (selectedItem) {
      const id = requestAnimationFrame(() => setDrawerOpened(true));
      return () => cancelAnimationFrame(id);
    } else {
      setDrawerOpened(false);
    }
  }, [selectedItem]);

  const handleClose = () => {
    setClosingItem(selectedItem);
    setSelectedItem(null);
  };

  const handleExitTransitionEnd = () => {
    setClosingItem(null);
  };

  const showDrawer = selectedItem || isClosing;
  const drawerItem = selectedItem ?? closingItem;
  const opened = !!selectedItem && drawerOpened;

  return (
    <>
      <Paper withBorder p="md">
        <Group justify="space-between">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <Stack gap="xs" align="center" flex={1}>
                <Image
                  src={item.image}
                  alt={item.name}
                  maw={85}
                  height={120}
                  bdrs="md"
                />
                <Text size="sm">{item.name}</Text>
                <Text fw={500} size="sm">
                  {formatPrice(item.price)}
                </Text>
                <Rating value={4} readOnly size="xs" />
                <Text size="xs" c="dimmed">
                  galteeoutdoors.com
                </Text>

                <Button
                  variant="default"
                  size="xs"
                  onClick={() => setSelectedItem(item)}
                >
                  Buy
                </Button>
              </Stack>

              {index < items.length - 1 && <Divider orientation="vertical" />}
            </React.Fragment>
          ))}
        </Group>
      </Paper>

      {showDrawer && drawerItem && (
        <ProductDrawer
          opened={opened}
          onClose={handleClose}
          onExitTransitionEnd={handleExitTransitionEnd}
          item={drawerItem}
        />
      )}
    </>
  );
}
