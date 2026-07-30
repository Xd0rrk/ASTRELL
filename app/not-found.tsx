import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-neutral-400 mb-8">The page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition">
        Return Home
      </Link>
    </div>
  );
}
