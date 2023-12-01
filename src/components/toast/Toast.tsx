import style from "./Toast.module.css";
import { _Event } from "../../types";
import { useEffect, useState } from "react";
import { useToast } from "./useToast";
interface ToastProps {}

const Toast: React.FC<ToastProps> = () => {
  const { status, message, hideAfter, setToastStatus } = useToast();
  useEffect(() => {
    if (hideAfter) {
      setTimeout(() => {
        setToastStatus(false, null, null);
      }, hideAfter);
    }
  }, [status, hideAfter, message]);
  return (
    <div className={style.toast + " " + (status && style.show)}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
