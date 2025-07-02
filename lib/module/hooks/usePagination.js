"use strict";

import { useState, useCallback } from 'react';
export function usePagination({
  pageSize,
  initialData = [],
  onLoadMore,
  onError
}) {
  const [state, setState] = useState({
    data: initialData,
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
    totalPages: Math.ceil(initialData.length / pageSize),
    totalItems: initialData.length
  });
  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore || !onLoadMore) return;
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const newData = await onLoadMore(state.currentPage + 1);
      if (newData.length === 0) {
        setState(prev => ({
          ...prev,
          loading: false,
          hasMore: false
        }));
        return;
      }
      setState(prev => ({
        ...prev,
        data: [...prev.data, ...newData],
        loading: false,
        currentPage: prev.currentPage + 1,
        totalPages: Math.ceil((prev.data.length + newData.length) / pageSize),
        totalItems: prev.data.length + newData.length,
        hasMore: newData.length === pageSize
      }));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorObj
      }));
      onError?.(errorObj);
    }
  }, [state, onLoadMore, pageSize, onError]);
  const refresh = useCallback(async () => {
    if (state.loading || !onLoadMore) return;
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      currentPage: 1,
      hasMore: true
    }));
    try {
      const newData = await onLoadMore(1);
      setState(prev => ({
        ...prev,
        data: newData,
        loading: false,
        currentPage: 1,
        totalPages: Math.ceil(newData.length / pageSize),
        totalItems: newData.length,
        hasMore: newData.length === pageSize
      }));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorObj
      }));
      onError?.(errorObj);
    }
  }, [state.loading, onLoadMore, pageSize, onError]);
  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
      hasMore: true,
      currentPage: 1,
      totalPages: Math.ceil(initialData.length / pageSize),
      totalItems: initialData.length
    });
  }, [initialData, pageSize]);
  const setData = useCallback(data => {
    setState(prev => ({
      ...prev,
      data,
      totalPages: Math.ceil(data.length / pageSize),
      totalItems: data.length,
      hasMore: data.length >= pageSize
    }));
  }, [pageSize]);
  return {
    ...state,
    loadMore,
    refresh,
    reset,
    setData
  };
}
//# sourceMappingURL=usePagination.js.map