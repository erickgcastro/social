import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { checkToken } from "../../../../script";

import Loading from "../../../LoadingField";
import Wl from "../../../Wl";
import Post from "../../../PostsField/Post";
import Error from "../../../Error";
import { PostsContext } from "../..";

const UserPost = ({ search }) => {
  const { modalCreator, setModalCreator, setDeletePost, setPosts, posts } =
    useContext(PostsContext);
  const [loading, setLoading] = useState(true);
  const [wl, setWl] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (search !== undefined) {
      checkToken(async (auth) => {
        if (page === 1) setLoading(true);
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_PORT}/users/field/posts?page=${page}&search=${search}`,
            { ...auth, cancelToken: source.token }
          );
          setPosts((state) => [...state, ...data]);
          if (data.length === 0) setWl(false);
          if (page === 1) setLoading(false);
        } catch (error) {
          console.error(error.message);
          if (page === 1) setLoading(false);
        }
      });
    }
    return () => source.cancel("AXIOS_REQUEST_CANCELLED");
  }, [page]);

  return loading ? (
    <Loading top={70} cc={true} block={true} m={10} />
  ) : (
    <>
      {posts.map((item, index) => (
        <Post
          key={item.postId + item.creatorId + index}
          data={item}
          setModalCreator={setModalCreator}
          modalCreator={modalCreator}
          setPosts={setPosts}
          setDeletePost={setDeletePost}
          setPage={index === posts.length - 1 ? setPage : undefined}
        />
      ))}
      <Wl loading={wl} cc={true} />
      {!wl && posts.length === 0 && <Error />}
    </>
  );
};

export default UserPost;
