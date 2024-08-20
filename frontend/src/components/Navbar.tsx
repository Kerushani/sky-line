"use client";
import { FC, ReactNode } from "react";
import Link from "next/link";

export interface NavbarProps {
  children?: ReactNode;
}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-32 bg-sky-950 text-white flex flex-col">
      <div className="flex-shrink-0 p-4">
        <h1 className="text-xl font-bold">Flightbook</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Link href="dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;
