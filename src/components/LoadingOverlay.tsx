// components/ui/LoadingOverlay.tsx
"use client";

import React, { useEffect, useState } from "react";

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoading = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setLoading(customEvent.detail);
    };
console.log("cqqqqqq");

    window.addEventListener("axios-loading", handleLoading);
    return () => {
      window.removeEventListener("axios-loading", handleLoading);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
      {/* <img src="/loading.gif" alt="Loading..." className="w-16 h-16" /> */}
      <h1 className="text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
         Loading ne
        </h1>
    </div>
  );
}