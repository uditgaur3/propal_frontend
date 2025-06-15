import { useEffect } from 'react';

/**
 * Custom hook for setting page titles
 * @param title - The title to set for the page
 * @param suffix - Optional suffix to append (defaults to "proPAL AI")
 */
export const usePageTitle = (title: string, suffix: string = "proPAL AI") => {
  useEffect(() => {
    const fullTitle = title ? `${title} - ${suffix}` : suffix;
    document.title = fullTitle;
  }, [title, suffix]);
};

/**
 * Set page title directly without hook
 * @param title - The title to set for the page
 * @param suffix - Optional suffix to append (defaults to "proPAL AI")
 */
export const setPageTitle = (title: string, suffix: string = "proPAL AI") => {
  const fullTitle = title ? `${title} - ${suffix}` : suffix;
  document.title = fullTitle;
};
