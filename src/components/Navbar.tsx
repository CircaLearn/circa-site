import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div
        className={`w-full bg-sky-500 py-4`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/" className="text-white font-semibold">
              Home
            </Link>
            <Link href="/library" className="text-white font-semibold">
              Library
            </Link>
          </div>
          <div>
            <Link href="/login" className="text-white font-semibold">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
