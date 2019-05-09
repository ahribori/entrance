import React, { Component } from 'react';
import * as queryString from 'query-string';
import styles from '../styles/index.module.scss';

class Login extends Component<any, any> {
  state = {
    ...queryString.parse(window.location.search),
  };

  render() {
    return (<div className={styles.login_container}>
      <div className={styles.login_body}>

      </div>
    </div>);
  }

  componentDidMount(): void {
    console.log(this.state);
  }
}

export default Login;
