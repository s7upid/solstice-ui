import React from "react";
import { cn } from "../../utils/cn";
import styles from "./Form.module.css";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  children,
  threeD = false,
  className = "",
  ...props
}) => {
  return (
    <form className={cn(styles.spacing, threeD && "solstice-ui-3d", className)} {...props}>
      {children}
    </form>
  );
};

export default Form;
