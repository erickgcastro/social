import React from "react";

import Loading from "../LoadingField";

const Wl = ({ loading, cc }) => {
  return (
    loading && (
      <div className="wl">
        <Loading top={50} cc={cc} />
      </div>
    )
  );
};

export default Wl;
