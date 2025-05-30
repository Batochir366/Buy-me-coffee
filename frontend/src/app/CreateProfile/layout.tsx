import { Nav } from "@/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-screen gap-5 h-screen bg-white">
      <Nav />
      <div className="flex pt-[80px] size-full justify-center items-center">
        {children}
      </div>
    </div>
  );
}
