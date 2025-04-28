// using Symbol.for to ensure the symbols are equivalent cross-realm, although this will lose out on a small amount of code size
export const [REF, SUBSCRIBERS] = ["ds:r", "ds:s"].map((name) =>
  Symbol.for(name)
);
