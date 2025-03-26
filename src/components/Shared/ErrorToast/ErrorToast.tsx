import { useEffect, useState } from 'react';
import styles from './ErrorToast.module.scss';

export const ErrorToast = ({
  errorMessage,
  onClose,
}: Readonly<{ errorMessage: string; onClose: () => void }>) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); 

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.ErrorToast} ${visible ? styles.show : ''}`}>
      {errorMessage}
    </div>
  );
};
