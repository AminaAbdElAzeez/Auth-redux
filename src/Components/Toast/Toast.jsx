import React, { useEffect } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return message ? (
    <div className={styles.toast}>
      <p>{message}</p>
    </div>
  ) : null;
};

export default Toast;