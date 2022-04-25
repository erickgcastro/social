import axios from "axios";
import React, { useState, useEffect } from "react";
import { checkToken } from "../../../../script";

import User from "../../../UserList/UserField/User";
import Loading from "../../../LoadingField";
import Wl from "../../../Wl";
import Error from "../../../Error";

const Follo = ({ search, field, block }) => {
  const [loading, setLoading] = useState(false);
  const [wl, setWl] = useState(true);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      try {
        if (page === 1) setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_PORT}/users/field/${field}?page=${page}&search=${search}`,
          { ...auth, cancelToken: source.token }
        );
        setUsers((state) => [...state, ...data]);
        if (data.length === 0) setWl(false);
        if (page === 1) setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [page]);

  return (
    <>
      {loading ? (
        <Loading top={70} cc={true} m={10} />
      ) : (
        <>
          {users.map((item, index) => (
            <User
              data={item}
              key={item._id}
              index={index === users.length - 1 ? true : false}
              setPage={setPage}
              page={page}
              block={block}
              setUsers={setUsers}
            />
          ))}
          <Wl loading={wl} cc={true} />
          {!wl && users.length === 0 && <Error />}
        </>
      )}
    </>
  );
};

export default Follo;
