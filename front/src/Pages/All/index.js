import axios from "axios";
import React, { useState, useEffect } from "react";
import { checkToken } from "../../script";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import PostsField from "../../components/PostsField";

const All = ({ loadingPage }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wl, setWl] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = `All - Site`;
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAllPosts = async () => {
      checkToken(async (auth) => {
        if (page === 1) setLoading(true);
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_PORT}/posts?page=${page}`,
            { ...auth, cancelToken: source.token }
          );
          setPosts((posts) => [...posts, ...data.posts]);
          if (data.posts.length === 0) setWl(false);
          setLoading(false);
        } catch (err) {
          console.error(err.message);
        }
      });
    };
    getAllPosts();

    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [page]);

  return loadingPage ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <PostsField {...{ loading, posts, setPosts, setPage, wl }} />
    </>
  );
};

export default All;
