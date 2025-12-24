"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ReactNode, RefObject, HTMLAttributes } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  isDismissable?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  headerProps?: HTMLAttributes<HTMLElement>;
  modalRef?: RefObject<HTMLElement>;
}

export function BaseModal({
  isOpen,
  onOpenChange,
  title,
  size = "3xl",
  isDismissable = false,
  children,
  footer,
  headerProps,
  modalRef,
}: BaseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      isDismissable={isDismissable}
      backdrop="opaque"
      ref={modalRef}
    >
      <ModalContent className="border border-dotted border-red-400 border-8 rounded-xl">
        {(onClose) => (
          <>
            <ModalHeader
              className="flex flex-col gap-1 text-2xl"
              {...headerProps}
            >
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {footer ?? (
                <Button color="primary" onPress={onClose}>
                  Schliessen
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
