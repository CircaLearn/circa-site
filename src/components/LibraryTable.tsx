"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormRow from "./FormRow";
import ConceptRow from "./ConceptRow";

type RowData = {
  id: string;
  user_id: string;
  name: string;
  usage: string;
  dateAdded: string;
};

export default function LibraryTable() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchConcepts = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("API_URL is not defined in the environment variables.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/concepts`);
      if (response.ok) {
        const data = await response.json(); // on dev, data is fetched twice due to React strictmode
        setRows(
          data.map((concept: any) => ({
            id: concept.id,
            user_id: concept.user_id,
            name: concept.name,
            usage: concept.usage,
            dateAdded: new Date(concept.date_created).toLocaleDateString(),
          }))
        );
        updateLastUpdatedTime();
      } else {
        console.error("Failed to fetch concepts");
      }
    } catch (error) {
      console.error("Error fetching concepts", error);
    }
  };

  useEffect(() => {
    fetchConcepts()
  }, []) 


  const handleAddRow = (newRow: RowData) => {
    setRows([...rows, newRow]);
    updateLastUpdatedTime();
  };

  const handleUpdateRow = (updatedRow: RowData) => {
    if (editingRowIndex !== null) {
      const updatedRows = [...rows]; // creates shallow copy
      updatedRows[editingRowIndex] = updatedRow;
      setRows(updatedRows);
      setEditingRowIndex(null);
      updateLastUpdatedTime();
    }
  };

  const updateLastUpdatedTime = () => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setLastUpdated(currentTime);
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
          {/* top row for adding new concepts */}
          <FormRow onSubmit={handleAddRow} />

          {rows.map((row, index) =>
            editingRowIndex === index ? (
              <FormRow
                key={row.id}
                onSubmit={handleUpdateRow}
                initialData={{ name: row.name, usage: row.usage }}
                isEdit={true}
                dateAdded={row.dateAdded}
                id={row.id}
              />
            ) : (
              <ConceptRow
                key={row.id}
                row={row}
                index={index}
                setEditingRowIndex={setEditingRowIndex}
              />
            )
          )}
        </TableBody>
        <TableCaption>
          {lastUpdated ? `Last Updated: ${lastUpdated}` : ""}
        </TableCaption>
      </Table>
    </>
  );
}
