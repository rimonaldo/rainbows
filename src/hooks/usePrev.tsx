import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  // Use a ref to store the previous value
  const ref = useRef<T | undefined>();

  // After each render, update the previous value to the current one
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value (will be `undefined` on the initial render)
  return ref.current;
}
