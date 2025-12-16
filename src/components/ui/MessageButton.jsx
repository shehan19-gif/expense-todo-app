import React from 'react';
import { useRef } from 'react';

import styles from "./MessageButton.module.css";

function MessageButton({type, message, func1, func2}) {
  const msgRef = useRef();

  const handleClick = () => {
    msgRef.current.display = "None";
    func1 ? func1("") : null;
    func2 ? func2("") : null;
  };

  return (
    <div className={type == "success" ? styles.successMsg : styles.errorMsg} ref={msgRef}>
        <p>{message}</p>
        <button className={type == "success" ? styles.successMsgCloseBtn : styles.errorMsgCloseBtn} onClick={handleClick}>X</button>
    </div>
  )
};

export default MessageButton;