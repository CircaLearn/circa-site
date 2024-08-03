'use client';

import LibraryTable from "@/components/LibraryTable";
import SkeletonTable from "@/components/SkeletonTable";
import fetchConcepts from "@/lib/fetchConcepts";
import { useEffect, useState } from "react";
import { RowData } from "@/lib/types";

export default function Page() {
  const [data, setData] = useState<RowData[] | null>(null);
  const [receivedTime, setReceivedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, receivedTime } = await fetchConcepts();
      setData(data);
      setReceivedTime(receivedTime);
    };

    fetchData();

    return () => {}; // no cleanup needed
  }, []);

  return (
    <>
      <p className="text-2xl font-bold">Library</p>
      {data && receivedTime ? (
        <LibraryTable data={data} receivedTime={receivedTime} />
      ) : (
        <SkeletonTable />
      )}
    </>
  );
}
