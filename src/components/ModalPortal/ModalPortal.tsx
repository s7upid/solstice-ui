import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ModalPortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

function ModalPortal({
  children,
  container = document.body,
}: ModalPortalProps) {
  return createPortal(children, container);
}

export default ModalPortal;
