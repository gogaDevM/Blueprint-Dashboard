import React, { useState, useEffect } from "react";

import axios from "axios";

import Creatable from "react-select/creatable";

import { AsyncPaginate } from "react-select-async-paginate";

interface Option {
  value: any;
  label: string;
}

interface AsyncSelectProps {
  placeholder: string;
  endpoint: string;
  isMulti?: boolean;
  creatable?: boolean;
  styles?: any;
  filter?: string;
  value: any;
  disabled?: boolean;
  orderBy: string;
  isClearable?: boolean;
  className?: string;
  classNamePrefix?: string;
  onBlur?: () => void;
  onSelected?: (value: any) => void;
  onCreated?: (option: any) => void;
  getOptions: (results: any[]) => { value: any; label: string }[];
}

const AsyncSelect: React.FC<AsyncSelectProps> = (props) => {
  const {
    placeholder,
    endpoint,
    isMulti = false,
    creatable = false,
    styles,
    filter = "",
    value: initialValue,
    disabled = false,
    orderBy,
    isClearable,
    className,
    classNamePrefix,
    onBlur,
    onSelected,
    onCreated,
    getOptions,
  } = props;

  const [value, setValue] = useState<any>(initialValue);
  const [options, setOptions] = useState<Option[]>([]);
  const [search, setSearch] = useState<string>("");
  const [prevSearch, setPrevSearch] = useState<string>("");
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  useEffect(() => {
    setPrevSearch(search);
    // setValue(initialValue);
  }, [search, props]);

  useEffect(() => {
    setOptions([]);
    setNextPageUrl(null);
  }, [endpoint, filter]);

  const loadOptions = async (searchTerm: string) => {
    const url = `${endpoint}?${
      filter ? `${filter}&` : ""
    }search_term=${searchTerm}&order_by=${orderBy}`;
    try {
      const response = await axios.get(url);
      const newOptions = getOptions(response.data.results);
      setOptions(newOptions);
      setNextPageUrl(response.data.next);
      setPrevSearch(searchTerm);
      return {
        options: newOptions,
        hasMore: response.data.next !== null,
      };
    } catch (error) {
      console.error("Error loading options:", error);
      return { options: [], hasMore: false };
    }
  };

  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      setValue(selectedOption);
      onSelected && onSelected(selectedOption);
    } else if (!selectedOption) {
      setValue(selectedOption);
      onSelected && onSelected(selectedOption);
    } else if (selectedOption.__isNew__) {
      setValue(selectedOption);
      onCreated && onCreated(selectedOption);
    } else {
      setValue(selectedOption);
      onSelected && onSelected(selectedOption.data);
    }
  };

  const selectProps = {
    isMulti,
    value,
    styles,
    closeMenuOnSelect: !isMulti,
    loadOptions,
    debounceTimeout: 300,
    onChange: handleChange,
    onBlur,
    isDisabled: disabled,
    isClearable,
    placeholder,
    className,
    classNamePrefix,
  };

  return creatable ? (
    <Creatable {...selectProps} />
  ) : (
    <AsyncPaginate
      {...selectProps}
      value={value || ""}
      styles={styles}
      loadOptions={loadOptions}
      debounceTimeout={300}
      onChange={(value) => {
        handleChange(value);
      }}
      additional={{
        nextPageUrl,
      }}
    />
  );
};

AsyncSelect.defaultProps = {
  isMulti: false,
  orderBy: "name",
  onBlur: () => null,
};

export default AsyncSelect;
