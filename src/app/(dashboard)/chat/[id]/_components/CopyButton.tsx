import React, { useState, ComponentProps } from 'react';

type CopyButtonProps = ComponentProps<'button'> & {
  textToCopy: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, ...props }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyClickHandle = async (): Promise<void> => {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <button
      className={`group relative flex items-center gap-1 text-xs opacity-70 hover:opacity-100 ${props.className}`}
      onClick={copyClickHandle}
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
        {isCopied ? (
          <path d="M4 12l6 6L20 6" />
        ) : (
          <>
            <path d="M15.5 4H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.5" />
            <path d="M8.621 3.515A2 2 0 0 1 10.561 2h2.877a2 2 0 0 1 1.94 1.515L16 6H8l.621-2.485z" />
            <path d="M9 12h6" />
            <path d="M9 16h6" />
          </>
        )}
      </svg>
      <span
        className={`absolute left-1/2 top-8 hidden h-6 w-max -translate-x-1/2 transform rounded bg-black_main px-2 py-1 text-xs text-white shadow-md before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-black before:content-[''] ${!isCopied && 'group-hover:block'}`}
      >
        コピー
      </span>
    </button>
  );
};
