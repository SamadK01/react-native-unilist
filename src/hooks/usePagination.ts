import { useCallback, useRef, useState } from 'react';

/** Options for {@link usePagination}. @example `usePagination<Message>({ pageSize: 30, onLoadMore: fetchPage })` */
export interface PaginationOptions<T> {
  /** Expected server page size; values below one are clamped to one. */
  pageSize: number;
  /** Already-loaded first-page items. */
  initialData?: readonly T[];
  /** Receives the 1-based page to fetch and returns typed new items. */
  onLoadMore?: (page: number) => Promise<readonly T[]>;
  /** Receives normalized errors from load or refresh operations. */
  onError?: (error: Error) => void;
}

/** Typed state returned by {@link usePagination}. */
export interface PaginationState<T> {
  /** Loaded items in display order. */
  data: T[];
  /** True while a request is in flight. */
  loading: boolean;
  /** Most recent normalized error, if any. */
  error: Error | null;
  /** False after a short/empty page is received. */
  hasMore: boolean;
  /** Last successfully loaded 1-based page. */
  currentPage: number;
  /** Number of locally loaded pages. */
  totalPages: number;
  /** Number of locally loaded items. */
  totalItems: number;
}

/** Operations returned by {@link usePagination}. */
export interface PaginationActions<T> {
  /** Loads the next page; overlapping calls are ignored. */
  loadMore: () => Promise<void>;
  /** Reloads page one and replaces current data. */
  refresh: () => Promise<void>;
  /** Restores current `initialData`. */
  reset: () => void;
  /** Replaces data while preserving the generic item type. */
  setData: (data: readonly T[]) => void;
}

const errorFrom = (error: unknown) => error instanceof Error ? error : new Error('Unknown error');

/**
 * Serializes async pagination and preserves exact item types in all actions.
 *
 * @example
 * ```tsx
 * const pager = usePagination<Product>({ pageSize: 20, onLoadMore: page => api.products(page) });
 * <UniList data={pager.data} renderItem={renderProduct} onEndReached={pager.loadMore} />
 * ```
 */
export function usePagination<T>({ pageSize, initialData = [], onLoadMore, onError }: PaginationOptions<T>): PaginationState<T> & PaginationActions<T> {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const initialDataRef = useRef(initialData);
  initialDataRef.current = initialData;
  const inFlight = useRef(false);
  const requestId = useRef(0);
  const [state, setState] = useState<PaginationState<T>>(() => ({
    data: [...initialData], loading: false, error: null, hasMore: true, currentPage: 1,
    totalPages: Math.ceil(initialData.length / safePageSize), totalItems: initialData.length,
  }));
  const stateRef = useRef(state);
  const commit = useCallback((next: PaginationState<T>) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const loadMore = useCallback(async () => {
    if (inFlight.current || !onLoadMore) return;
    const current = stateRef.current;
    if (!current.hasMore) return;
    const nextPage = current.currentPage + 1;
    commit({ ...current, loading: true, error: null });
    inFlight.current = true;
    const operation = ++requestId.current;
    try {
      const received = [...await onLoadMore(nextPage)];
      if (operation !== requestId.current) return;
      const previous = stateRef.current;
      commit({
        ...previous,
        data: received.length ? [...previous.data, ...received] : previous.data,
        loading: false,
        currentPage: received.length ? nextPage : previous.currentPage,
        totalPages: Math.ceil((previous.data.length + received.length) / safePageSize),
        totalItems: previous.data.length + received.length,
        hasMore: received.length === safePageSize,
      });
    } catch (error) {
      if (operation !== requestId.current) return;
      const normalized = errorFrom(error);
      commit({ ...stateRef.current, loading: false, error: normalized });
      onError?.(normalized);
    } finally {
      if (operation === requestId.current) inFlight.current = false;
    }
  }, [commit, onError, onLoadMore, safePageSize]);

  const refresh = useCallback(async () => {
    if (inFlight.current || !onLoadMore) return;
    inFlight.current = true;
    const operation = ++requestId.current;
    commit({ ...stateRef.current, loading: true, error: null });
    try {
      const received = [...await onLoadMore(1)];
      if (operation !== requestId.current) return;
      commit({ ...stateRef.current, data: received, loading: false, currentPage: 1, totalPages: Math.ceil(received.length / safePageSize), totalItems: received.length, hasMore: received.length === safePageSize });
    } catch (error) {
      if (operation !== requestId.current) return;
      const normalized = errorFrom(error);
      commit({ ...stateRef.current, loading: false, error: normalized });
      onError?.(normalized);
    } finally {
      if (operation === requestId.current) inFlight.current = false;
    }
  }, [commit, onError, onLoadMore, safePageSize]);

  const reset = useCallback(() => {
    requestId.current += 1;
    inFlight.current = false;
    const nextData = [...initialDataRef.current];
    commit({ data: nextData, loading: false, error: null, hasMore: true, currentPage: 1, totalPages: Math.ceil(nextData.length / safePageSize), totalItems: nextData.length });
  }, [commit, safePageSize]);

  const setData = useCallback((nextData: readonly T[]) => {
    const copy = [...nextData];
    commit({ ...stateRef.current, data: copy, totalPages: Math.ceil(copy.length / safePageSize), totalItems: copy.length, hasMore: copy.length >= safePageSize });
  }, [commit, safePageSize]);

  return { ...state, loadMore, refresh, reset, setData };
}
