import React, { useState } from "react";

const Filter = ({ setOpFollowing, setSort, setPage }) => {
  const [checkbox, setCheckbox] = useState(false);
  const [select, setSelect] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage((page) => 1);
    setOpFollowing(checkbox);
    setSort(select);
  };

  return (
    <div className="filter">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="op_following" style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              name="op_following"
              id="op_following"
              onChange={(e) => setCheckbox((state) => !checkbox)}
            />
            Ocultar quem eu sigo
          </label>
          <label htmlFor="sort">
            <span>Filtrar seguidores: </span>
            <select
              name="sort"
              id="sort"
              style={{ cursor: "pointer" }}
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value=""></option>
              <option value="-followers">&#8595;</option>
              <option value="followers">&#8593;</option>
            </select>
          </label>
        </div>
        <button type="submit">Adicionar filtro</button>
      </form>
    </div>
  );
};

export default Filter;
