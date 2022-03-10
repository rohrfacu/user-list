import { useState, useEffect } from "react";

const SearchBar = ({ searchByName }) => {
  const [name, setName] = useState("");

  // When we type a name, we call the searchByName function in
  // the parent component
  useEffect(() => {
    searchByName(name);
  }, [name]);

  return (
    <input
      className="searchbar margin-5px"
      type="text"
      name="name"
      placeholder="Search by name, clear to re search..."
      value={name}
      onChange={(e) => {
        setName(e.target.value || "");
      }}
    />
  );
};

export default SearchBar;
