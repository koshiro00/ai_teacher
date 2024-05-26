// Button.tsx
import React, { ComponentProps } from 'react';
import { cva } from 'class-variance-authority';

// ベース設定
const baseClassName = 'flex items-center justify-center text-sm rounded-lg';

const buttonStyles = cva(baseClassName, {
  variants: {
    color: {
      primary: 'bg-black_main text-white',
      secondary: 'bg-white',
      danger: 'bg-danger',
      none: 'bg-none',
    },
    block: {
      true: 'w-full block',
      false: 'inline-block',
    },
    disabled: {
      true: 'bg-opacity-60 cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      className: 'font-bold py-3',
    },
    {
      color: ['secondary', 'danger', 'none'],
      className: 'py-2',
    },
  ],
  defaultVariants: {
    color: 'primary',
    block: false,
  },
});

type ButtonProps = ComponentProps<'button'> & {
  color: 'primary' | 'secondary' | 'danger' | 'none';
  children: string;
  block?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  color,
  block,
  disabled,
  children,
  className,
  ...otherProps
}) => {
  // 最終的なclassNameを生成
  const combinedClassName = `${buttonStyles({ color, block, disabled })} ${className || ''}`;

  return (
    <button className={combinedClassName} {...otherProps}>
      {children}
    </button>
  );
};
