export const cx = (...args: unknown[]) =>
  args.filter((x) => typeof x === "string").join(" ");
