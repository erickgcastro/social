import axios from "axios";
import React, { useState } from "react";
import { checkToken } from "../../../../../script";

const BtnFollow = ({ data }) => {
  const [loading, setloading] = useState(false);
  const [following, setFollowing] = useState(
    typeof data.if === "boolean" ? data.if : data.following
  );
  const [btnUnfollow, setBtnUnfollow] = useState(false);

  const handleFollow = (e) => {
    e.stopPropagation();
    checkToken(async (auth) => {
      setloading(true);
      try {
        let res = "";
        if (following) {
          res = await axios.delete(
            `${process.env.REACT_APP_API_PORT}/users/field/following/${data._id}`,
            auth
          );
        } else {
          res = await axios.patch(
            `${process.env.REACT_APP_API_PORT}/users/field/following/${data._id}`,
            {},
            auth
          );
        }
        setloading(false);
        setFollowing(res.data.following);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    });
  };

  return (
    <button
      className={following ? "fw btn" : "btn"}
      onClick={handleFollow}
      onMouseEnter={() => setBtnUnfollow(true)}
      onMouseLeave={() => setBtnUnfollow(false)}
      disabled={!loading ? false : true}
    >
      {following ? (btnUnfollow ? "Deixar de seguir" : "Seguindo") : "Seguir"}
    </button>
  );
};

export default BtnFollow;
