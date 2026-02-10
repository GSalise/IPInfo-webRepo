export function isIPValid(ipAddress: string): boolean {
  const pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (!pattern.test(ipAddress)) return false;

  const parts = ipAddress.split(".");
  for (const part of parts) {
    const n = parseInt(part, 10);
    if (n < 0 || n > 255) return false;
  }

  return true;
}
