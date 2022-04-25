import React, { useState, useEffect } from "react";

import "./loading.css";

const Loading = ({ top, cc, m, t, block }) => {
  const [width, setWidth] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    const resize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className="box"
      style={
        cc
          ? {
              marginTop: m || top || 150,
              left: width <= (t || block || 375) ? "0%" : "50%",
              width: 15,
              height: 15,
            }
          : { marginTop: top || 150 }
      }
    ></div>
  );
};

export default Loading;
