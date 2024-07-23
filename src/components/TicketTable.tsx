"use client";

import React, { useState, useEffect } from "react";
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

type RowData = {
  id: string;
  user_id: string;
  name: string;
  usage: string;
  dateAdded: string;
};

const USER_id = "60b8d6e1e1b8f30d6c8e6f59"; // Example user ID, replace with actual user ID

export default function TicketTable() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const fetchConcepts = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error("API_URL is not defined in the environment variables.");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/concepts`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data); // Log to verify data fetched
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

    fetchConcepts();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleAddRow = (newRow: RowData) => {
    setRows([...rows, newRow]);
    updateLastUpdatedTime();
  };

  const handleUpdateRow = (updatedRow: RowData) => {
    if (editingRowIndex !== null) {
      const updatedRows = [...rows];
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
              <TableRow key={row.id}>
                <TableCell className="text-xl text-amber-300 opacity-50">
                  <FaCircle />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.usage}</TableCell>
                <TableCell className="text-right">{row.dateAdded}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="bg-amber-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditingRowIndex(index)}
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableCaption>Last Updated: {lastUpdated}</TableCaption>
      </Table>
    </>
  );
}
