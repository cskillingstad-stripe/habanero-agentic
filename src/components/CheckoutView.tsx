'use client';

import { Box, Button, Group, Image, Stack, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import Habanero from './Habanero';
import { Item } from './ProductMessage';
import { useCheckout } from '@stripe/react-stripe-js/checkout';

export const CheckoutView = ({ item }: { item: Item | null }) => {
  const checkoutState = useCheckout();

  const totalPrice =
    checkoutState.type === 'success'
      ? checkoutState.checkout?.lineItems?.[0]?.total?.amount
      : '$0.00';

  const currentQuantity =
    checkoutState.type === 'success'
      ? checkoutState.checkout?.lineItems?.[0]?.quantity
      : 1;

  const updateQuantity = (quantity: number) => {
    if (quantity < 1) {
      return;
    }

    if (checkoutState.type === 'success') {
      const { updateLineItemQuantity } = checkoutState.checkout;
      updateLineItemQuantity({
        lineItem: checkoutState.checkout?.lineItems?.[0]?.id,
        quantity,
      });
    }
  };

  return (
    <Stack gap="md" flex={1}>
      <Group>
        <Image src={item?.image} alt={item?.name} maw={48} bdrs="md" />
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            {item?.name}
          </Text>
          <Group gap="sm">
            <Text size="md" fw={500}>
              {totalPrice}
            </Text>
            <Button.Group>
              <Button
                variant="default"
                size="xs"
                p={5}
                h={24}
                onClick={() => updateQuantity(currentQuantity - 1)}
              >
                <IconMinus size={12} />
              </Button>
              <Button.GroupSection
                variant="default"
                bg="var(--mantine-color-body)"
                size="xs"
                h={24}
                w={24}
              >
                {currentQuantity}
              </Button.GroupSection>
              <Button
                variant="default"
                size="xs"
                p={5}
                h={24}
                onClick={() => updateQuantity(currentQuantity + 1)}
              >
                <IconPlus size={12} />
              </Button>
            </Button.Group>
          </Group>
        </Stack>
      </Group>

      <Box px={2}>
        <Habanero />
      </Box>
    </Stack>
  );
};
