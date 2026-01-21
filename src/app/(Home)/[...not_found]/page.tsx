"use client";
import NotFoundImage from "@/components/404Image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-base-content min-h-[calc(100vh-5.7rem)]">
      <NotFoundImage />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-lg text-base-content/60 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className="btn btn-primary mt-6">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
