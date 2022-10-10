import React, { useContext } from "react";
import { MenuContext } from "../../App";

import "./errorMsg.css";

const ErrorMsg = () => {
  const { isError, setIsError, errorMsg } = useContext(MenuContext);

  const closeNoficationHandler = () => {
    setIsError(false);
  };

  return (
    <div className={`error-msg ${isError && "error-msg__show"}`}>
      <span>{`Error message: ${errorMsg.current}`}</span>
      <div className="error-msg__close" onClick={closeNoficationHandler}>
        x
      </div>
    </div>
  );
};

export default ErrorMsg;
