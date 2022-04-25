import React from "react";

import './loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading">
        <div className="box"></div>
        <h2>Carregando...</h2>
      </div>
    </div>
  );
};

export default Loading;
