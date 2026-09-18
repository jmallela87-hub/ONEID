export default function ProfileNotFound() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
      <p className="text-sm font-semibold tracking-tight">ONEID</p>
      <h1 className="mt-6 text-lg font-medium">This ONEID doesn&apos;t exist</h1>
      <p className="mt-2 text-sm text-muted">
        The card you scanned may have been removed, or the link is incorrect.
      </p>
    </main>
  );
}
