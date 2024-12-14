/**
 * Formats an Ethereum address for display
 * @param address - The full Ethereum address
 * @param prefixLength - Number of characters to show at start
 * @param suffixLength - Number of characters to show at end
 */
export function formatAddress(
  address?: string,
  prefixLength = 6,
  suffixLength = 4
): string {
  if (!address) return '';
  if (address.length < prefixLength + suffixLength) return address;
  
  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}