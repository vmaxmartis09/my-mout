import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      <AuroraBackground children={<LoginForm />} />
    </>
  );
};

export default LoginPage;
