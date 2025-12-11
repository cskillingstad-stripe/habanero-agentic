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

      // Dont mount twice. Hacky until we have a <PaymentFormElement /> component
      // @ts-expect-error - checkout.getPaymentFormElement is not public yet
      const existingHabaneroElement = checkout.getPaymentFormElement();
      if (existingHabaneroElement) {
        didMount.current = true;
        existingHabaneroElement.mount(ref.current);
        return;
      }

      // @ts-expect-error - checkout.createPaymentFormElement is not public yet
      const habaneroElement = checkout.createPaymentFormElement();

      // @ts-expect-error - event not typed
      habaneroElement.on('confirm', (event) => {
        checkout.confirm({
          // @ts-expect-error - paymentFormConfirmEvent is not public yet
          paymentFormConfirmEvent: event,
          // Placeholder until we collect email
          // email: 'test@stripe.com',
        });
      });

      habaneroElement.mount(ref.current);
      didMount.current = true;
    }
  }, [checkoutState]);

  return <div ref={ref} />;
}
