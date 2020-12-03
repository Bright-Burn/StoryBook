import {useState} from 'react';

export const useLocalStorage = (key: string | undefined, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = key && window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        key && window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  };
  return [storedValue, setValue]
}
