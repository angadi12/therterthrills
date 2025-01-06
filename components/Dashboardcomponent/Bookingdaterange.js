"use client";
import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange, selectDateRange } from "@/lib/Redux/BookingdateSlice";
import moment from "moment";

const BookingDatePicker = () => {
  const dispatch = useDispatch();
  const { startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(selectDateRange);

  const [focusedInput, setFocusedInput] = useState(null);



  return (
    <div className="flex gap-2 items-center  z-50">
      <DateRangePicker
        startDate={moment(reduxStartDate)}
        startDateId="start_date"
        endDate={moment(reduxEndDate)}
        endDateId="end_date"
        onDatesChange={({ startDate, endDate }) => {
          if (startDate && endDate) {
            dispatch(
              setDateRange({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
              })
            );
          }
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        customInputIcon={<i className="text-[#F30278]">📅</i>}
        displayFormat="DD/MM/YYYY"
        isOutsideRange={() => false} // Allow all dates
        small
      />
    </div>
  );
};

export default BookingDatePicker;
