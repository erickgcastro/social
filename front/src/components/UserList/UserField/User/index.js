import axios from "axios";
import React, { useState, memo, useRef, useEffect, useContext } from "react";
import { checkToken } from "../../../../script";
import { StoreContext } from "../../../../App";

import { FaUserTimes } from "react-icons/fa";

import BtnFllow from "./BtnFollow";

const User = ({ data, index, setPage, block, setUsers }) => {
  const { _id } = useContext(StoreContext);
  const refUser = useRef();
  const [limit, setLimit] = useState(true);
  const [enter, setEnter] = useState(false);

  const removeBlocked = (e) => {
    e.stopPropagation();
    checkToken(async (auth) => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_PORT}/users/field/blacklist/${data._id}`,
          auth
        );
        setUsers((state) => state.filter((item) => item._id !== data._id));
      } catch (error) {
        console.error(error);
      }
    });
  };

  const callUsers = () => {
    if (index) {
      if (limit) {
        setLimit(false);
        if (setPage) {
          if (refUser.current) {
            if (
              refUser.current.getBoundingClientRect().top < window.innerHeight
            ) {
              setPage((page) => page + 1);
              setPage = false;
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    window.addEventListener("load", callUsers());
    window.addEventListener("scroll", callUsers);
    return () => {
      window.removeEventListener("load", callUsers);
      window.removeEventListener("scroll", callUsers);
    };
  }, []);

  return (
    <div
      className="user"
      style={{ marginBottom: 10 }}
      ref={refUser}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      onClick={() => (window.location = `/profile/${data._id}`)}
    >
      <div className="infos">
        <img src={data.image} alt={`Foto de ${data.name}`} />
        <div>
          <p style={{ textDecoration: enter ? "underline" : undefined }}>
            {data.name}
          </p>
          <span style={{ marginTop: -5 }}>
            {data.followers} seguidor{data.followers === 1 ? "" : "es"}
          </span>
        </div>
      </div>

      {data._id !== _id ? (
        block ? (
          <button className="btn-block" onClick={removeBlocked}>
            <span>
              <FaUserTimes />
            </span>
          </button>
        ) : (
          <BtnFllow data={data} />
        )
      ) : undefined}
    </div>
  );
};

export default memo(User);
