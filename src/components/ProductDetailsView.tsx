'use client';

import { Button, Group, Image, Stack, Text } from '@mantine/core';
import { STRIPE_PRIMARY_COLOR } from '@/constants';
import type { Item } from './ProductMessage';

const formatPrice = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

export const ProductDetailsView = ({
  item,
  sizeOptions,
  colorOptions,
  selectedSize,
  selectedColor,
  onSelectSize,
  onSelectColor,
  onBuy,
}: {
  item: Item | null;
  sizeOptions: string[];
  colorOptions: string[];
  selectedSize: string;
  selectedColor: string;
  onSelectSize: (size: string) => void;
  onSelectColor: (color: string) => void;
  onBuy: () => void;
}) => {
  if (!item) {
    return null;
  }

  return (
    <Stack gap="md">
      <Image
        src={item.image}
        alt={item.name}
        h={190}
        fit="contain"
        radius="md"
      />

      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap={2} flex={1}>
          <Text size="lg" fw={600}>
            {item.name}
          </Text>
          <Text size="sm" c="dimmed">
            {item.description}
          </Text>
        </Stack>
        <Text size="xl" fw={700} ml="md">
          {formatPrice(item.usdPrice)}
        </Text>
      </Group>

      <Stack gap={6}>
        <Text size="sm" fw={500}>
          Size
        </Text>
        <Group gap="xs">
          {sizeOptions.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? 'filled' : 'outline'}
              color={STRIPE_PRIMARY_COLOR}
              size="xs"
              onClick={() => onSelectSize(size)}
            >
              {size}
            </Button>
          ))}
        </Group>
      </Stack>

      <Stack gap={6}>
        <Text size="sm" fw={500}>
          Color
        </Text>
        <Group gap="xs">
          {colorOptions.map((color) => (
            <Button
              key={color}
              variant={selectedColor === color ? 'filled' : 'outline'}
              color={STRIPE_PRIMARY_COLOR}
              size="xs"
              onClick={() => onSelectColor(color)}
            >
              {color}
            </Button>
          ))}
        </Group>
      </Stack>

      <Button mt="sm" color={STRIPE_PRIMARY_COLOR} onClick={onBuy}>
        Buy
      </Button>
    </Stack>
  );
};
