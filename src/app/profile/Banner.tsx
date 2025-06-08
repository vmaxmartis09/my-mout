"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import instance from "@/lib/axios/interceptor"; // ✅ Chỉ dùng instance
import React from "react";
import { toast } from "sonner";

export function BannerProfile() {
  const fetchData = async () => {
    try {
      const res = await instance.get("/products"); // ✅ Dùng instance đã có baseURL
      console.log(res.data);
    } catch (error) {
      console.error("Lỗi API", error);
    }
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Anh em mình cứ thế thôi hẹ hẹ
        </h1>
        <h1 className="relative z-100 text-amber-200"> ok humm </h1>
      </div>
      <BackgroundBeams />
      <button onClick={fetchData} className="w-2xl z-234 bg-amber-300">
        Call API
      </button>
      
    </div>
  );
}