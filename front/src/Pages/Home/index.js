import axios from "axios";
import React, { useState, useEffect } from "react";
import { checkToken } from "../../script";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import PostsField from "../../components/PostsField";

const Home = ({ loadingPage }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [wl, setWl] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = `Site`;
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getFollowing = async () => {
      checkToken(async (auth) => {
        if (page === 1) setLoading(true);
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_PORT}/posts/following?page=${page}`,
            { ...auth, cancelToken: source.token }
          );
          setPosts((posts) => [...posts, ...data.posts]);
          if (data.posts.length === 0) setWl(false);
          if (page === 1) setLoading(false);
        } catch (error) {
          console.error(error.message);
          if (page === 1) setLoading(false);
        }
      });
    };
    getFollowing();

    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [page]);

  return loadingPage ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <PostsField
        {...{ loading, posts, setPosts, setPage, creator: true, wl }}
      />
    </>
  );
};

export default Home;
