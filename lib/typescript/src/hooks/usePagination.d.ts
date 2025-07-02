export interface PaginationOptions<T> {
    pageSize: number;
    initialData?: T[];
    onLoadMore?: (page: number) => Promise<T[]>;
    onError?: (error: Error) => void;
}
export interface PaginationState<T> {
    data: T[];
    loading: boolean;
    error: Error | null;
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
    totalItems: number;
}
export interface PaginationActions {
    loadMore: () => Promise<void>;
    refresh: () => Promise<void>;
    reset: () => void;
    setData: (data: any[]) => void;
}
export declare function usePagination<T>({ pageSize, initialData, onLoadMore, onError, }: PaginationOptions<T>): PaginationState<T> & PaginationActions;
//# sourceMappingURL=usePagination.d.ts.map