"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

interface TableSearchProps {
  value: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
}

const TableSearch = ({
  value,
  onSearchChange,
  onSearchClear,
  placeholder = "Search...",
  debounceMs = 700,
  disabled = false,
}: TableSearchProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      if (internalValue !== value) {
        onSearchChange(internalValue);
      }
    }, debounceMs);

    return () => {
      window.clearTimeout(handler);
    };
  }, [debounceMs, internalValue, onSearchChange, value]);

  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon align="inline-start">
        <Search className="h-4 w-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        value={internalValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => setInternalValue(event.target.value)}
        aria-label="Search"
      />
      {internalValue ? (
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            setInternalValue("");
            onSearchClear();
          }}
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </InputGroupButton>
      ) : null}
    </InputGroup>
  );
};

export default TableSearch;
