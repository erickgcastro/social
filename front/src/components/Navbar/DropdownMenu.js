import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../App";

const DropdownMenu = ({ setDropMenu }) => {
  const toogleDropMenu = useRef();
  const { _id } = useContext(StoreContext);

  useEffect(() => {
    const bodyClick = () => setDropMenu(false);
    document.body.addEventListener("click", bodyClick);
    return () => {
      document.body.removeEventListener("click", bodyClick);
    };
  }, []);

  const handleSingOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="dropdown-menu" ref={toogleDropMenu}>
      <div className="dropdown-section">
        <Link className="dropdown-option" to={`/profile/${_id}`}>
          Meu perfil
        </Link>
      </div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-section">
        <Link className="dropdown-option" to="/profile/settings">
          Editar perfil
        </Link>
      </div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-section">
        <Link className="dropdown-option" to="/about">
          Sobre o site
        </Link>
      </div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-section">
        <Link
          className="dropdown-option sing-out"
          to="/auth"
          onClick={handleSingOut}
        >
          Sair
        </Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
