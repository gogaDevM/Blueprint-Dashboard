import React, { useState } from "react";

import Select from "react-select";

interface CustomSelectProps {
  options: any[];
  value?: any;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  onSelected: (option: any) => void;
  isClearable?: boolean;
  placeholder?: string;
  className?: string;
  classNamePrefix?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  getOptionLabel,
  getOptionValue,
  onSelected,
  placeholder,
  className,
  classNamePrefix,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState<any | null>(value || null);

  const formattedOptions = options.map((option) => ({
    label: getOptionLabel(option),
    value: getOptionValue(option),
    _data: option,
  }));

  return (
    <Select
      {...props}
      options={formattedOptions}
      value={formattedOptions.find((option) => option.value === value)}
      onChange={(option) => {
        if (!option) {
          onSelected(null);
          setSelectedValue({ value: null });
          return null;
        }
        setSelectedValue({ value: option.value });
        onSelected(option._data);
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary25: "#F5F5F5",
          primary: "#F5F5F5",
          neutral0: "white",
        },
      })}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: "black",
        }),
      }}
    />
  );
};

export default CustomSelect;
