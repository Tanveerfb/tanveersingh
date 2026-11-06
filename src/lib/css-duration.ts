/**
 * A CSS duration in milliseconds. Tokens read at runtime may come back in either unit: the CSS
 * minifier turns `2900ms` into `2.9s` but leaves `60ms` alone.
 */
export function cssDurationMs(value: string): number {
  const number = parseFloat(value);
  return value.trim().endsWith("ms") ? number : number * 1000;
}
