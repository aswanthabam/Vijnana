import React from 'react';
import style from './Error404.module.css';

interface Error404Props {

}

const Error404 : React.FC<Error404Props> = ({}) => {
  return <div className={style.error}>
    You are lost on the realm! : 404
  </div>
}

export default Error404;