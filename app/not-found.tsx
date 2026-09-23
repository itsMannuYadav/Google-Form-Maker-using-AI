import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gov-50 text-gov-700">
          <FileQuestion className="h-7 w-7" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gov-600">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gov-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gov-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
