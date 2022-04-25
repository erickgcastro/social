import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../App";

const SideMenu = ({ setSideMenu }) => {
  const { _id, image, name } = useContext(StoreContext);

  return (
    <div className='side-menu' onClick={() => setSideMenu(false)}>
      <div className='op' onClick={(e) => e.stopPropagation()}>
        <Link to={`/profile/${_id}`} className='user-op link'>
          <img src={image} alt='Foto de perfil' />
          <span>{name}</span>
        </Link>
        <div className='dropdown-divider'></div>
        <div className='actions'>
          <Link to={"/profile/settings"}>Editar perfil</Link>
          <Link
            className='link'
            to={"/auth"}
            style={{ color: "var(--red)" }}
            onClick={() => localStorage.removeItem("token")}
          >
            Sair
          </Link>
        </div>
        <span className='span-tt'>LOGO</span>
      </div>
    </div>
  );
};

export default SideMenu;
