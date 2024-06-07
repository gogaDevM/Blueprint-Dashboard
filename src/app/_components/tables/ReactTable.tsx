import { flexRender } from "@tanstack/react-table";

import { ReactTableProps, RowId } from "@/_types/table/ReactTable";

const ReactTable = <T extends RowId>({
  getFooterGroups,
  getHeaderGroups,
  getRowModel,
  className,
  expandedRowId,
  renderExpandedRow,
}: ReactTableProps<T>) => {
  return (
    <table
      className={`table dataTable align-middle table-row-dashed fs-6 gy-5 ${
        className ? className : ""
      }`}
      id="games-table"
    >
      <thead>
        {getHeaderGroups().map((headerGroup: any) => (
          <tr
            key={headerGroup.id}
            className="text-start text-primary fw-bold fs-7 text-uppercase gs-0"
          >
            {headerGroup.headers.map((header: any) => (
              <>
                <th
                  key={header.id}
                  className={`min-w-100px ${
                    header.column.getCanSort() ? "cursor-pointer sorting" : ""
                  } ${
                    header.column.getIsSorted()
                      ? "sorting_" + header.column.getIsSorted()
                      : ""
                  } `}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              </>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="fw-semibold text-dark">
        {getRowModel().rows.map((row:any) => (
          <>
            <tr key={row.id}>
              {row.getVisibleCells().map((cell:any) => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {expandedRowId === row.original.id &&
              renderExpandedRow &&
              renderExpandedRow(row.original.id)}
          </>
        ))}
      </tbody>
      <tfoot>
        {getFooterGroups().map((footerGroup: any) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header: any) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default ReactTable;
