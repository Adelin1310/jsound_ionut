import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(`${process.env.NEXT_PUBLISHABLE_KEY_STRIPE}`);
  }

  return stripePromise;
}

export default getStripe;