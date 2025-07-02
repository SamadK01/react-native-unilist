import { useState, useCallback, useMemo } from 'react';

export interface SearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  debounceMs?: number;
  caseSensitive?: boolean;
  highlightResults?: boolean;
}

export interface SearchState<T> {
  query: string;
  results: T[];
  loading: boolean;
  highlightedResults: T[];
}

export interface SearchActions {
  setQuery: (query: string) => void;
  clearSearch: () => void;
  search: (query: string) => void;
}

export function useSearch<T>({
  data,
  searchFields,
  debounceMs = 300,
  caseSensitive = false,
  highlightResults = false,
}: SearchOptions<T>): SearchState<T> & SearchActions {
  const [state, setState] = useState<SearchState<T>>({
    query: '',
    results: data,
    loading: false,
    highlightedResults: data,
  });

  const searchData = useCallback((query: string, searchData: T[]): T[] => {
    if (!query.trim()) return searchData;

    const searchTerm = caseSensitive ? query : query.toLowerCase();

    return searchData.filter(item => {
      return searchFields.some(field => {
        const fieldValue = item[field];
        if (fieldValue == null) return false;

        const stringValue = String(fieldValue);
        const compareValue = caseSensitive ? stringValue : stringValue.toLowerCase();

        return compareValue.includes(searchTerm);
      });
    });
  }, [searchFields, caseSensitive]);

  const highlightText = useCallback((text: string, query: string): string => {
    if (!highlightResults || !query.trim()) return text;

    const regex = new RegExp(`(${query})`, caseSensitive ? 'g' : 'gi');
    return text.replace(regex, '**$1**'); // Simple highlighting with markdown-style
  }, [highlightResults, caseSensitive]);

  const setQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, query, loading: true }));

    // Debounced search
    const timeoutId = setTimeout(() => {
      const results = searchData(query, data);
      const highlightedResults = highlightResults 
        ? results.map(item => {
            const highlightedItem = { ...item };
            searchFields.forEach(field => {
              const value = item[field];
              if (value != null) {
                highlightedItem[field] = highlightText(String(value), query) as any;
              }
            });
            return highlightedItem;
          })
        : results;

      setState(prev => ({
        ...prev,
        results,
        highlightedResults,
        loading: false,
      }));
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchData, data, highlightResults, searchFields, highlightText, debounceMs]);

  const clearSearch = useCallback(() => {
    setState({
      query: '',
      results: data,
      loading: false,
      highlightedResults: data,
    });
  }, [data]);

  const search = useCallback((query: string) => {
    setQuery(query);
  }, [setQuery]);

  // Memoized search results
  const memoizedResults = useMemo(() => {
    return state.query ? state.results : data;
  }, [state.query, state.results, data]);

  return {
    query: state.query,
    results: memoizedResults,
    loading: state.loading,
    highlightedResults: state.highlightedResults,
    setQuery,
    clearSearch,
    search,
  };
} 