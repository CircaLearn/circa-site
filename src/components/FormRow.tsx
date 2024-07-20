"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";

type FormData = {
  name: string;
  usage: string;
};

type FormRowProps = {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  isEdit?: boolean;
  dateAdded?: string;
};

export default function FormRow({
  onSubmit,
  initialData = { name: "", usage: "" },
  isEdit = false,
  dateAdded = "Today",
}: FormRowProps) {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData({ name: "", usage: "" }); // Reset form after submission if adding a new row
    }
  };

  return (
    <TableRow>
      <TableCell>
        <FaCircle className="text-xl text-emerald-300 opacity-50" />
      </TableCell>
      <TableCell>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Add concept..."
          className="w-full p-1 border rounded"
          autoComplete="off"
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          name="usage"
          value={formData.usage}
          onChange={handleChange}
          placeholder="Enter usage..."
          className="w-full p-1 border rounded"
          autoComplete="off"
        />
      </TableCell>
      <TableCell className="text-right">
        {!isEdit ? dateAdded : <div className="w-full p-1">{dateAdded}</div>}
      </TableCell>
      <TableCell className="text-right">
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            {isEdit ? "Done" : "Add"}
          </button>
        </form>
      </TableCell>
    </TableRow>
  );
}
