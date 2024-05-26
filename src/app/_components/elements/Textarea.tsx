'use client';
import React, { ChangeEvent, ComponentProps, forwardRef } from 'react';
import { cva } from 'class-variance-authority';

// ベース設定
const baseClassName = 'text-base w-full px-6 py-[12px] rounded-lg';

const inputStyles = cva(baseClassName, {
  variants: {
    variant: {
      primary: 'border border-input_main',
    },
    position: {
      bottomFixed: 'fixed bottom-10 max-w-[600px]',
    },
    autoHeight: {
      true: 'h-[50px] max-h-52 resize-none rounded-lg overflow-auto',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'primary',
  },
});

type TextareaProps = ComponentProps<'textarea'> & {
  variant: 'primary'; //必要に応じて増やす
  position?: 'bottomFixed';
  autoHeight?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, variant, position, className, autoHeight, ...otherProps }, ref) => {
    const combinedClassName = `${inputStyles({ variant, position, autoHeight })} ${className || ''}`;

    // heightの自動調整
    const adjustHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      const isSingleHeight = 52; // style.heightにおける1行の高さ
      const isSingleLine = textarea.scrollHeight <= 76; // scrollHeightにおける1行分の高さ
      const hasNewLine = textarea.value.includes('\n'); // 改行
      textarea.style.height = 'auto'; // 更新
      // 入力なし || (改行なし & 1行分以下の高さ)
      if (textarea.value === '' || (!hasNewLine && isSingleLine)) {
        textarea.style.height = `${isSingleHeight}px`;
      } else {
        // 改行が含まれている場合は動的に高さを設定
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    return (
      <>
        <textarea
          ref={ref}
          id={id}
          className={combinedClassName}
          onChange={autoHeight ? adjustHeight : undefined}
          {...otherProps}
        />
      </>
    );
  }
);

Textarea.displayName = 'Textarea';
