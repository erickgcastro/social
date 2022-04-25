import React, { useContext, useState } from "react";
import { StoreContext } from "../../../App";
import "./creator.css";

const CreatorField = ({ setModalCreator, fc }) => {
  const [enter, setEnter] = useState(false);
  const { image, name } = useContext(StoreContext);

  return (
    <div
      className="creator"
      onClick={() => setModalCreator({ open: true, method: "POST" })}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      style={{ borderColor: fc ? "var(--red)" : undefined }}
    >
      <img src={image} alt={name} />
      <input
        type="text"
        placeholder="Criar post"
        autoComplete="off"
        style={{ borderColor: enter ? "#adadad" : undefined }}
      />
    </div>
  );
};

export default CreatorField;
