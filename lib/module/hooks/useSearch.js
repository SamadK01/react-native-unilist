"use strict";

import { useCallback, useEffect, useMemo, useState } from 'react';

/** Options for {@link useSearch}. @example `useSearch<Product>({ data: products, searchFields: ['name'] })` */

/** Current typed search state returned by {@link useSearch}. */

/** Imperative operations returned by {@link useSearch}. */

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Type-safe debounced local search that never mutates source items.
 *
 * @example
 * ```tsx
 * const { results, setQuery } = useSearch<User>({ data: users, searchFields: ['name', 'email'] });
 * ```
 */
export function useSearch({
  data,
  searchFields,
  debounceMs = 300,
  caseSensitive = false,
  highlightResults = false
}) {
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
  const setQuery = useCallback(nextQuery => setQueryState(nextQuery), []);
  const clearSearch = useCallback(() => {
    setQueryState('');
    setDebouncedQuery('');
  }, []);
  const highlightText = useCallback(text => {
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
    highlightText
  };
}
//# sourceMappingURL=useSearch.js.map