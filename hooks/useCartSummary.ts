import { formatPriceMoney } from '@/utils/numbers';

import { useAppSelector } from './useAppSelector';

export const useCartSummary = () => {
  const cartItemsMap = useAppSelector((state) => state.cart.items);
  const catalogItems = useAppSelector((state) => state.catalog.items);

  const cartItems = Object.keys(cartItemsMap).map(
    (cartItemId) => catalogItems[cartItemId]
  );

  if (cartItems.length === 0) {
    return {
      subtotal: '',
      shipping: '',
      taxes: '',
      total: '',
    };
  }

  const currency =
    cartItems?.[0]?.variations?.[0]?.itemVariationData?.priceMoney?.currency;
  const subtotal = cartItems.reduce((prev, curr) => {
    const price =
      Number(curr.variations?.[0]?.itemVariationData?.priceMoney?.amount ?? 0) *
      (cartItemsMap[curr.id] ?? 0);
    return prev + price;
  }, 0);
  const shipping = 700;
  const taxes = subtotal * 0.095;
  const total = subtotal + shipping + taxes;

  return {
    subtotal: formatPriceMoney({ amount: subtotal, currency }),
    shipping: formatPriceMoney({ amount: shipping, currency }),
    taxes: formatPriceMoney({ amount: taxes, currency }),
    total: formatPriceMoney({ amount: total, currency }),
  };
};
