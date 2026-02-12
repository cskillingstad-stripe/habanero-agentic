'use client';

import {useState, useEffect} from 'react';
import {loadStripe, Appearance} from '@stripe/stripe-js';
import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import {Stack, Text} from '@mantine/core';
import ProductMessage from '@/components/ProductMessage';
import {Loader} from '@mantine/core';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PK!, {
  betas: ['custom_checkout_payment_form_1'],
});

export default function Home() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',

    variables: {
      // Checkout uses 500 for medium weight (ie. in the Pay Button)
      fontWeightMedium: '500',
      // Galtee primary color (button)
      colorPrimary: '#222725',
    },

    // Make it look like Galtee Figma
    inputs: 'condensed',
    labels: 'floating',
  };

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        clientSecret,
        adaptivePricing: {
          allowed: true,
        },
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
            brand. Let me know if you&apos;d like to find anything else.
          </Text>

          <ProductMessage />
        </Stack>
      </Stack>
    </CheckoutProvider>
  );
}
