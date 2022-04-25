import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./block.css";
import { AiFillLock } from "react-icons/ai";
import { StoreContext } from "../../App";

const Block = () => {
  const { _id } = useContext(StoreContext);
  return (
    <div className="block-field">
      <div className="content">
        <AiFillLock style={{ fontSize: 35 }} />
        <p style={{ marginBottom: 20 }}>
          Você está impedido de seguir e ver os posts desta conta
        </p>
        <Link to={`/profile/${_id}`} className="btn">
          Ver meu perfil
        </Link>
      </div>
    </div>
  );
};

export default Block;
