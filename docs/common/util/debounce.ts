export const debounce = (fn: any, interval: number) => {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(null, ...args), interval)
  }
}