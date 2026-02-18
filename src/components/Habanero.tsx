import { useEffect, useState } from 'react';
import {
  useCheckout,
  PaymentFormElement,
} from '@stripe/react-stripe-js/checkout';
import { useSearchParams } from 'next/navigation';

export default function Habanero() {
  const checkoutState = useCheckout();
  const [showBorder, setShowBorder] = useState(false);
  const searchParams = useSearchParams();

  // Show border around Habanero on Cmd + H
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setShowBorder((b) => !b);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Expose checkout to window for debugging
  useEffect(() => {
    if (checkoutState.type === 'success' && checkoutState.checkout) {
      // @ts-expect-error - checkout not typed on window
      window.checkout = checkoutState.checkout;
    }
  }, [checkoutState]);

  return (
    <div
      style={{
        boxShadow: showBorder ? '0 0 0 2px #2563eb' : undefined,
        borderRadius: showBorder ? '8px' : undefined,
      }}
    >
      <PaymentFormElement
        options={{
          layout: 'compact',
          contacts:
            searchParams.get('returningUser') === 'true'
              ? [
                  {
                    name: 'Jenny Rosen',
                    address: {
                      line1: '354 Oyster Point Blvd',
                      city: 'South San Francisco',
                      state: 'CA',
                      country: 'US',
                      postal_code: '94080',
                    },
                  },
                ]
              : undefined,
        }}
        onChange={(event) => {
          console.log('bblog change: ', event);
        }}
        onReady={(element) => {
          console.log('bblog ready: ', element);

          // Expose to window for debugging
          window.paymentFormElement = element;
        }}
        onFocus={(event) => {
          console.log('bblog focus: ', event);
        }}
        onBlur={(event) => {
          console.log('bblog blur: ', event);
        }}
        onEscape={(event) => {
          console.log('bblog escape');
        }}
        onLoadError={(event) => {
          console.log('bblog loaderror: ', event);
        }}
        onLoaderStart={(event) => {
          console.log('bblog loaderstart: ', event);
        }}
        onConfirm={(event) => {
          console.log('bblog confirm: ', event);

          if (checkoutState.type === 'success' && checkoutState.checkout) {
            const { checkout } = checkoutState;

            checkout.confirm({
              // @ts-expect-error - paymentFormConfirmEvent is not public yet
              paymentFormConfirmEvent: event,
              // Placeholder until we collect email
              // email: 'test@stripe.com',
            });
          }
        }}
      />
    </div>
  );
}
