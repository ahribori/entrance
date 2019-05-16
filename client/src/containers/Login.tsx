import React, { Component } from 'react';
import queryString from 'query-string';
import styles from './Login.module.scss';
import { Divider } from 'antd';
import LoginForm, { LoginFormValue } from '../components/LoginForm';
import SocialLogin from '../components/SocialLogin';
import CenterLayout from '../components/layout/CenterLayout';

class Login extends Component<any, any> {
  state = {
    ...queryString.parse(window.location.search),
  };

  handleSubmit = (values: LoginFormValue) => {
    console.log(values);
  };

  render() {
    return (
      <CenterLayout>
        <SocialLogin />
        <Divider className={styles.divider}>또는</Divider>
        <LoginForm onSubmit={this.handleSubmit} />
      </CenterLayout>
    );
  }
}

export default Login;
