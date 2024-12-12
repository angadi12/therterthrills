"use client";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { fetchPayments, setDateRange } from "@/lib/Redux/paymentSlice";
import { subDays } from "date-fns"; // For calculating the default date range
import { format } from "date-fns";
import moment from "moment"; // Import moment for date handling

const RazorpayDatePicker = () => {
  const dispatch = useDispatch();
  const defaultFromDate = moment().subtract(7, "days"); // 7 days ago
  const defaultToDate = moment(); // Today

  const [startDate, setStartDate] = useState(defaultFromDate);
  const [endDate, setEndDate] = useState(defaultToDate);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      const fromUnix = Math.floor(startDate.toDate().getTime() / 1000);
      const toUnix = Math.floor(endDate.toDate().getTime() / 1000);
      dispatch(setDateRange({ from: fromUnix, to: toUnix }));
      dispatch(fetchPayments({ from: fromUnix, to: toUnix }));
    }
  }, [startDate, endDate, dispatch]);

  const handleSearch = () => {
    if (startDate && endDate) {
      const fromUnix = Math.floor(startDate.toDate().getTime() / 1000);
      const toUnix = Math.floor(endDate.toDate().getTime() / 1000);

      dispatch(fetchPayments({ from: fromUnix, to: toUnix }));
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date"
        endDate={endDate}
        endDateId="end_date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        customInputIcon={<i className="text-[#F30278]">📅</i>}
        displayFormat="DD/MM/YYYY"
        isOutsideRange={() => false} // Allow all dates
        small
      />
      <Button
        onClick={handleSearch}
        className="bg-[#F30278] hover:bg-[#F30278] text-white h-12"
      >
        Search
      </Button>
    </div>
  );
};

export default RazorpayDatePicker;
