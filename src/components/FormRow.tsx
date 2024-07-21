"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";
import FormInput from "./FormInput";

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
  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.usage) {
      setShowValidation(true);
      return;
    }

    try {
        const response = await fetch('/api/concepts/', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({formData})
        });

        if (response.ok) {
          onSubmit(formData);
          if (!isEdit) {
            setFormData({ name: "", usage: "" }); // Reset form after submission if adding a new row
          }
          setShowValidation(false); // Reset validation state after successful submission
        } else {
            console.error("Response NOT ok - Concept not added ")
        }
    } catch(error) {
        console.error("Error adding concept", error)
    }

  };

  return (
    <TableRow>
      <TableCell>
        <FaCircle className="text-xl text-emerald-300 opacity-50" />
      </TableCell>
      <TableCell>
        <FormInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Add concept..."
          showValidation={showValidation}
        />
      </TableCell>
      <TableCell>
        <FormInput
          name="usage"
          value={formData.usage}
          onChange={handleChange}
          placeholder="Enter usage..."
          showValidation={showValidation}
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
