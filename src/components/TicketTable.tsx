"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";
import FormRow from "./FormRow";

type FormData = {
  name: string;
  usage: string;
};

type RowData = {
  status: string;
  name: string;
  usage: string;
  dateAdded: string;
};

export default function TicketTable() {
  const [rows, setRows] = useState<RowData[]>([
    {
      status: "New",
      name: "Delineate",
      usage: "Describe or portray precisely; distinguish",
      dateAdded: "06/10/2024",
    },
  ]);

  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const handleAddRow = (formData: FormData) => {
    const newRow: RowData = {
      status: "New",
      name: formData.name,
      usage: formData.usage,
      dateAdded: "Today",
    };
    setRows([...rows, newRow]);
  };

  const handleEditRow = (index: number) => {
    setEditingRowIndex(index);
  };

  const handleUpdateRow = (formData: FormData) => {
    if (editingRowIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editingRowIndex] = {
        ...updatedRows[editingRowIndex],
        ...formData,
      };
      setRows(updatedRows);
      setEditingRowIndex(null);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4 mt-4 mb-1">
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm">
          New
        </div>
        <div className="rounded-3xl bg-amber-300 bg-opacity-25 px-2 py-1 text-sm">
          Integrating
        </div>
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm">
          Mastered
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead className="w-[20%]">Concept</TableHead>
            <TableHead className="w-[45%]">Usage</TableHead>
            <TableHead className="w-[13%] text-right">Date Added</TableHead>
            <TableHead className="w-[12%] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <FormRow onSubmit={handleAddRow} />
          {rows.map((row, index) =>
            editingRowIndex === index ? (
              <FormRow
                key={index}
                onSubmit={handleUpdateRow}
                initialData={{ name: row.name, usage: row.usage }}
                isEdit={true}
                dateAdded={row.dateAdded}
              />
            ) : (
              <TableRow key={index}>
                <TableCell className="text-xl text-amber-300 opacity-50">
                  <FaCircle />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.usage}</TableCell>
                <TableCell className="text-right">{row.dateAdded}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="bg-amber-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEditRow(index)}
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableCaption>Last Updated: 12:00 pm</TableCaption>
      </Table>
    </>
  );
}
