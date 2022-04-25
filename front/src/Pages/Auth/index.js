import React from "react";

import Auth from "../../components/Auth";
import Loading from "../../components/Loading";

const Authentication = ({ loadingPage }) => {
  return loadingPage ? <Loading /> : <Auth />;
};

export default Authentication;
