import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, CalendarCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import { toast } from "sonner";
import { app } from "@/config/FirebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { Email } from "@/emails/index";
import { useRouter } from "next/navigation";

function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState("");
  const [prevBooking, setPrevBooking] = useState([]);
  const [step, setStep] = useState(1);

  const db = getFirestore(app);
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);
  const router = useRouter();

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 am in minutes
    const endTime = 22 * 60; // 10 pm in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}: ${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });
    setTimeSlot(slots);
  };

  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (businessInfo.daysAvailable?.[day]) {
      setEnableTimeSlot(true);
      getPrevEventBooking(date);
    } else {
      setEnableTimeSlot(false);
    }
  };

  const handleScheduleEvent = async () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(userEmail) == false) {
      toast("Please enter a valid email address");
      return;
    }
    const docId = Date.now().toString();
    await setDoc(doc(db, "ScheduledMeetings", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      formatedDate: format(date, "PPP"),
      formatedTimeStamp: format(date, "t"),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then((resp) => {
      toast.success("Meeting Scheduled Successfully!");
      sendEmail(userName);
    });
  };

  const sendEmail = (user) => {
    const emailHtml = render(
      <Email
        businessName={businessInfo?.businessName}
        date={format(date, "PPP").toString()}
        duration={eventInfo?.duration}
        meetingTime={selectedTime}
        meetingUrl={eventInfo?.locationUrl}
        userFirstName={user}
      />
    );

    plunk.emails
      .send({
        to: userEmail,
        subject: "Meeting Scheduled Details",
        body: emailHtml,
      })
      .then((resp) => {
        console.log(resp);
        router.replace("/confirmation");
      });
  };

  /**
   *
   * @param {*} date_
   */

  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeing Info */}
        <div className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className="flex mt-5 flex-col gap-4">
            <h2 className="flex items-center gap-2">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex items-center gap-2">
              <MapPin />
              {eventInfo?.locationType} Meeting
            </h2>
            <h2 className="flex items-center gap-2">
              <CalendarCheck />
              {format(date, "PPP")}
            </h2>
            {selectedTime && (
              <h2 className="flex items-center gap-2">
                <Timer />
                {selectedTime}
              </h2>
            )}
            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>

        {/* Time & Date Selection */}
        {step == 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlot={timeSlot}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>

      <div className="flex gap-3 justify-end">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
