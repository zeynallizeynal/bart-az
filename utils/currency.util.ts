export function formatCurrency(value: number) {
  // const formattedValue =
  return new Intl.NumberFormat("us-US", {
    currency: "AZN",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("AZN", "")
    .trim();

  // return formattedValue + " ₼";
}
