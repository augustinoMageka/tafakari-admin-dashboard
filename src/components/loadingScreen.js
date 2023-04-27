export default function LoadingScreen() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div
        className="animate-spin inline-block w-16 h-16 border-[3px] border-current border-t-transparent text-teal-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
