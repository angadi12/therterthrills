"use client";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchContactsByDateRange } from "@/lib/Redux/contactSlice";
import { Button } from "@nextui-org/react";

const Contactdaterange = () => {
  const dispatch = useDispatch();

  const defaultFromDate = moment().subtract(7, "days");
  const defaultToDate = moment();

  const [startDate, setStartDate] = useState(defaultFromDate);
  const [endDate, setEndDate] = useState(defaultToDate);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFetch = () => {
    const from = startDate ? moment(startDate).format("YYYY-MM-DD") : null;
    const to = endDate ? moment(endDate).format("YYYY-MM-DD") : null;
    dispatch(fetchContactsByDateRange({ from, to }));
  };

  useEffect(() => {
    handleFetch(); 
  }, []);

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
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
          displayFormat="DD/MM/YYYY"
          isOutsideRange={() => false}
          small
        />
        <Button
        onClick={handleFetch}
        className="bg-[#F30278] hover:bg-[#F30278] text-white h-12"
      >
        Search
      </Button>
      </div>
    </div>
  );
};

export default Contactdaterange;
