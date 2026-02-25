import React from "react";
import { Search } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./SearchInput.module.css";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  disabled = false,
  threeD = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn(styles.container, threeD && "solstice-ui-3d", className)}>
      <div className={styles.wrapper}>
        <div className={styles.iconContainer}>
          <Search className={styles.icon} />
        </div>
        <input
          type="search"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.field}
          disabled={disabled}
          aria-label={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchInput;
