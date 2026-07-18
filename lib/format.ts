export function formatLdc(value: number | string): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(n)) return String(value);
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatMoney(value: string | number): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(n)) return String(value);
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function regionFromGroup(group: string): string {
  if (/香港|HK/i.test(group)) return "香港";
  if (/美国|US/i.test(group)) return "美国";
  if (/德国|DE|德/i.test(group)) return "德国";
  if (/日本|JP/i.test(group)) return "日本";
  if (/新加坡|SG/i.test(group)) return "新加坡";
  if (/CDN|cdn/i.test(group)) return "CDN";
  if (/住宅|IP/i.test(group)) return "住宅 IP";
  if (/裸金属/i.test(group)) return "裸金属";
  return "全球";
}

export function daysUntil(dateStr: string): number {
  const t = new Date(dateStr.replace(" ", "T")).getTime();
  const now = Date.now();
  return Math.ceil((t - now) / (1000 * 60 * 60 * 24));
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
