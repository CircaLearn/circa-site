import { useState, ChangeEvent, FormEvent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { FaCircle, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { Concept } from "@/lib/types";
import FormInput from "./FormInput";

type ConceptRowProps = {
  row: Concept;
  purpose: "display" | "edit" | "add";
  onSubmit: (data: Concept) => void;
  onCancel?: () => void;
};

const USER_ID = "60b8d6e1e1b8f30d6c8e6f59"; // Example user ID for testing

export default function ConceptRow({
  row,
  purpose,
  onSubmit,
  onCancel,
}: ConceptRowProps) {
  const [formData, setFormData] = useState({
    name: purpose === "add" ? "" : row.name || "",
    usage: purpose === "add" ? "" : row.usage || "",
  });
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
    if (formData.name == row.name && formData.usage == row.usage) {
      onCancel?.();
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API_URL is not defined in the environment variables.");
      return;
    }

    const method = purpose === "edit" ? "PUT" : "POST";
    const endpoint =
      purpose === "edit"
        ? `${apiUrl}/concepts/${row.id}`
        : `${apiUrl}/concepts`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: USER_ID,
          name: formData.name,
          usage: formData.usage,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        onSubmit({
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          usage: data.usage,
          date_created: new Date(data.date_created),
          last_seen: row.last_seen,
          progress: row.progress,
          normalized_embedding: row.normalized_embedding,
        });
        setShowValidation(false); // Reset validation state after successful submission
        if (purpose === "add") {
          setFormData({ name: "", usage: "" }); // Reset form data after adding a new concept
        }
      } else {
        console.error("Response Failed - Concept Not Added/Updated");
      }
    } catch (error) {
      console.error("Error adding/updating concept", error);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setShowValidation(false); // Reset validation state on cancel
    setFormData({ name: row.name || "", usage: row.usage || "" }); // Reset form data on cancel
  };

  // ConceptRow just for displaying
  if (purpose === "display") {
    return (
      <TableRow key={row.id}>
        <TableCell className="text-xl text-amber-300 opacity-50">
          <FaCircle />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.usage}</TableCell>
        <TableCell className="text-right">
          {row.date_created.toLocaleDateString("en-US")}
        </TableCell>
        <TableCell className="text-right flex justify-end space-x-2">
          <button
            className="py-2 flex items-center justify-center w-16 h-8"
            onClick={() => onSubmit({ ...row, id: row.id })}
          >
            <FaEdit />
          </button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={row.id || "new"}>
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
        {purpose === "edit"
          ? row.date_created.toLocaleDateString("en-US")
          : new Date().toLocaleDateString("en-US")}
      </TableCell>
      <TableCell className="text-right flex justify-end space-x-2">
        <form onSubmit={handleSubmit} className="flex">
          <button
            type="submit"
            className="p-2 flex items-center justify-center w-8 h-8"
          >
            <FaCheck />
          </button>
          <button
            type="button"
            className="p-2 flex items-center justify-center w-8 h-8"
            onClick={handleCancel}
          >
            <FaTimes />
          </button>
        </form>
      </TableCell>
    </TableRow>
  );
}
