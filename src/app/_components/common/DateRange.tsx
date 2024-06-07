import React from "react";

import moment, { Moment } from "moment";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

interface DateRangeProps {
  dateFrom: Moment;
  dateTo: Moment;
  onFromDateUpdated: (date: Moment) => void;
  onToDateUpdated: (date: Moment) => void;
  width?: number;
}

const DateRange: React.FC<DateRangeProps> = ({
  dateFrom,
  dateTo,
  onFromDateUpdated,
  onToDateUpdated,
  width = 6,
}) => {
  const cssClass = `col-${width}`;

  return (
    <div className="row">
      <div className={cssClass}>
        <div className="input-group date">
          <Flatpickr
            value={dateFrom ? (dateFrom.format("DD-MM-YYYY") as any) : null}
            className="form-control form-control-solid"
            placeholder="From"
            options={{
              enableTime: false,
              noCalendar: false,
              dateFormat: "d-m-Y",
            }}
            onChange={(dates) => {
              const selectedDate = moment(dates[0]).startOf("day");
              onFromDateUpdated(selectedDate);
            }}
          />
        </div>
      </div>
      <div className={cssClass}>
        <div className="input-group date">
          <Flatpickr
            value={dateTo ? (dateTo.format("DD-MM-YYYY") as any) : null}
            className="form-control form-control-solid"
            placeholder="To"
            options={{
              minDate: dateFrom ? (dateFrom.format("DD-MM-YYYY") as any) : null,
              enableTime: false,
              noCalendar: false,
              dateFormat: "d-m-Y",
            }}
            onChange={(dates) => {
              const selectedDate = moment(dates[0]).endOf("day");
              onToDateUpdated(selectedDate);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRange;
