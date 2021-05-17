import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { hideModal2 } from "../../store/modal2";

import "./modal2.css";

function Modal2() {
  const dispatch = useDispatch();
  const mount = useSelector((state) => state.modal2.mount2);
  const display = useSelector((state) => state.modal2.display2);
  // Any react component can be passed onto this
  const Current = useSelector((state) => state.modal2.current2);

  const onClose = () => {
    dispatch(hideModal2());
  };

  return (
    mount &&
    display &&
    ReactDOM.createPortal(
      <div onClick={onClose} className="modal2-background">
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal2-content"
          id="modal2-content"
        >
          <Current />
        </div>
      </div>,
      mount
    )
  );
}

export default Modal2;
