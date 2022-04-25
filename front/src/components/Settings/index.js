import axios from "axios";
import React, { useState, useEffect } from "react";
import { checkToken } from "../../script";
import "./settings.css";

import Loading from "../LoadingField";

const Settings = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const [image, setImage] = useState(false); // arquivo que vai ser enviado para o servidor
  const [prev, setPrev] = useState(data.image); // arquivo que vai aparecer no form

  // handleForm
  const [bodyData, setBodyData] = useState({ name: "", email: "" });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBodyData((state) => ({ ...state, [name]: value }));
  };

  // Enviar o formulário
  let source = "AXIOS_TOKEN";
  const updateUser = (e) => {
    e.preventDefault();
    source = axios.CancelToken.source();

    const formData = new FormData();
    if (image) formData.append("image", image);
    for (const key in bodyData) {
      if (bodyData[key]) formData.append(key, bodyData[key]);
    }

    checkToken(async (auth) => {
      try {
        setAlert(false);
        setLoading(true);
        await axios.patch(
          `${process.env.REACT_APP_API_PORT}/users/${data._id}`,
          formData,
          { ...auth, cancelToken: source.token }
        );
        setAlert("Sucesso!!!");
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error(error.response.data.msg);
        setSuccess(false);
        setAlert(error.response.data.msg);
        setLoading(false);
      }
      source = "";
    });
  };

  useEffect(() => {
    return () => {
      if (source.cancel) source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, []);

  const changeImage = e => {
    if(e.target.files[0].size < 150000){
      setImage(e.target.files[0]);
      setPrev(URL.createObjectURL(e.target.files[0]));
      setAlert(false)
    }else{
      console.error("The file must be smaller than 150 KB");
      setAlert("O arquivo deve ter menos de 150 KB");
    }
  }

  return (
    <main className='cc'>
      <div className='sc' style={{ height: alert ? 500 : 450 }}>
        {alert && (
          <span
            className='alert'
            style={{ color: success ? "#03d96c" : "var(--red)" }}
          >
            {alert}
          </span>
        )}
        <form onSubmit={updateUser}>
          <div>
            <label htmlFor='image' style={{ marginBottom: 5, fontSize: 18 }}>
              Foto de perfil
            </label>
            <div className='select-img'>
              <img src={prev} alt='Foto escolhida pelo usuário' />
              <input
                type='file'
                name='image'
                id='image'
                accept='.png, .jpg, .jpeg, .jfif'
                onChange={changeImage}
              />
            </div>
          </div>

          <div>
            <label htmlFor='name'>Nome</label>
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='off'
              value={bodyData.name}
              placeholder={data.name}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={bodyData.email}
              autoComplete='off'
              required={false}
              placeholder={data.email}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor='password'>Senha</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='*************'
              onChange={handleInput}
            />
          </div>

          {loading ? (
            <Loading top={40} />
          ) : (
            <div className='btns'>
              <button type='submit'>Salvar Alterações</button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Settings;
