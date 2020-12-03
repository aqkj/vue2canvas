

export function hot(code: string) {
  return `${code}
  /* hot reload */
  if (module.hot) {
    console.log('hot')
  }
  `
}