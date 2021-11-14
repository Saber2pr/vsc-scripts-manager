export const parsePathName = (path: string) => {
  if (typeof path === 'string') {
    const paths = path.split(/\/|\\/g)
    return paths.pop()
  }
}
