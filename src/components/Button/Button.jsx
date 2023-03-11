import React from 'react';

import style from "./Button.module.css";

export default function Button ({ onClick }) {

    return (
      <div className={style.buttonContainer}>
        <button type="button" className={style.button} onClick={onClick}>Load more</button>
      </div>
    );
}
