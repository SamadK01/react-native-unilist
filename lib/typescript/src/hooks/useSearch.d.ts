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
/**
 * Type-safe debounced local search that never mutates source items.
 *
 * @example
 * ```tsx
 * const { results, setQuery } = useSearch<User>({ data: users, searchFields: ['name', 'email'] });
 * ```
 */
export declare function useSearch<T>({ data, searchFields, debounceMs, caseSensitive, highlightResults }: SearchOptions<T>): SearchState<T> & SearchActions;
//# sourceMappingURL=useSearch.d.ts.map