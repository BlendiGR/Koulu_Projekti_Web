import { useState, useCallback } from 'react';


export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);


  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);


  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const setLoadingError = useCallback((err) => {
    const errorMessage = err?.message || err || 'An error occurred';
    setError(errorMessage);
    setLoading(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setLoading(initialState);
    setError(null);
  }, [initialState]);


  const withLoading = useCallback(async (asyncFn) => {
    startLoading();
    try {
      const result = await asyncFn();
      stopLoading();
      return result;
    } catch (err) {
      setLoadingError(err);
      throw err;
    }
  }, [startLoading, stopLoading, setLoadingError]);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    clearError,
    reset,
    withLoading,
  };
};
