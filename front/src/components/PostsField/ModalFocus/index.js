import React from "react";
import "./modalFocus.css";

// Deixa o fundo desfocado.
const ModalFocus = ({ children, event }) => {
  return (
    <div className="modal-focus" onClick={event}>
      {children}
    </div>
  );
};

export default ModalFocus;
