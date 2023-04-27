import { useUpdateModalContext } from "@/context/modalContext";
import { signOut, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

export default function Appbar() {
  const auth = getAuth();
  const setModalState = useUpdateModalContext();
  const logoutSuccessNotify = () => toast.success("Logout success");
  const handleLogout = async () => {
    try {
      await signOut(auth);
      logoutSuccessNotify();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-end">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600 lg:hidden"
          data-hs-overlay="#docs-sidebar"
          aria-controls="docs-sidebar"
          aria-label="Toggle navigation"
          onClick={() => setModalState(true)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <h1 className="text-xl">Pharmacist</h1>
      </div>
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-dropdown-custom-trigger"
          type="button"
          className="hs-dropdown-toggle pr-2 pl-1 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-white focus:ring-blue-200 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
        >
          <img
            className="w-7 h-7 rounded-full"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Maria"
          />
          <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
            Maria
          </span>
          <svg
            className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2  dark:bg-gray-800 dark:border dark:border-gray-700"
          aria-labelledby="hs-dropdown-custom-trigger"
        >
          <button className="flex w-full  items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
            Profile
          </button>
          <button
            className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
