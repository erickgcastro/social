import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { checkToken } from "../../script";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Settings from "../../components/Settings";

import { StoreContext } from "../../App";
const SettingsPage = ({ loadingPage }) => {
  const { _id } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    document.title = `Editar perfil - Site`;
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (_id) {
      checkToken((auth) => {
        axios
          .get(`${process.env.REACT_APP_API_PORT}/users/${_id}`, {
            ...auth,
            cancelToken: source.token,
          })
          .then((res) => {
            setUser(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error.message);
            window.location = "/error";
          });
      });
    }
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [_id]);

  return loadingPage ? (
    <Loading />
  ) : loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <Settings data={user} />
    </>
  );
};

export default SettingsPage;
