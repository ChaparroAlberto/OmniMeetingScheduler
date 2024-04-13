"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase, Calendar, Clock, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

function SideNavBar() {
  const menu = [
    {
      id: 1,
      name: "Meeting Type",
      path: "/dashboard/meeting-type",
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Scheduled Meeting",
      path: "/dashboard/scheduled-meeting",
      icon: Calendar,
    },
    {
      id: 3,
      name: "Availability",
      path: "/dashboard/availability",
      icon: Clock,
    },
    {
      id: 4,
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);

  return (
    <div className="p-5 py-14">
      <div className="flex justify-center">
        <Image src="/logo.svg" width={150} height={150} alt="logo" />
      </div>
      <Link href={"/create-meeting"}>
        <Button className="flex gap-2 w-full mt-7">
          <Plus /> Create
        </Button>
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item, index) => {
          return (
            <Link href={item.path} key={index}>
              <Button
                variant="ghost"
                className={`flex justify-start gap-2 w-full hover:bg-blue-100
                  ${activePath == item.path && "text-primary bg-blue-100"}
                  `}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideNavBar;
