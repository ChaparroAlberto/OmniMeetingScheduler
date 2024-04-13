import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

function Confirmation() {
  return (
    <div className="flex flex-col items-center justify-center p-20 gap-6">
      <CheckCircle className="h-10 w-10 text-green-500" />
      <h2 className="font-bold text-3xl">
        Your meeting scheduled successfuly!
      </h2>
      <h2 className="text-lg text-gray-500">Confirmation sent on your email</h2>
      <Link href="/">
        <Button>Thank you</Button>
      </Link>
    </div>
  );
}

export default Confirmation;
