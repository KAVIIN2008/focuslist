import { useEffect, useState } from 'react';

type SetValue<T> = T | ((previousValue: T) => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue === null) {
        return initialValue;
      }

      const parsedValue: unknown = JSON.parse(storedValue);

      if (validate && !validate(parsedValue)) {
        return initialValue;
      }

      return parsedValue as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the application usable even if localStorage is unavailable.
    }
  }, [key, value]);

  const updateValue = (nextValue: SetValue<T>) => {
    setValue((previousValue) =>
      typeof nextValue === 'function'
        ? (nextValue as (previousValue: T) => T)(previousValue)
        : nextValue,
    );
  };

  return [value, updateValue] as const;
}