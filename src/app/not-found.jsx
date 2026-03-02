import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="max-w-md w-full text-center">
        <div className="text-7xl font-light text-white/20">404</div>
        <div className="h-px w-16 bg-white/10 mx-auto my-4" />
        <h1 className="text-2xl font-semibold text-white">Page not found</h1>
        <p className="text-gray-400 mt-2">
          That URL doesn’t exist. Use the navigation above, or head back to the homepage.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 hover:bg-indigo-500/20"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
