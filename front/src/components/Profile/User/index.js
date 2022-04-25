import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../App";
import BtnFollow from "../../UserList/UserField/User/BtnFollow";
import { BsFillGearFill } from "react-icons/bs";
import { checkToken } from "../../../script";
import axios from "axios";

const User = ({ data, block, setBlock }) => {
  const { _id } = useContext(StoreContext);
  const [btnBlock, setBtnBlock] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      if (btnBlock) {
        axios
          .patch(
            `${process.env.REACT_APP_API_PORT}/users/field/blacklist/${data._id}`,
            {},
            { ...auth, cancelToken: source.token }
          )
          .then((res) => (res.data.blackList ? setBlock(true) : undefined))
          .catch((error) => console.error(error.message));
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [btnBlock]);

  return (
    <div className="user-infos">
      <div className="primary">
        <img src={data.image} alt="foto de perfil" />
        <p>{data.name}</p>
      </div>
      <div className="ff">
        <p>{data.followers} Followers</p>
        <p>{data.following} Following</p>
      </div>
      {_id === data._id ? (
        <button
          className="fw btn"
          onClick={() => (window.location = "/profile/settings")}
        >
          Editar perfil
          <BsFillGearFill />
        </button>
      ) : (
        !block && (
          <>
            <BtnFollow data={data} />
            <button
              disabled={btnBlock}
              className="btn-block"
              onClick={() => setBtnBlock(true)}
            >
              Bloquear usuário
            </button>
          </>
        )
      )}
    </div>
  );
};

export default User;
