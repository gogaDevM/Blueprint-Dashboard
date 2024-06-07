import React, { useState, useMemo, ChangeEvent } from "react";

import { useAsyncDebounce } from "react-table";

import { Input } from "reactstrap";

interface GlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: (filterValue: string | undefined) => void;
}

export function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}: GlobalFilterProps) {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value || "";

    setGlobalFilter(searchValue);
  }, 500);

  return (
    <div className="w-100 position-relative">
      <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            opacity="0.5"
            x="17.0365"
            y="15.1223"
            width="8.15546"
            height={2}
            rx={1}
            transform="rotate(45 17.0365 15.1223)"
            fill="black"
          />
          <path
            d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
            fill="black"
          />
        </svg>
      </span>
      <Input
        className="form-control form-control-solid px-15"
        defaultValue={value || ""}
        placeholder="Search"
        onChange={onChange}
      />
    </div>
  );
}

interface DefaultFilterForColumnProps {
  column: {
    filterValue: string;
    preFilteredRows: { length: number };
    setFilter: (filterValue: string | undefined) => void;
  };
}

export function DefaultFilterForColumn({
  column: { filterValue, preFilteredRows, setFilter },
}: DefaultFilterForColumnProps) {
  return (
    <Input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${preFilteredRows.length} records..`}
      style={{ marginTop: "10px" }}
    />
  );
}

interface SelectColumnFilterProps {
  column: {
    filterValue: string;
    setFilter: (filterValue: string | undefined) => void;
    preFilteredRows: any[];
    id: string;
  };
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: SelectColumnFilterProps) {
  const options = useMemo(() => {
    const options = new Set<string>();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return Array.from(options.values());
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
