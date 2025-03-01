import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedvalue, setdebouncedvalue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebouncedvalue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedvalue;
}
