export type IdentityFunc = () => void;

// Function that takes in I and returns O.
export type Func<I, O> = (val: I) => O;