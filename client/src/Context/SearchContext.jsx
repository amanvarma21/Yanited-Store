import { createContext, useState, useContext } from "react";

// Holds the product search text so the Navbar (where the input now lives)
// and the Home page (which filters products) can share it, even though
// they sit in different parts of the component tree.
const SearchContext = createContext(null);

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext);
}
