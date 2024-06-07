import React from "react";

import AsyncSelect from "../common/AsyncSelect";
import Select from "../common/Select";

import { Dropdown } from "react-bootstrap";

interface Option {
  label: string;
  value: string;
}

interface FilterProps {
  key?: string;
  filter: {
    name: {
      label: string;
      display: string;
      api: string;
    };
    endpoint?: {
      url: string;
      orderBy?: string;
      filters?: any;
    };
    values?: Option[];
  };
  filterValue: Record<string, string | null>;
  getFilterOptions?: (options: any) => any;
  getFilterOption?: (value: any) => any;
  handleFilterChange?: (option: any, filter: any) => void;
}

const Filter: React.FC<FilterProps> = ({
  key,
  filter,
  filterValue,
  getFilterOption,
  getFilterOptions,
  handleFilterChange,
}) => {
  return (
    <div key={key} className="mb-10">
      <label className="form-label fs-6 fw-bold">{filter.name.display}:</label>

      {filter.endpoint ? (
        <Dropdown.Item>
          <AsyncSelect
            isClearable={true}
            placeholder={filter.name.display}
            endpoint={filter.endpoint.url}
            orderBy={filter.endpoint.orderBy || "name"}
            value={getFilterOption?.(filterValue[filter.name.api])}
            filter={filter.endpoint.filters}
            className={"filter-solid custom-async-select__container"}
            classNamePrefix={"custom-async-select"}
            getOptions={(options) => getFilterOptions?.(options)}
            onSelected={(option) => {
              handleFilterChange?.(option, filter);
            }}
          />
        </Dropdown.Item>
      ) : (
        <Dropdown.Item>
          <Select
            isClearable={true}
            value={getFilterOption?.(filterValue[filter.name.api])}
            options={filter.values ?? []}
            placeholder={filter.name.label}
            getOptionLabel={(role) => role.label}
            getOptionValue={(role) => role.value}
            className=" form-control-solid h-auto c-selectbox"
            classNamePrefix="filter-select"
            onSelected={(option) => {
              handleFilterChange?.(option, filter);
            }}
          />
        </Dropdown.Item>
      )}
    </div>
  );
};

export default Filter;
