import type { Stripe, StripeConstructorOptions } from '@stripe/stripe-js';

declare global {
  interface Window {
    Stripe?: (
      publishableKey: string,
      options?: StripeConstructorOptions
    ) => Stripe;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadLocalStripe = async (
  publishableKey: string,
  options?: StripeConstructorOptions
): Promise<Stripe | null> => {
  const maxWaitMs = 10000;
  const pollIntervalMs = 100;
  let waited = 0;

  while (waited < maxWaitMs) {
    if (typeof window !== 'undefined' && window.Stripe) {
      return window.Stripe(publishableKey, options);
    }
    await sleep(pollIntervalMs);
    waited += pollIntervalMs;
  }

  console.error('Stripe.js failed to load within timeout');
  return null;
};
