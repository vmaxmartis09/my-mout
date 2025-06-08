"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useRootStore } from "@/store/rootState";

export default function LoginForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const setAuth = useRootStore((state) => state.authActions.setAuth);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Sai email hoặc mật khẩu.");
      setLoading(false);
    } else {
      const { user, session } = data;

      // 👉 Gọi setAuth để lưu vào Zustand
      await setAuth({
        user,
        session,
        isAuthenticated: true,
      }).then(() => {
        router.push("/profile");
      });
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg("OAuth login failed");
    }
  };

  return (
    <div className="shadow-input mx-auto w-full min-w-md rounded-none bg-slate-100 p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-500">
        Welcome to Mout
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to My Mout
      </p>

      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Email</Label>
          <Input
            id="username"
            name="username"
            placeholder="you@example.com"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="group/btn relative h-10 w-full overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {loading ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              "Login →"
            )}
          </span>
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Login with GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Login with Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2 ", className)}>
      <div className="relative z-[100]">{children}</div>
    </div>
  );
};
