import React, { useContext, useState } from "react";
import { StoreContext } from "../../App";

const UserNav = (props) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { setDropMenu } = props.props;
  const { image, name } = useContext(StoreContext);

  return (
    <div
      className="user-nav"
      onClick={() => setDropMenu(true)}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <h4 className={mouseEnter ? "user-name-hover" : undefined}>
        {name || "defaultName"}
      </h4>
      <img
        src={image}
        alt={name}
        className={mouseEnter ? "user-img-hover" : undefined}
      />
    </div>
  );
};

export default UserNav;
