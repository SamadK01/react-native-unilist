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
export declare function useSearch<T>({ data, searchFields, debounceMs, caseSensitive, highlightResults, }: SearchOptions<T>): SearchState<T> & SearchActions;
//# sourceMappingURL=useSearch.d.ts.map