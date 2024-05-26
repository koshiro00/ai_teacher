import { RefObject, useEffect, useState } from 'react';

export const useInView = (ref: RefObject<HTMLElement>) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      // entry.iisIntersecting: 要素が完全にビューポートに入っていれば true
      setInView(entry.isIntersecting);
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return inView;
};
