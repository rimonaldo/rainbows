import { useRef, useEffect } from 'react';

function useMultiplePrevious<T>(value: T, size: number = 20): T[] {
  const ref = useRef<T[]>([]);

  useEffect(() => {
    ref.current = [value, ...ref.current.slice(0, size - 1)];
  }, [value, size]);

  return ref.current;
}

// Usage
// const prevValues = useMultiplePrevious(currentValue , 20);
