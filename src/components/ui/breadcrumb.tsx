import Link from "next/link";
import * as React from "react";

interface BreadcrumbProps {
  currentPath: string;
  contentName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPath,
  contentName,
}) => {
  const pathSegments = currentPath
    .split("/")
    .filter((segment) => segment.trim() !== "");
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    return (
      <li key={segment} className="inline-flex items-center">
        <a
          href={path}
          className={`capitalize flex items-center text-sm ${
            isLast
              ? "font-semibold text-gray-800 dark:text-gray-200"
              : "text-gray-500 hover:text-blue-600 focus:text-blue-600 dark:focus:text-blue-500"
          }`}
        >
          {segment}
          {isLast && (
            <svg
              className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </a>
      </li>
    );
  });

  return (
    <ol
      className="flex items-center whitespace-nowrap mb-3"
      aria-label="Breadcrumb"
    >
      <li className="inline-flex items-center">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:text-blue-600 dark:focus:text-blue-500"
        >
          Home
        </Link>
        <svg
          className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 dark:text-neutral-600"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </li>
      {breadcrumbs}
      <li
        className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
        aria-current="page"
      >
        {contentName}
      </li>
    </ol>
  );
};

export default Breadcrumb;
