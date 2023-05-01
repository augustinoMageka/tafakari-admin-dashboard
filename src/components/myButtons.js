export function MyButton({
  children,
  loading,
  onClick = null,
  fullyWide = false,
}) {
  return (
    <button
      type="submit"
      className={`bg-red-500 text-sm text-white py-2 rounded-lg px-2 inline-flex justify-center items-center gap-2 border border-transparent font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:bg-red-500 disabled:bg-opacity-50 ${
        fullyWide && "w-full"
      }`}
      disabled={loading}
      onClick={onClick}
    >
      <span
        className={`animate-spin ${
          loading ? "inline-block" : "hidden"
        } w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full`}
        role="status"
        aria-label="loading"
      ></span>
      {children}
    </button>
  );
}

export function MyEditIconButton({ onClick }) {
  return (
    <button
      type="button"
      className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-full border border-transparent font-semibold bg-blue-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-5 h-5 fill-white"
      >
        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
      </svg>
    </button>
  );
}

export function MyDeleteIconButton({ onClick, item }) {
  return (
    <button
      type="button"
      className="ml-2 inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-full border border-transparent font-semibold bg-red-400 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800"
      onClick={() => onClick(item)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-5 h-5 fill-white"
      >
        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
      </svg>
    </button>
  );
}
