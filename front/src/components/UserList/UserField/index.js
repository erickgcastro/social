import axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { checkToken } from "../../../script";

import User from "./User";
import Loading from "../../LoadingField";
import Wl from "../../Wl";
import Error from "../../Error";

const UserField = ({ url, setPage, page }) => {
  const [loading, setLoading] = useState(false);
  const [wl, setWl] = useState(true);
  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      try {
        if (page === 1) setLoading(true);
        const { data } = await axios.get(url, {
          ...auth,
          cancelToken: source.token,
        });
        setallUsers((state) => {
          if (page === 1) return data.userList;
          return [...state, ...data.userList];
        });
        if (data.userList.length === 0) setWl(false);
        if (page === 1) setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [url]);

  return (
    <div className="users-list">
      {loading ? (
        <Loading top={50} cc={true} t={450} />
      ) : (
        <>
          {allUsers.map((item, index) => (
            <User
              data={item}
              key={item._id}
              index={index === allUsers.length - 1 ? true : false}
              setPage={setPage}
              page={page}
            />
          ))}
          <Wl loading={wl} cc={true} />
          {!wl && allUsers.length === 0 && (
            <Error content={"Nenhum usuário encontrado..."} width={400} />
          )}
        </>
      )}
    </div>
  );
};

export default memo(UserField);
