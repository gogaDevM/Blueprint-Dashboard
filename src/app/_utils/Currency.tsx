const format = (
  symbol: string | undefined,
  amount: number | undefined
): string => {
  if (!amount) return `${symbol ? symbol : ""}0.00`;
  const formattedAmount = (amount / 100)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return `${symbol ? symbol : ""}${formattedAmount}`;
};

const Currency = {
  format,
};

export default Currency;
