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
/**
 * Serializes async pagination and preserves exact item types in all actions.
 *
 * @example
 * ```tsx
 * const pager = usePagination<Product>({ pageSize: 20, onLoadMore: page => api.products(page) });
 * <UniList data={pager.data} renderItem={renderProduct} onEndReached={pager.loadMore} />
 * ```
 */
export declare function usePagination<T>({ pageSize, initialData, onLoadMore, onError }: PaginationOptions<T>): PaginationState<T> & PaginationActions<T>;
//# sourceMappingURL=usePagination.d.ts.map