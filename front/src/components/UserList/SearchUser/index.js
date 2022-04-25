import React, { useState, useEffect } from "react";

const SearchUser = ({ setUrl, setName, setPage }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (/\w/g.test(input)) {
      setPage((page) => 1);
      setName((state) => input);
    } else {
      setPage((page) => 1);
      setName((state) => "");
    }
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="searchUser">
      <input
        type="text"
        placeholder="Buscar usuário"
        value={input}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchUser;
