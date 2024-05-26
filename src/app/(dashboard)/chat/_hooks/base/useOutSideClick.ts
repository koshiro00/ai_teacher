import { useEffect, useState, useRef } from 'react';

export const useOutsideClick = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClickedOutside, setClickedOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // ref.current が存在し、クリックされた要素が ref の要素を含まない場合
      if (
        (divRef.current && !divRef.current.contains(event.target as Node)) ||
        (inputRef.current && !inputRef.current?.contains(event.target as Node))
      ) {
        setClickedOutside(true);
        // 外部クリック後、次のクリックでリセット
        setTimeout(() => setClickedOutside(false), 0);
      } else {
        setClickedOutside(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // アンマウント時イベントリスナー削除
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    divRef,
    inputRef,
    isClickedOutside,
    setClickedOutside,
  };
};
