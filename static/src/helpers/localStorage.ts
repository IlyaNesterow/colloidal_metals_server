
export const setDefaults = (): void => {
  window.localStorage.setItem('theme', 'false')
}

export const toggleSmth = (key: string): void => 
  window.localStorage.setItem(
    key,
    window.localStorage.getItem(key) === 'true'
      ? 'false'
      : 'true'
  )
