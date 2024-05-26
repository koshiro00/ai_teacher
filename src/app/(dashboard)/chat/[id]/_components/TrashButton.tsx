import React, { ComponentProps } from 'react';

export const TrashButton: React.FC<ComponentProps<'button'>> = ({ className, ...props }) => {
  return (
    <button
      className={`group relative flex items-center gap-1 text-xs opacity-70 hover:opacity-100 ${className}`}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
      <span
        className={`absolute left-1/2 top-8 hidden h-6 w-max -translate-x-1/2 transform rounded bg-red-500 px-2 py-1 text-xs text-white shadow-md before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-red-500 before:content-[''] group-hover:block`}
      >
        削除
      </span>
    </button>
  );
};
