import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./about.css";

import Loading from "../../components/Loading";

import firebase from "./img/fir.png";
import express from "./img/expre.png";
import mongodb from "./img/mdb.png";
import rct from "./img/rct.png";
import router from "./img/router.png";

const About = ({ loadingPage }) => {
  useEffect(() => {
    window.document.title = "Sobre o site - Site";
  }, []);

  return loadingPage ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <div className="cc" style={{ flexDirection: "column" }}>
        <h1>Bibliotecas principais</h1>
        <a
          href="https://github.com/eusouoerick/Social"
          target="_blank"
          className="about-link"
        >
          Ver projeto no GitHub
        </a>
        <div className="img-list">
          <img src={firebase} alt="logo do firebase storage" />
          <img className="mdb" src={mongodb} alt="logo do mongodb" />
          <img src={express} alt="logo do express" />
          <img src={rct} alt="logo do reactjs" />
          <img src={router} className="rtr" alt="logo do react router" />
        </div>
      </div>
    </>
  );
};

export default About;
