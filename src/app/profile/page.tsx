"use client";
import React from "react";
import LoginForm from "../(auth)/login/LoginForm";
import { BannerProfile } from "./Banner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRootStore } from "@/store/rootState";

const FrofilePage = () => {
  const store = useRootStore((state) => state);
  console.log("store:", store);

  return (
    <div className="w-full h-1000 bg-accent">
      <BannerProfile />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        HEKLEE
      </Button>
    </div>
  );
};

export default FrofilePage;
