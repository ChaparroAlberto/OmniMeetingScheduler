"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { format } from "date-fns";
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

function ScheduledMeetings() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    user && getScheduledMeetings();
  }, [user]);

  const getScheduledMeetings = async () => {
    setMeetingList([])
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("businessEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setMeetingList((prev) => [...prev, doc.data()]);
    });
  };

  const filterMeetingList = (type) => {
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item.formatedTimeStamp >= format(new Date(), "t")
      );
    } else {
        return meetingList.filter(
            (item) => item.formatedTimeStamp < format(new Date(), "t")
          );
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">ScheduledMeetings</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired"><ScheduledMeetingList meetingList={filterMeetingList("expired")} /></TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeetings;
