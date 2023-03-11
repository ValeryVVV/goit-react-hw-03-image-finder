import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

import style from "./Loader.module.css";

export default function Loader () {

    return (
      <div className={style.container}>
        <InfinitySpin width='500' color="#4fa94d"/>
      </div>
    );
}

