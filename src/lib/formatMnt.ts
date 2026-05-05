/** MNT (₮) display helpers — uses mn-MN locale grouping. */

export function formatMnt(amount: number): string {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact headline, e.g. 857_000_000 → "857 сая ₮". */
export function formatMntSay(amount: number): string {
  const millions = Math.round(amount / 1_000_000);
  return `${millions.toLocaleString('mn-MN')} сая ₮`;
}
