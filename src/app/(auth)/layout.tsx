import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuroraBackground children={children}/>;
}
