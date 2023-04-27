import Sidebar from "@/components/sidebar";
import Appbar from "@/components/appbar";
import { useEffect } from "react";

export default function CoreLayout({ children }) {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="flex pt-5">
      <Sidebar />
      <div className="w-full px-5 lg:ml-52">
        <Appbar />
        <main className="mt-5">{children}</main>
      </div>
    </div>
  );
}
