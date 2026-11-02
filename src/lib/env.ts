import { z } from "zod";

/**
 * Client environment, parsed at startup. Each variable is referenced in full —
 * Next.js inlines `process.env.NEXT_PUBLIC_*` at build time and cannot see a
 * dynamic lookup. Server variables live in `@/lib/server-env`.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

/**
 * Parses an environment object, throwing with the offending variable names so
 * a bad value stops the app at startup rather than breaking a page later.
 */
export function parseEnv<T extends z.ZodType>(
  schema: T,
  values: Record<string, unknown>,
  label: string,
): z.infer<T> {
  const result = schema.safeParse(values);
  if (!result.success) {
    const names = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Invalid ${label} environment variables: ${names}`);
  }
  return result.data;
}

export const clientEnv = parseEnv(
  clientEnvSchema,
  { NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL },
  "client",
);
