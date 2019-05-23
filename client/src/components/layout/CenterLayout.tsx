import React from 'react';
import styles from './CenterLayout.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
  children: React.ReactChild | React.ReactChild[];
}

const CenterLayout: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <section className={styles.container}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="https://file.namu.moe/file/686b063c5ce6deea1a54949c6dbf1888d65aae627af42cb40c5d881ce4121321"
              alt="로고"
            />
          </Link>
        </div>
        <div className={styles.description}>
          하나의 아이디로 모든 서비스를 이용하세요.
        </div>
        {children}
      </div>
    </section>
  );
};

export default CenterLayout;
