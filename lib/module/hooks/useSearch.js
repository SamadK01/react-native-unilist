"use strict";

import { useState, useCallback, useMemo } from 'react';
export function useSearch({
  data,
  searchFields,
  debounceMs = 300,
  caseSensitive = false,
  highlightResults = false
}) {
  const [state, setState] = useState({
    query: '',
    results: data,
    loading: false,
    highlightedResults: data
  });
  const searchData = useCallback((query, searchData) => {
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
  const highlightText = useCallback((text, query) => {
    if (!highlightResults || !query.trim()) return text;
    const regex = new RegExp(`(${query})`, caseSensitive ? 'g' : 'gi');
    return text.replace(regex, '**$1**'); // Simple highlighting with markdown-style
  }, [highlightResults, caseSensitive]);
  const setQuery = useCallback(query => {
    setState(prev => ({
      ...prev,
      query,
      loading: true
    }));

    // Debounced search
    const timeoutId = setTimeout(() => {
      const results = searchData(query, data);
      const highlightedResults = highlightResults ? results.map(item => {
        const highlightedItem = {
          ...item
        };
        searchFields.forEach(field => {
          const value = item[field];
          if (value != null) {
            highlightedItem[field] = highlightText(String(value), query);
          }
        });
        return highlightedItem;
      }) : results;
      setState(prev => ({
        ...prev,
        results,
        highlightedResults,
        loading: false
      }));
    }, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [searchData, data, highlightResults, searchFields, highlightText, debounceMs]);
  const clearSearch = useCallback(() => {
    setState({
      query: '',
      results: data,
      loading: false,
      highlightedResults: data
    });
  }, [data]);
  const search = useCallback(query => {
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
    search
  };
}
//# sourceMappingURL=useSearch.js.map