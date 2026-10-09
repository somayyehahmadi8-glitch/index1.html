export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(1) : millions.toFixed(2)} Million`;
  }
  return `$${price.toLocaleString()}`;
}

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(1) : millions.toFixed(2)}M`;
  }
  if (price >= 1_000) {
    return `$${(price / 1_000).toFixed(0)}K`;
  }
  return `$${price.toLocaleString()}`;
}
