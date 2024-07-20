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

export default function TicketTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Word</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead className="text-right">Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-sky-500">
            <TableCell className="text-xl text-green-300 opacity-50">
              <FaCircle />
            </TableCell>
            <TableCell>New</TableCell>
            <TableCell>Tap to add...</TableCell>
            <TableCell className="text-right">Today</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-xl text-yellow-300 opacity-50">
              <FaCircle />
            </TableCell>
            <TableCell>Delineate</TableCell>
            <TableCell>Describe or portray precisely; distinguish</TableCell>
            <TableCell className="text-right">06/10/2024</TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>Your learning library</TableCaption>
      </Table>
    </>
  );
}
