import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from '@/app/_components/elements/Button';
import Markdown from 'react-markdown';

Modal.setAppElement('body');

type ConfirmModalProps = {
  isOpen: boolean;
  text: string;
  subText?: string;
  callback: (value: boolean) => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, text, subText, callback }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => callback(false)}
      contentLabel="Confirmation Modal"
      className="relative mx-auto w-[500px] rounded-xl bg-black_main bg-opacity-100 p-8 shadow-lg"
      overlayClassName="fixed inset-0 bg-black_main bg-opacity-60 flex items-center justify-center !bg-opacity-50"
    >
      <div className="text-white">
        {subText && (
          <div className="mb-2 text-base">
            {subText}
            <div className="my-4 border-b border-gray-100/30"></div>
          </div>
        )}
        <div className="line-clamp-[10] w-full whitespace-break-spaces text-base leading-[1.7]">
          {/* 空白行の改行削除 */}
          <Markdown className="m-1 font-sans font-light">{text.replace(/^\s*[\r\n]/gm, '')}</Markdown>
        </div>
      </div>
      <div className="mt-7 flex w-full justify-end">
        <Button
          color="none"
          onClick={() => callback(false)}
          className="mr-3 w-16 border border-gray-300/60 text-gray-100 hover:bg-gray-500"
        >
          いいえ
        </Button>
        <Button onClick={() => callback(true)} color="danger" className="w-16 text-white hover:bg-danger/65">
          はい
        </Button>
      </div>
    </Modal>
  );
};
