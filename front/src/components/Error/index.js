import React from "react";
import { BiMessageAltError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronUp } from "react-icons/fi";
import "./error.css";

const Error = ({ content, width, post, setFc }) => {
  return post ? (
    <>
      <div
        className="error-field"
        onMouseEnter={() => setFc(true)}
        onMouseLeave={() => setFc(false)}
        style={width ? { width: width } : undefined}
      >
        <div className="content">
          <BiMessageAltError style={{ fontSize: 34, fontWeight: 400 }} />
          <p>
            <span className="focus">
              <FiChevronUp />
            </span>{" "}
            Faça a sua primeira postagem! Clique na barra acima.{" "}
            <span className="focus">
              <FiChevronUp />
            </span>
          </p>
        </div>
      </div>
      <div className="error-field" style={width ? { width: width } : undefined}>
        <div className="content">
          <BiMessageAltError style={{ fontSize: 34, fontWeight: 400 }} />
          <p>
            Acesse a página{" "}
            <Link to="/users" className="focus link">
              users {<FiSearch />}
            </Link>{" "}
            para encontrar outros usuários. <span className="focus">:)</span>
          </p>
        </div>
      </div>
    </>
  ) : (
    <div className="error-field" style={width ? { width: width } : undefined}>
      <div className="content">
        <BiMessageAltError style={{ fontSize: 34, fontWeight: 400 }} />
        <p>{content || "Esta página está vázia..."}</p>
      </div>
    </div>
  );
};

export default Error;
