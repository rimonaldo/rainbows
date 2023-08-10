import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 * @param value - The value to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value or the delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only call effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
