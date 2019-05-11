import React, { Component } from 'react';
import queryString from 'query-string';
import styles from './Login.module.scss';
import { Divider } from 'antd';
import LoginForm, { LoginFormValue } from '../components/LoginForm';
import SocialLogin from '../components/SocialLogin';

class Login extends Component<any, any> {
  state = {
    ...queryString.parse(window.location.search),
  };

  handleSubmit = (values: LoginFormValue) => {
    console.log(values);
  };

  render() {
    return (
      <section className={styles.login_section}>
        <div className={styles.login_body}>
          <div className={styles.login_logo}>
            <a href="#none">
              <img
                src="https://file.namu.moe/file/686b063c5ce6deea1a54949c6dbf1888d65aae627af42cb40c5d881ce4121321"
                alt="로고"
              />
            </a>
          </div>
          <div className={styles.login_copy_text}>
            하나의 아이디로 모든 서비스를 이용하세요.
          </div>
          <SocialLogin />
          <Divider className={styles.login_divider}>또는</Divider>
          <LoginForm onSubmit={this.handleSubmit} />
        </div>
      </section>
    );
  }
}

export default Login;
