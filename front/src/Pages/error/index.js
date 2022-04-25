import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./errorPage.css";

import Loading from "../../components/Loading";

const Error = ({ loadingPage }) => {
  useEffect(() => {
    document.title = `Erro - Site`;
  }, []);

  return loadingPage ? (
    <Loading />
  ) : (
    <>
      <main className="error-page">
        <div className="content">
          <h1 style={{marginBottom: 10}}>Erro...</h1>
          <p>
            A página que você está procurando pode ter sido removida devido a
            mudança de nome ou está temporariamente indisponível.
          </p>
          <Link to={"/"} className="link">
            Voltar para página inicial
          </Link>
        </div>
      </main>
    </>
  );
};

export default Error;
