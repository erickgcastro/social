import axios from "axios";
import React, { useState, useEffect } from "react";

const Register = ({ setToogleCreator, setLoading, setError }) => {
  const [userInfos, setUserInfos] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfos({ ...userInfos, [name]: value });
  };

  useEffect(() => {
    document.title = `Criar conta - Site`;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfos.name && userInfos.password) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_PORT}/auth/register`,
          userInfos
        );
        window.localStorage.setItem("token", data.token);
        window.location = "/";
      } catch (error) {
        console.error(error.message);
        setError((state) => error.response.data.msg);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form className="input-container" onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: 30 }}>Criar Conta</h1>
        <div className="input-divider">
          <div className="input">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome de usuário"
              autoComplete="off"
              value={userInfos.name}
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              value={userInfos.email}
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <input
              type="password"
              id="password"
              placeholder="Senha"
              name="password"
              autoComplete="off"
              value={userInfos.password}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="btn-container">
          <button type="submit" className="btn-submit">
            Criar conta
          </button>
          <button
            type="submit"
            className="btn-link"
            onClick={() => setToogleCreator(false)}
          >
            Já tenho conta
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
