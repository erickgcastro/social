import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkToken } from "../../script";

import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import PostContainer from "../../components/PostContainer";

const Post = ({ LoadingPage }) => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_PORT}/posts/${postId}`,
          { ...auth, cancelToken: source.token }
        );
        setData(data[0]);
        document.title = `Post de ${data[0].creatorName} - Site`;
        setloading(false);
      } catch (error) {
        console.error(error.message);
        setloading(false);
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, []);

  return LoadingPage || loading ? (
    <Loading />
  ) : !data.postId ? (
    (window.location = "/error")
  ) : (
    <>
      <Navbar />
      {!loading && <PostContainer data={data} />}
    </>
  );
};

export default Post;
