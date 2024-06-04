import $ from "jquery";

import { Location } from "@/_types/Types";

const debounce = (func: Function, wait: number, immediate: boolean) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (this: any) {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const snakeCaseToTitleCase = (str: string): string => {
  const words = str?.replace(/_/g, " ");
  return toTitleCase(words);
};

const toTitleCase = (str: string): string => {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const getInitials = (str: string): string => {
  const initials = str.match(/\b\w/g) || [];
  return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
};

const getRandomColorState = (): string => {
  const colors = [
    "info",
    "success",
    "warning",
    "danger",
    "dark",
    "primary",
    "brand",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};

const uuid = (): string => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

const toCurrency = (value: number | null | undefined): string => {
  if (value == null) {
    return "0.00";
  }
  value = value * 1;
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const getSingleAsyncOption = (value: any, accessor: string = "name") => {
  if (!value || typeof value !== "object") return "";
  return {
    value: value.id,
    label: `${value[accessor]}`,
    data: value,
  };
};

const getAsyncOptions = (values: any[], accessor: string = "name") => {
  return values?.map((value) => ({
    value: value.data ? value.data.id : value.id,
    label: `${value[accessor] || value.data[accessor]}`,
    data: value.data ? value.data : value,
  }));
};

const getIds = (items: any[]): number[] => {
  return items.map((item: any) => item.id);
};

const getUrlParameter = (name: string): string => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const toOrdinal = (number: number): string => {
  const x = number % 10;
  const y = number % 100;

  if (x === 1 && y !== 11) {
    return `${number}st`;
  }
  if (x === 2 && y !== 13) {
    return `${number}nd`;
  }
  if (x === 3 && y !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
};

const isValidVideoUrl = (url: string): boolean => {
  const validYoutubeURL =
    /^(https\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url);
  const validVimeoURL = /^(https\:\/\/)?(player\.vimeo\.com)\/.+$/.test(url);
  return validYoutubeURL || validVimeoURL;
};

const getLocationValue = (location: Location): string => {
  if (location?.raw) {
    return location.raw;
  } else {
    if (location) {
      return `${location.address ? location.address + ", " : ""}${
        location.city ? location.city + ", " : ""
      }${location.state ? location.state + ", " : ""}${
        location.country ? location.country : ""
      }`.replace(/,\s*$/, "");
    }
    return "";
  }
};

const scrollTo = (selector: string): void => {
  $("html, body").animate({ scrollTop: $(selector).position().top }, "slow");
};

const General = {
  debounce,
  snakeCaseToTitleCase,
  toTitleCase,
  getInitials,
  getRandomColorState,
  uuid,
  toCurrency,
  getSingleAsyncOption,
  getAsyncOptions,
  getIds,
  getUrlParameter,
  toOrdinal,
  isValidVideoUrl,
  getLocationValue,
  scrollTo,
};

export default General;
