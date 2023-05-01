import Link from "next/link";

export default function CardLink({ link, text }) {
  return (
    <Link
      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700"
      href={link}
    >
      {text}
      <svg
        className="w-2.5 h-auto"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
