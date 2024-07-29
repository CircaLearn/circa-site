import LibraryTable from "@/components/LibraryTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <p className="text-2xl font-bold">Library</p>

      <LibraryTable ></LibraryTable>
    </>
  );
}
