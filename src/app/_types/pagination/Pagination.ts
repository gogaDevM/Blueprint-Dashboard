export interface PaginationType {
    page: number
    page_size: number
    pagination_type: string
}
export interface TablePaginationPropType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPagination: (value: React.SetStateAction<PaginationType & any>) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: PaginationType & any
    totalCount: number
    colSpan: number
}
