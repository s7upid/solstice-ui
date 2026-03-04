import { Search } from "lucide-react";
import Input from "../Input/Input";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  disabled = false,
  threeD = false,
}: SearchInputProps) {
  return (
    <Input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      icon={Search}
      iconPosition="left"
      disabled={disabled}
      threeD={threeD}
      className={className}
      aria-label={placeholder}
    />
  );
}

export default SearchInput;
