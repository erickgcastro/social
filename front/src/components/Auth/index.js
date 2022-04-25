import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Login from "./Login";
import Register from "./Register";
import "./auth.css";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [toogleCreator, setToogleCreator] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.document.body.style.overflowY = "hidden";
  }, []);

  useEffect(() => {
    setError("");
  }, [toogleCreator]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="login-container">
          <div className="error">
            <span>{error}</span>
          </div>
          {!toogleCreator ? (
            <Login
              setError={setError}
              setLoading={setLoading}
              setToogleCreator={setToogleCreator}
            />
          ) : (
            <Register
              setError={setError}
              setToogleCreator={setToogleCreator}
              setLoading={setLoading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
