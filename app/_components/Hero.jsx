import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="hidden lg:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          alt="profile"
          className="h-[100px] object-cover rounded-full absolute right-36"
        />
        <Image
          src="/profile3.png"
          width={100}
          height={100}
          alt="profile"
          className="h-[100px] object-cover rounded-full absolute top-48 left-16"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          alt="profile"
          className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          alt="profile"
          className="h-[100px] object-cover rounded-full absolute bottom-32 right-16"
        />
      </div>
      <div className="text-center max-w-3xl">
        <h2 className="font-bold text-[60px] text-slate-700">
          Easy scheduling ahead
        </h2>
        <h2 className="text-xl mt-5 text-slate-500">
          Scheduly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time - and so much more.
        </h2>
        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-sm">Sign Up free with Google and Facebook</h3>
          <div className="flex justify-center gap-8">
            <Button className="p-5 flex gap-2">
              <Image src="/google.png" alt="google" width={20} height={20} />
              Signup with Google
            </Button>
            <Button className="p-5 flex gap-2">
              <Image
                src="/facebook.png"
                alt="facebook"
                width={20}
                height={20}
              />
              Signup with Facebook
            </Button>
          </div>
          <hr />
          <h2>
            <Link href="" className="text-primary">
              Sign up Free with Email.
            </Link>{" "}
            No Credit card required
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
