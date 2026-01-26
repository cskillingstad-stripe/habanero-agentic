import { useEffect, useRef } from 'react';
import { useCheckout } from '@stripe/react-stripe-js/checkout';

export default function Habanero() {
  const checkoutState = useCheckout();
  const ref = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  // No <HabaneroElement exists yet, use checkout.createhHabaneroElement to hack it in
  useEffect(() => {
    if (checkoutState.type === 'success' && !didMount.current) {
      const { checkout } = checkoutState;

      window.checkout = checkout;

      // Dont create twice. Hacky until we have a <PaymentFormElement /> component
      // @ts-expect-error - checkout.getPaymentFormElement is not public yet
      const existingHabaneroElement = checkout.getPaymentFormElement();
      if (existingHabaneroElement) {
        didMount.current = true;
        existingHabaneroElement.mount(ref.current);
        return;
      }

      // @ts-expect-error - checkout.createPaymentFormElement is not public yet
      const habaneroElement = checkout.createPaymentFormElement({
        layout: 'compact',
      });

      // Add event logs for bug bash
      // @ts-expect-error - event not typed
      habaneroElement.on('change', (event) => {
        console.log('bblog change: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('ready', (event) => {
        console.log('bblog ready: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('focus', (event) => {
        console.log('bblog focus: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('blur', (event) => {
        console.log('bblog blur: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('escape', (event) => {
        console.log('bblog escape: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('loaderror', (event) => {
        console.log('bblog loaderror: ', event);
      });
      // @ts-expect-error - event not typed
      habaneroElement.on('loaderstart', (event) => {
        console.log('bblog loaderstart: ', event);
      });

      // @ts-expect-error - event not typed
      habaneroElement.on('confirm', (event) => {
        console.log('bblog confirm: ', event);

        checkout.confirm({
          // @ts-expect-error - paymentFormConfirmEvent is not public yet
          paymentFormConfirmEvent: event,
          // Placeholder until we collect email
          // email: 'test@stripe.com',
        });
      });

      window.habaneroElement = habaneroElement;

      habaneroElement.mount(ref.current);
      didMount.current = true;
    }
  }, [checkoutState]);

  return <div ref={ref} />;
}
