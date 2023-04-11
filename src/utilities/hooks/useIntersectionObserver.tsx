import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver(
  options?: Partial<{ root: null | Element; rootMargin: string; threshold: number | number[] }>,
) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  function callback(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    setOnScreen(entry.isIntersecting);
  }

  useEffect(() => {
    let run = true;
    const { current } = elementRef;
    const observer = new IntersectionObserver(callback, options);
    if (run) {
      if (current !== null) observer.observe(current);
      // if (current !== null) console.log('current.id:', current.id);;
    }
    return () => {
      run = false;
      if (current !== null) observer.unobserve(current);
    };
  }, [elementRef, onScreen, options]);

  return { elementRef, onScreen };
}

useIntersectionObserver.defaultProps = {
  root: null,
  rootMargin: '0px',
  threshold: [0.7, 0.8, 0.9, 1],
};
