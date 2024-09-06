"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import ConceptRow from "./ConceptRow";
import { Concept } from "@/lib/types";

export type FetchConceptsResponse = {
  data: Concept[] | null;
  receivedTime: string | null;
};

export default function LibraryTable({
  data,
  receivedTime,
}: FetchConceptsResponse) {
  const [rows, setRows] = useState<Concept[]>(data ? data : []);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(
    receivedTime ? receivedTime : ""
  );

  const handleAddOrUpdateRow = (newRow: Concept) => {
    if (editingRowIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editingRowIndex] = newRow;
      setRows(updatedRows);
      setEditingRowIndex(null);
    } else {
      setRows([...rows, newRow]);
    }
    updateLastUpdatedTime();
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
    {/* To be added later: select status */}
      {/* <div className="flex flex-row gap-4 mt-4 mb-1">
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm">
          New
        </div>
        <div className="rounded-3xl bg-amber-300 bg-opacity-25 px-2 py-1 text-sm">
          Integrating
        </div>
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm">
          Mastered
        </div>
      </div> */}
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
          {/* ConceptRow is a dynamic component that will be rendered based on the purpose prop (add, edit, or display) */}
          <ConceptRow
            row={{
              id: "",
              user_id: "",
              name: "",
              usage: "",
              date_created: new Date(),
              progress: 0,
              normalized_embedding: [],
            }}
            purpose="add"
            onSubmit={handleAddOrUpdateRow}
          />

          {rows.map((row, index) =>
            editingRowIndex === index ? (
              <ConceptRow
                key={row.id}
                row={row}
                purpose="edit"
                onSubmit={handleAddOrUpdateRow}
                onCancel={() => setEditingRowIndex(null)}
              />
            ) : (
              <ConceptRow
                key={row.id}
                row={row}
                purpose="display"
                onSubmit={() => setEditingRowIndex(index)}
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
