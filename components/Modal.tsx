"use client";
import React, { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        className="absolute top-2 right-2 bg-transparent border border-blue-500 rounded-full py-1 px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
        onClick={onDismiss}
      >
        x
      </button>
      <div ref={wrapper} className="modal_wrapper mt-2">
        {children}
      </div>
    </div>
  );
};

export default Modal;
