import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

export default function SkeletonTable() {
  return (
    <>
      {/* <div className="flex flex-row gap-4 mt-4 mb-1">
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm shimmer">
          New
        </div>
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm shimmer">
          Integrating
        </div>
        <div className="rounded-3xl bg-slate-500 bg-opacity-25 px-2 py-1 text-sm shimmer">
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
          {[...Array(15)].map((_, index) => (
            <TableRow key={index}>
              <TableHead className="w-[10%]">
                <div className="h-6 bg-gray-300 mx-2 rounded shimmer"></div>
              </TableHead>
              <TableHead className="w-[20%]">
                <div className="h-6 bg-gray-300 mx-2 rounded shimmer"></div>
              </TableHead>
              <TableHead className="w-[45%]">
                <div className="h-6 bg-gray-300 mx-2 rounded shimmer"></div>
              </TableHead>
              <TableHead className="w-[13%] text-right">
                <div className="h-6 bg-gray-300 mx-2 rounded shimmer"></div>
              </TableHead>
              <TableHead className="w-[12%] text-right">
                <div className="h-6 bg-gray-300 mx-2 rounded shimmer"></div>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
