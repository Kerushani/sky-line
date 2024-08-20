"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns"

export default function Page() {
  return (
    <div className="flex">
      <div>Report Editor</div>
      <DataTable columns={columns} data={Payment} />
    </div>
  );
}
