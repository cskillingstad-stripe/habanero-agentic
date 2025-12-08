'use client';

import { loadStripe, Appearance } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { Stack, Text } from '@mantine/core';
import ProductMessage from '@/components/ProductMessage';

const stripePromise = loadStripe('pk_test_fEnfqkUj7brxj0AAGO5Ig8rg', {
  betas: [
    // "custom_checkout_beta_6",
    // 'custom_checkout_adaptive_pricing_2',
    // "custom_checkout_tax_id_1",
    'custom_checkout_habanero_1',
  ],
});

export default function Home() {
  const fetchClientSecret = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    return data.clientSecret;
  };

  const appearance: Appearance = {
    theme: 'stripe',

    variables: {
      // Checkout uses 500 for medium weight (ie. in the Pay Button)
      fontWeightMedium: '500',
    },

    // Make it look like Galtee Figma
    // @ts-expect-error - condensed inputs not GA'ed yet
    inputs: 'condensed',
    labels: 'floating',
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret,
        elementsOptions: {
          appearance,
          savedPaymentMethod: {
            // Default is 'auto' in clover
            enableSave: 'auto',
            // Default is 'auto' in clover
            enableRedisplay: 'auto',
          },
        },
      }}
    >
      <Stack p="md">
        <Text bdrs="md" p="md" bg="gray.1" maw={'75%'} ml="auto">
          Can you find some warm jackets for my weekend camping trip, based on
          the weather?
        </Text>

        <Stack gap="xs">
          <Text bdrs="md" p="md">
            Sure! It should be fairly mild this weekend, with cold mornings and
            spots of rain. Here are a few great options from your favoriate
            brand. Let me know if you'd like to find anything else.
          </Text>

          <ProductMessage />
        </Stack>
      </Stack>
    </CheckoutProvider>
  );
}
