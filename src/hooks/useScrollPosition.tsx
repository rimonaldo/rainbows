// hooks/useScrollPosition.ts
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export const useScrollPosition = (debounceTime: number = 100) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    setPrevScrollPos(currentScrollPos);
  }, debounceTime);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return prevScrollPos;
};
