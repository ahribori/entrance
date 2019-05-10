import React from 'react';
import routes from './routes';
import styles from './App.module.scss';

const App: React.FC = () => {
  return <div className={styles.App}>{routes}</div>;
};

export default App;
