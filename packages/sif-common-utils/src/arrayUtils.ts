export const nthItemFilter = (index: number, nth: number): boolean => nth === 1 || index === 0 || index % nth === 0;
