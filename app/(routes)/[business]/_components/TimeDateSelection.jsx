import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

function TimeDateSelection({
  date,
  handleDateChange,
  timeSlot,
  setSelectedTime,
  enableTimeSlot,
  selectedTime,
  prevBooking,
}) {
  const checkTimeSlot = (time) => {
    return prevBooking.filter((item) => item.selectedTime == time).length > 0;
  };

  return (
    <div className="md:col-span-2 flex px-4">
      <div className="flex flex-col">
        <h2 className="font-bold">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-md border mt-5"
          disabled={(date) => date <= new Date()}
        />
      </div>

      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: "25rem" }}
      >
        {timeSlot?.map((time, index) => {
          return (
            <Button
              key={index}
              disabled={!enableTimeSlot || checkTimeSlot(time)}
              onClick={() => setSelectedTime(time)}
              className={`border-primary text-primary ${
                time == selectedTime && "bg-primary text-white"
              }`}
              variant="outline"
            >
              {time}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeDateSelection;
