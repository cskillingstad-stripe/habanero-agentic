import { useEffect } from 'react';
import {
  useCheckout,
  PaymentFormElement,
} from '@stripe/react-stripe-js/checkout';

export default function Habanero() {
  const checkoutState = useCheckout();

  // Expose checkout to window for debugging
  useEffect(() => {
    if (checkoutState.type === 'success' && checkoutState.checkout) {
      // @ts-expect-error - checkout not typed on window
      window.checkout = checkoutState.checkout;
    }
  }, [checkoutState]);

  return (
    <div>
      <PaymentFormElement
        options={{
          layout: 'compact',
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
