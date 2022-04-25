import axios from "axios";
import React, { useState, useEffect } from "react";
import { checkToken } from "../../script";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";

const ProfilePage = ({ loadingPage }) => {
  const [loading, setloading] = useState(true);
  const [block, setBlock] = useState(false);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      try {
        setloading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_PORT}/users/${userId}`,
          { ...auth, cancelToken: source.token }
        );
        setBlock(data.block);
        setUser(data);
        document.title = `${data.name} - Site`;
        setloading(false);
      } catch (error) {
        console.error(error.message);
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [userId]);

  return loadingPage ? (
    <Loading />
  ) : loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <Profile data={user} block={block} setBlock={setBlock} />
    </>
  );
};

export default ProfilePage;
