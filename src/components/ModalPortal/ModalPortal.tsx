import React from "react";
import { createPortal } from "react-dom";

export interface ModalPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  container = document.body,
}) => {
  return createPortal(children, container);
};

export default ModalPortal;
