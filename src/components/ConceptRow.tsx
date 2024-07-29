import { TableCell, TableRow } from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";

type RowData = {
  id: string;
  user_id: string;
  name: string;
  usage: string;
  dateAdded: string;
};

type ConceptRowProps = {
  row: RowData;
  index: number;
  setEditingRowIndex: (index: number) => void;
};

export default function ConceptRow({
  row,
  index,
  setEditingRowIndex,
}: ConceptRowProps) {
  return (
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
  );
}
