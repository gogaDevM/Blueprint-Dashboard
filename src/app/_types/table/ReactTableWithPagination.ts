import { ColumnDef } from "@tanstack/react-table"

export interface ReactTableWithPaginationPropType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<any, any>[]
    /**
     * API endpoint which fetches data
     */
    endpoint: string
    tableHeaderTitle?: string
    onAddButtonClick?: () => void
    addButtonLabel?: string
    /**
     * works as dependency array for useEffect
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[]
    /**
     * return response from api call
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFetchResponse?: (response: any) => void
    showSearchBar?: boolean
    assetDeleted?: boolean
    extraFilters?: object
    tableClassName?: string
}
