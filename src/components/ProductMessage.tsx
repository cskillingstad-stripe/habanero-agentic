'use client';

import { useState } from 'react';
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

  return (
    <>
      <Paper withBorder p="md">
        <Group justify="space-between">
          {items.map((item, index) => (
            <>
              <Stack key={item.id} gap="xs" align="center" flex={1}>
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
            </>
          ))}
        </Group>
      </Paper>

      <ProductDrawer
        opened={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </>
  );
}
