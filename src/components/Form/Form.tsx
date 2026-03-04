import { type FormHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Form.module.css";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

function Form({
  children,
  threeD = false,
  className = "",
  ...props
}: FormProps) {
  return (
    <form className={cn(styles.spacing, threeD && "solstice-ui-3d", className)} {...props}>
      {children}
    </form>
  );
}

export default Form;
