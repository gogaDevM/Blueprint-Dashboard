import React, { useState, useEffect, useCallback } from "react";

import {
  useTable,
  useFilters,
  useGlobalFilter,
  Column,
  usePagination,
  useExpanded,
  TableOptions,
} from "react-table";

import { useSession } from "next-auth/react";

import moment, { Moment } from "moment";

import axios from "axios";

import General from "@/_utils/General";

import DateRange from "../common/DateRange";

import { GlobalFilter } from "./GlobalFilter";

import Pagination from "./Pagination";

import Filters from "./Filters";

interface TableProps {
  columns: Column[];
  endpoint: string;
  params?: any;
  dateRange?: boolean;
  title?: string;
  subtitle?: string;
  showFilter?: boolean;
  showSearch?: boolean;
  filters?: any[];
  isSorted?: boolean;
  noDataMessage?: string;
  renderToolbar?: () => JSX.Element;
  SubComponent?: (row: any) => JSX.Element;
  refresh?: boolean;
}

interface FilterValue {
  [key: string]: string | null;
}

interface SearchParams {
  searchTerm: string;
  dateFrom: Moment;
  dateTo: Moment;
}

interface SortParams {
  orderBy: string;
  ascending: boolean;
}

interface PaginationParams {
  sort: SortParams;
  search: SearchParams;
}

interface TableState {
  data: any[];
  isLoading: boolean;
  pagesNo: number;
  pageSize: number;
  pageIndex: number;
  totalRecords: number;
  params: PaginationParams;
  filterValue: Record<string, string | null>;
  showDropdown: boolean;
}

interface Session {
  accessToken?: string;
}

const initialTableState: TableState = {
  data: [],
  isLoading: true,
  pagesNo: 1,
  pageSize: 20,
  pageIndex: 1,
  totalRecords: 0,

  params: {
    search: {
      searchTerm: "",
      dateFrom: moment(),
      dateTo: moment(),
    },
    sort: {
      orderBy: "created_at",
      ascending: true,
    },
  },
  filterValue: {},
  showDropdown: false,
};

const BaseTable: React.FC<TableProps> = ({
  columns,
  endpoint,
  params,
  dateRange,
  title,
  subtitle,
  showFilter,
  showSearch,
  filters,
  noDataMessage,
  renderToolbar,
  SubComponent,
  refresh,
}) => {
  const { data: session, status } = useSession();

  const [tableState, setTableState] = useState<TableState>(initialTableState);

  const {
    pagesNo,
    pageSize,
    pageIndex,
    totalRecords,
    data,
    isLoading,
    showDropdown,
    filterValue,
  } = tableState;

  const { searchTerm, dateFrom, dateTo } = tableState.params.search;

  let { orderBy, ascending } = tableState.params.sort;

  if (title === "Job Types") {
    orderBy = "id";
  }

  // else if (title === "Content") {
  //   orderBy = "title";
  // }

  const fetchData = useCallback(async (url: string) => {
    // setTableState((prevState) => ({
    //   ...prevState,
    //   isLoading: true,
    // }));

    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // if ((session as Session)?.accessToken) {
    //   headers.Authorization = `Bearer ${(session as Session).accessToken} `;
    // }

    const requestOptions = {
      // withCredentials: true,
      headers,
    };

    try {
      const response = await axios.get(url, requestOptions);

      let totalRecordsNo = parseInt(response.data.count);

      console.log("RESPONSE: BASE TABLE", response)

      if (response.data) {
        setTableState((tableState) => ({
          ...tableState,
          data: response.data.posts,
          isLoading: false,
          pagesNo: Math.ceil(totalRecordsNo / tableState.pageSize),
          totalRecords: totalRecordsNo,
        }));
      }
    } catch (error) {
      // setTableState((prevState) => ({
      //   ...prevState,
      //   isLoading: false,
      // }));
      console.log("ERROR FETCHING DATA", error);
    }
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state: { globalFilter },
    visibleColumns,
    prepareRow,
    preGlobalFilteredRows,
    page,
  }: any = useTable(
    {
      columns,
      data: data ?? [],
      initialState: {
        globalFilter: searchTerm,
      } as Partial<any>,
      manualPagination: true,
      manualSortBy: true,
      pageCount: Math.ceil(totalRecords / pageSize),
    } as TableOptions<any>,
    useFilters,
    useGlobalFilter,
    useExpanded,
    usePagination
  );

  const addParams = (url: string, params: any) => {
    if (Object.keys(params).length === 0) {
      return url;
    }

    let queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    if (url.indexOf("?") === -1) {
      url += "?";
    } else if (!url.endsWith("&")) {
      url += "&";
    }

    return url + queryString;
  };

  const getUrl = (
    endpoint: string,
    dateFrom: Moment,
    dateTo: Moment,
    searchTerm: string,
    params: any,
    pageIndex: number
  ) => {
    params = {
      ...params,
      // page_size: pageSize,
      // page: pageIndex,
      // pagination_type: "page",
      // search_term: searchTerm ?? "",
      // order_by: orderBy.replace(/\./g, "__"),
    };

    if (filterValue) {
      Object.entries(filterValue).map((filter: any) => {
        params[filter[0]] = filter[1].id
          ? filter[1].id
          : filter[1].user
          ? filter[1].user.id
          : filter[1];
      });
    }

    if (dateRange && dateFrom && dateTo) {
      params["date_from"] = dateFrom.format("YYYY-MM-DD");
      params["date_to"] = dateTo.format("YYYY-MM-DD");
    }

    return addParams(endpoint, params);
  };

  const url = getUrl(endpoint, dateFrom, dateTo, searchTerm, params, pageIndex);

  const fetchUrlData = () => {
    fetchData(url);
  };

  const debouncedFetchData = General.debounce(fetchUrlData, 1000, false);

  useEffect(() => {
    debouncedFetchData();
  }, []);

  // url, pageIndex, pageSize, orderBy, refresh

  const handleToggleDropdown = () => {
    setTableState({
      ...tableState,
      showDropdown: !showDropdown,
    });
  };

  const updateFilterValue = (filterValue: FilterValue) => {
    setTableState({
      ...tableState,
      filterValue,
    });
  };

  const updateSearchParams = (searchParams: SearchParams) => {
    setTableState({
      ...tableState,
      pageIndex: 1,
      params: {
        ...tableState.params,
        search: searchParams,
      },
    });
  };

  const updateSortParams = (sortParams: SortParams) => {
    setTableState({
      ...tableState,
      pageIndex: 1,
      params: {
        ...tableState.params,
        sort: sortParams,
      },
    });
  };

  const handleGlobalFilterChange = (value: any) => {
    updateSearchParams({ ...tableState.params.search, searchTerm: value });
  };

  const handleFilterChange = (option: any, filter: any) => {
    if (option) {
      filterValue[filter.name.api] = option.value;
    } else {
      delete filterValue[filter.name.api];
    }
    updateFilterValue({ ...filterValue });

    setTableState({
      ...tableState,
      pageIndex: 1,
    });
  };

  const getFilterOption = (value: any | null): string | object => {
    if (!value || typeof value !== "object") return "";
    return {
      value: value.id,
      label: `${
        value.user ? `${value.user.first_name} ${value.user.last_name}` : ""
      } ${value.name ? value.name : ""} ${
        value.description ? `- ${value.description}` : ""
      }`,
      data: value,
    };
  };

  const getFilterOptions = (
    values: any
  ): { value: number; label: string; data: any }[] => {
    return values.map((value: any) => ({
      value: value.id,
      label: `${
        value.user ? `${value.user.first_name} ${value.user.last_name}` : ""
      } ${value.name ? value.name : ""} ${
        value.description ? `- ${value.description}` : ""
      }`,
      data: value,
    }));
  };

  const handleSortBy = (columnId: string) => {
    if (columnId === orderBy) {
      updateSortParams({
        ...tableState.params.sort,
        orderBy: `-${columnId}`,
        ascending: true,
      });
    } else {
      updateSortParams({
        ...tableState.params.sort,
        orderBy: columnId,
        ascending: false,
      });
    }
  };

  return (
    <div className="ReactTable">
      <div className="rt-table">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            {title && (
              <span className="card-label fw-bold fs-3 mb-1">{title}</span>
            )}
            <br />
            <span className="text-muted mt-1 fw-semibold fs-7">
              {subtitle ? subtitle : `${totalRecords || 0} Total`}
            </span>
          </h3>
          {renderToolbar && renderToolbar()}
        </div>

        <div className="row card-header border-0 pt-5 justify-content-start">
          {showSearch && (
            <div className="col-md-4 my-2">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={handleGlobalFilterChange}
              />
            </div>
          )}
          <div className="col-lg my-1 ">
            <div className="row">
              {dateRange && (
                <div className="col-lg my-1">
                  <DateRange
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    onFromDateUpdated={(dateFrom) => {
                      updateSearchParams({
                        ...tableState.params.search,
                        dateFrom,
                      });
                    }}
                    onToDateUpdated={(dateTo) => {
                      updateSearchParams({
                        ...tableState.params.search,
                        dateTo,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {showFilter && filters && (
            <Filters
              filters={filters}
              showDropdown={showDropdown}
              handleToggleDropdown={handleToggleDropdown}
              filterValue={filterValue}
              getFilterOptions={getFilterOptions}
              getFilterOption={getFilterOption}
              handleFilterChange={handleFilterChange}
            />
          )}
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <div className="ReactTable">
              <div className="rt-table" role="grid">
                <div
                  className="rt-thead -header"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 1px 0px",
                    paddingTop: 10,
                    paddingBottom: 10,
                    textAlign: "left",
                    minWidth: 735,
                  }}
                >
                  <table {...getTableProps()} className="">
                    <thead>
                      <div className="rt-tr -odd" role="row">
                        <div
                          className="rt-th"
                          tabIndex={-1}
                          style={{
                            textAlign: "left",
                            paddingLeft: 10,
                          }}
                        ></div>
                      </div>

                      <tr>
                        <th
                          colSpan={visibleColumns.length}
                          style={{
                            textAlign: "center",
                          }}
                        ></th>
                      </tr>

                      {headerGroups.map((headerGroup: any) => {
                        const columns = headerGroup.headers.map(
                          (column: any) => {
                            const orderByWithoutDash = orderBy.startsWith("-")
                              ? orderBy.slice(1)
                              : orderBy;

                            let isSorted = column.id === orderByWithoutDash;

                            return (
                              <th
                                key={column.id}
                                onClick={() => handleSortBy(column.id)}
                                {...column.getHeaderProps()}
                                className={`rt-resizable-header-content ${
                                  isSorted && "cursor-pointer"
                                }`}
                                style={{
                                  paddingLeft: 0,
                                  flex: "100 0 auto",
                                  width: 300,
                                }}
                              >
                                {column.render("Header")}
                                {isSorted && (
                                  <span>
                                    <img
                                      src={
                                        ascending
                                          ? "https://icons.veryicon.com/png/o/miscellaneous/common-icons-18/arrow-down-80.png"
                                          : "https://icons.veryicon.com/png/o/miscellaneous/common-icons-18/arrow-up-76.png"
                                      }
                                      alt="Icon"
                                      width={10}
                                    />
                                  </span>
                                )}
                                <div></div>
                              </th>
                            );
                          }
                        );

                        return columns;
                      })}
                    </thead>

                    <tbody
                      className="rt-tbody"
                      style={{ minWidth: 735 }}
                      {...getTableBodyProps()}
                    >
                      {page.map((row: any, rowIndex: any) => {
                        prepareRow(row);

                        return (
                          <React.Fragment>
                            <tr
                              key={rowIndex}
                              className="rt-td"
                              style={{
                                paddingLeft: 10,
                                flex: "100 0 auto",
                                width: 100,
                              }}
                              {...row.getRowProps()}
                            >
                              {row.cells.map((cell: any, cellIndex: any) => (
                                <td {...cell.getCellProps()} key={cellIndex}>
                                  {cell.render("Cell")}
                                </td>
                              ))}
                            </tr>
                            {row.isExpanded ? (
                              <>
                                <tr>
                                  <td colSpan={visibleColumns.length}>
                                    {SubComponent && SubComponent({ row })}
                                  </td>
                                </tr>
                              </>
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {!data ||
                  (data.length == 0 && (
                    <div className="rt-noData">
                      <div className="text-center m-20 py-10">
                        <span className="fw-bolder fs-3 text-muted">
                          {noDataMessage}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <Pagination
          page={pageIndex}
          pages={Math.ceil(totalRecords / pageSize)}
          pageSize={pageSize}
          totalRecords={totalRecords}
          onPageChange={(page: number) => {
            setTableState({
              ...tableState,
              pageIndex: page,
            });
          }}
          onPageSizeChange={(size: number) => {
            setTableState({
              ...tableState,
              pageSize: size,
            });
          }}
        />
      </div>
    </div>
  );
};

export default BaseTable;
