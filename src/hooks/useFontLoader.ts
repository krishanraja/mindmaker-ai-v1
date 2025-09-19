import { useState, useEffect } from 'react';

interface FontLoaderState {
  isLoaded: boolean;
  isLoading: boolean;
  error: boolean;
}

export const useFontLoader = (fontFamily: string): FontLoaderState => {
  const [state, setState] = useState<FontLoaderState>({
    isLoaded: false,
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    // Check if font is already loaded
    if (document.fonts.check(`1em ${fontFamily}`)) {
      setState({ isLoaded: true, isLoading: false, error: false });
      return;
    }

    // Set loading timeout for poor connections
    const timeout = setTimeout(() => {
      setState({ isLoaded: false, isLoading: false, error: true });
    }, 3000); // 3 second timeout

    // Use Font Loading API to detect when font is ready
    const loadFont = async () => {
      try {
        await document.fonts.load(`1em ${fontFamily}`);
        clearTimeout(timeout);
        setState({ isLoaded: true, isLoading: false, error: false });
      } catch (error) {
        clearTimeout(timeout);
        setState({ isLoaded: false, isLoading: false, error: true });
      }
    };

    // Listen for font load events
    const handleFontLoad = () => {
      if (document.fonts.check(`1em ${fontFamily}`)) {
        clearTimeout(timeout);
        setState({ isLoaded: true, isLoading: false, error: false });
      }
    };

    document.fonts.addEventListener('loadingdone', handleFontLoad);
    loadFont();

    return () => {
      clearTimeout(timeout);
      document.fonts.removeEventListener('loadingdone', handleFontLoad);
    };
  }, [fontFamily]);

  return state;
};