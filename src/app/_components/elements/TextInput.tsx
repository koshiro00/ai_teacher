'use client';
import React, { ComponentProps, forwardRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { cva } from 'class-variance-authority';

// ベース設定
const baseClassName = 'text-base w-full h-12 rounded-lg px-2';

const inputStyles = cva(baseClassName, {
  variants: {
    variant: {
      primary: 'border border-input_main',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'primary',
  },
});

type InputProps = ComponentProps<'input'> & {
  variant: 'primary'; //必要に応じて増やす
  label: string;
  type: string;
};

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, label, variant, className, ...otherProps }, ref) => {
    const [inputType, setInputType] = useState(type);
    const combinedClassName = `${inputStyles({ variant })} ${className || ''}`;

    const handleShowPassword = () => {
      setInputType(inputType === 'text' ? 'password' : 'text');
    };

    return (
      <>
        <label htmlFor={id} className="mb-2 block text-sm font-bold">
          {label}
        </label>
        <div className="relative w-full">
          <input type={inputType} ref={ref} id={id} className={combinedClassName} {...otherProps} />

          {type === 'password' && (
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-5 top-[14px]"
              aria-label={inputType === 'text' ? 'Hide password' : 'Show password'}
            >
              {inputType === 'text' ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
          )}
        </div>
      </>
    );
  }
);

TextInput.displayName = 'Input';
