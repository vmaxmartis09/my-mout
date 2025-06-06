"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export function BannerProfile() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Anh em mình cứ thế thôi hẹ hẹ
        </h1>
        <h1 className="relative z-100 text-amber-200"> ok humm </h1>
      </div>
      <BackgroundBeams />
    </div>
  );
}
