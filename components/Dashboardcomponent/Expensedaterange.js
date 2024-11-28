"use client";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchExpensesByBranchAndDate } from "@/lib/Redux/expensesSlice";
import { fetchBranches } from "@/lib/Redux/BranchSlice";

const ExpenseDatePicker = () => {
  const dispatch = useDispatch();
  const defaultFromDate = moment().subtract(7, "days"); 
  const defaultToDate = moment(); 
  
  const [startDate, setStartDate] = useState(defaultFromDate);
  const [endDate, setEndDate] = useState(defaultToDate);
  const [focusedInput, setFocusedInput] = useState(null);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  const handleSearch = () => {
    if (selectedBranchId && startDate && endDate) {
      const from = moment(startDate).format("YYYY-MM-DD"); // Format for backend
      const to = moment(endDate).format("YYYY-MM-DD");

      // Dispatch the fetchExpensesByBranchAndDate thunk
      dispatch(fetchExpensesByBranchAndDate({ branchId: selectedBranchId, from, to }));
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedBranchId]); 

  useEffect(() => {
    dispatch(fetchBranches());
  }, []);

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

export default ExpenseDatePicker;
