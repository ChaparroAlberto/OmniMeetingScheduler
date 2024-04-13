"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, CalendarCheck, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ScheduledMeetingList({ meetingList }) {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="flex mt-5 flex-col gap-4">
                    <h2 className="flex items-center gap-2">
                      <Clock />
                      {meeting?.duration} Min
                    </h2>
                    <h2 className="flex items-center gap-2">
                      <CalendarCheck />
                      {meeting?.formatedDate}
                    </h2>
                    <h2 className="flex items-center gap-2">
                      <Timer />
                      {meeting?.selectedTime}
                    </h2>
                    <Link
                      href={meeting?.locationUrl ? meeting?.locationUrl : "#"}
                      className="text-primary"
                    >
                      {meeting?.locationUrl}
                    </Link>
                  </div>
                  <Link href={meeting?.locationUrl}>
                    <Button className="mt-5">Join Now</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}

export default ScheduledMeetingList;
