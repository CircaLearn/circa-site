"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";
import FormInput from "./FormInput";

type FormData = {
  name: string;
  usage: string;
};

type FormRowProps = {
  onSubmit: (data: any) => void;
  initialData?: FormData;
  isEdit?: boolean;
  dateAdded?: string;
  id?: string;
};

const USER_ID = "60b8d6e1e1b8f30d6c8e6f59"; // Example user ID for testing

export default function FormRow({
  onSubmit,
  initialData = { name: "", usage: "" },
  isEdit = false,
  dateAdded = "Today",
  id,
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

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("API_URL is not defined in the environment variables.");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/concepts/${isEdit && id ? id : ""}`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: USER_ID,
            name: formData.name,
            usage: formData.usage,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onSubmit({
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          usage: data.usage,
          dateAdded: new Date(data.date_created).toLocaleDateString(),
        });
        if (!isEdit) {
          setFormData({ name: "", usage: "" }); // Reset form after submission if adding a new row
        }
        setShowValidation(false); // Reset validation state after successful submission
      } else {
        console.error("Response Failed - Concept Not Added/Updated ");
      }
    } catch (error) {
      console.error("Error adding/updating concept", error);
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
