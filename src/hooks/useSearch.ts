import { useCallback, useEffect, useMemo, useState } from 'react';

/** Options for {@link useSearch}. @example `useSearch<Product>({ data: products, searchFields: ['name'] })` */
export interface SearchOptions<T> {
  /** Source items; results recompute when this identity changes. */
  data: readonly T[];
  /** Typed item properties included in text matching. */
  searchFields: readonly (keyof T)[];
  /** Delay before applying a new query; defaults to 300 ms. */
  debounceMs?: number;
  /** Preserves letter case while matching. */
  caseSensitive?: boolean;
  /** Retained for v1 compatibility. Use highlightText while rendering instead of mutating T. */
  highlightResults?: boolean;
}

/** Current typed search state returned by {@link useSearch}. */
export interface SearchState<T> {
  /** The immediately entered query. */
  query: string;
  /** Filtered items after debounce completes. */
  results: T[];
  /** True while `query` is waiting for its debounce interval. */
  loading: boolean;
  /** Compatibility alias for unmodified `results`. */
  highlightedResults: T[];
}

/** Imperative operations returned by {@link useSearch}. */
export interface SearchActions {
  /** Sets a debounced query. */
  setQuery: (query: string) => void;
  /** Clears query and synchronously restores source items. */
  clearSearch: () => void;
  /** Alias for `setQuery`. */
  search: (query: string) => void;
  /** Returns markdown-marked text when `highlightResults` is enabled. */
  highlightText: (text: string) => string;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Type-safe debounced local search that never mutates source items.
 *
 * @example
 * ```tsx
 * const { results, setQuery } = useSearch<User>({ data: users, searchFields: ['name', 'email'] });
 * ```
 */
export function useSearch<T>({ data, searchFields, debounceMs = 300, caseSensitive = false, highlightResults = false }: SearchOptions<T>): SearchState<T> & SearchActions {
  const [query, setQueryState] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), Math.max(0, debounceMs));
    return () => clearTimeout(timer);
  }, [debounceMs, query]);

  const results = useMemo(() => {
    const term = debouncedQuery.trim();
    if (!term) return [...data];
    const comparisonTerm = caseSensitive ? term : term.toLocaleLowerCase();
    return data.filter(item => searchFields.some(field => {
      const value = item[field];
      if (value == null) return false;
      const text = String(value);
      return (caseSensitive ? text : text.toLocaleLowerCase()).includes(comparisonTerm);
    }));
  }, [caseSensitive, data, debouncedQuery, searchFields]);

  const setQuery = useCallback((nextQuery: string) => setQueryState(nextQuery), []);
  const clearSearch = useCallback(() => { setQueryState(''); setDebouncedQuery(''); }, []);
  const highlightText = useCallback((text: string) => {
    if (!highlightResults || !debouncedQuery.trim()) return text;
    return text.replace(new RegExp(`(${escapeRegExp(debouncedQuery)})`, caseSensitive ? 'g' : 'gi'), '**$1**');
  }, [caseSensitive, debouncedQuery, highlightResults]);

  return {
    query,
    results,
    loading: query !== debouncedQuery,
    highlightedResults: results,
    setQuery,
    clearSearch,
    search: setQuery,
    highlightText,
  };
}
