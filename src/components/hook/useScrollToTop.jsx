// hook/useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small timeout to ensure the DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      
      // Additional scroll reset for safety
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);
}