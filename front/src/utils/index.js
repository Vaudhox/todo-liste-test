import React from "react";
import {
  useLocation
} from "react-router-dom";

export function Capitalize(string) {
  switch (string.length) {
    case 0: return ''
    case 1: return  string.charAt(0).toUpperCase()
    default: return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
