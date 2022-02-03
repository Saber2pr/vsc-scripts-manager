export const getArray = <T = any>(array: T[]) =>
  Array.isArray(array) ? array : []

export const dedup = <T>(array: T[], compare: (a: T, b: T) => boolean) =>
  array.reduce(
    (acc, item) => (acc.find(i => compare(i, item)) ? acc : acc.concat(item)),
    []
  )
