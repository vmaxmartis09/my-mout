import AnimatedTooltipPreview from "@/components/Tooltip";
import FloatingNav from "@/components/ui/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <FloatingNav
          navItems={[
            { name: "Home", link: "okee" },
            { name: "Home", link: "okee" },
          ]}
        />
        <AnimatedTooltipPreview />
      </main>
    </div>
  );
}
