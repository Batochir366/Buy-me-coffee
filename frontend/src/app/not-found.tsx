export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl">Page not found</p>
      <a href="/" className="mt-6 text-blue-500 underline">
        Go back home
      </a>
    </div>
  );
}
