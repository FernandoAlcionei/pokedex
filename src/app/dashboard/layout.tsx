import Navbar from "@/components/Navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-screen-xl m-auto bg-white font-[sans-serif] px-4 sm:px-12 w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
