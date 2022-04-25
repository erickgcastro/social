import React, { useEffect } from "react";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import UserList from "../../components/UserList";

const Users = ({ loadingPage }) => {
  useEffect(() => {
    document.title = `Lista de usuários - Site`;
  }, []);

  return loadingPage ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <UserList />
    </>
  );
};

export default Users;
