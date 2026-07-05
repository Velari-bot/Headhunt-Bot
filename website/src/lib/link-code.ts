const CODE_PREFIX = "HH";
const CODE_DIGITS = 4;

export function generateLinkCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${CODE_PREFIX}-${digits}`;
}

export function getLinkCodeExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000);
}

export function formatTimeRemaining(expiresAt: Date): string {
  const ms = expiresAt.getTime() - Date.now();
  if (ms <= 0) return "Expired";

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
