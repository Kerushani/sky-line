"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  fileName: string;
  format: "JPG" | "PDF" | "DOCX";
  size: number;
  lastEdited: string;
  tags: string[];
};

export const Payment: Payment[] = [
  {
    fileName: "Flight 234",
    format: "PDF",
    size: 234,
    lastEdited: "2024-04-24",
    tags: ["important", "asia", "cargo"],
  },
  {
    fileName: "Flight 102",
    format: "PDF",
    size: 102,
    lastEdited: "2024-03-28",
    tags: [],
  },
  {
    fileName: "Flight 010",
    format: "PDF",
    size: 567,
    lastEdited: "2004-12-24",
    tags: ["important", "cargo"],
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "format",
    header: "Format",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "lastEdited",
    header: "Last Edited",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
];
