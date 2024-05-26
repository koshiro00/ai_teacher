import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyButton } from '@/app/(dashboard)/chat/[id]/_components/CopyButton';
import { Noto_Sans_JP } from 'next/font/google';
import classes from '@/app/(dashboard)/chat/[id]/_components/style/codeBlock.module.css';

const notSansJp = Noto_Sans_JP({ subsets: ['latin'] });

const customStyle = {
  ...a11yDark,
  'pre[class*="language-"]': {
    ...a11yDark['pre[class*="language-"]'], // 既存のスタイル
    // オーバーライド
    margin: '0',
    borderRadius: '0 0 8px 8px',
    background: 'black',
    fontSize: '14px',
    lineHeight: '1rem',
  },
  // コード（インライン）部分
  'code[class*="language-"]': {
    ...a11yDark['code[class*="language-"]'], // 既存スタイル
  },
};

const customCode = ({ inline, className, children }: any) => {
  const match = /language-(\w+)(:?.+)?/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  const textToCopy = String(children).replace(/\n$/, '');

  return !inline && match ? (
    <div className="my-5">
      {lang && (
        <div className="flex items-center justify-between rounded-t-md bg-[#2F2F2F] px-4 py-2 text-xs text-[#b4b4b4]">
          <span className="px-2 py-1">{lang}</span>
          <span className="">
            <CopyButton textToCopy={textToCopy} />
          </span>
        </div>
      )}
      <SyntaxHighlighter
        style={customStyle}
        language={lang}
        PreTag="div"
        className="!whitespace-pre-wrap !p-4"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <>
      <code
        className={`${classes.no_language} rounded-[4px] px-[6px] pb-[3px] text-base !font-bold !${notSansJp.className}`}
      >
        {children}
      </code>
    </>
  );
};
export const CodeBlock = {
  code: customCode,
};
