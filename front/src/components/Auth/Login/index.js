import axios from "axios";
import React, { useState, useEffect } from "react";

const Login = ({ setLoading, setToogleCreator, setError }) => {
  const [userInfos, setUserInfos] = useState({
    name: "",
    password: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfos({ ...userInfos, [name]: value });
  };

  useEffect(() => {
    document.title = `Login - Site`;
  }, []);

  // Fetch data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfos.name && userInfos.password) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_PORT}/auth/login`,
          userInfos
        );
        localStorage.setItem("token", data.token);
        window.location = "/";
      } catch (error) {
        console.error(error.message);
        setError((state) => error.response.data.msg);
        setLoading(false);
      }
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <h1 style={{ marginBottom: 30 }}>Login</h1>
      <div className="input-divider">
        <div className="input">
          <label htmlFor="login">Nome de usuário</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={userInfos.name}
            onChange={handleInput}
          />
        </div>
        <div className="input">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={userInfos.password}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="btn-container">
        <button type="submit" className="btn-submit">
          Login
        </button>
        <button
          type="button"
          className="btn-link"
          onClick={() => setToogleCreator(true)}
        >
          Criar conta
        </button>
      </div>
    </form>
  );
};

export default Login;
