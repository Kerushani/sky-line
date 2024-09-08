"use client";
import { FC, ReactNode, useState } from "react";
import Link from "next/link";

export interface NavbarProps {
  children?: ReactNode;
}

const Navbar: FC<NavbarProps> = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 h-full bg-slate-200 text-gray-800 flex flex-col border-r border-gray-300">
      <div className="flex-shrink-0 p-4">
        <Link
          href="/"
          // className={`block text-sm py-2 px-3 rounded-md ${
          //   activeLink === "reports"
          //     ? "bg-blue-500 text-white border border-blue-500"
          //     : "text-blue-700 hover:bg-blue-100"
          // }`}
          onClick={() => setActiveLink("/")}
        >
          <h1 className="text-lg font-semibold">SkyLine</h1>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col p-2">
          <Link
            href="/reports"
            className={`block text-sm py-2 px-3 rounded-md ${
              activeLink === "reports"
                ? "bg-blue-500 text-white border border-blue-500"
                : "text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveLink("reports")}
          >
            Reports
          </Link>
          <Link
            href="/profile"
            className={`block text-sm py-2 px-3 rounded-md ${
              activeLink === "profile"
                ? "bg-blue-500 text-white border border-blue-500"
                : "text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveLink("profile")}
          >
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
