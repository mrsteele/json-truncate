export type Options = {
  /** The max depth to build. */
  maxDepth?: number;
  /** What to replace the truncated reference to. */
  replace?: unknown;
  curDepth?: number;
};

/**
 * Truncates variables.
 * @param obj The object to truncate.
 * @param options If a number, the maxDepth, otherwise configurable options.
 * @returns The truncated object.
 */
declare function truncate<T>(obj: T, options?: Options | number): T;

export default truncate;
