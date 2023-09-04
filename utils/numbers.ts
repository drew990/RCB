import { Money } from 'square';

type FormatPriceMoneyProps = {
  amount?: bigint | number | null;
  currency?: string;
};

export const formatPriceMoney = ({
  amount,
  currency,
}: FormatPriceMoneyProps = {}) => {
  if (!amount) return null;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    Number(amount) / 100
  );
};
