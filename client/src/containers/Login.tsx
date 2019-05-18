import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import styles from './Login.module.scss';
import { Divider } from 'antd';
import LoginForm, { LoginFormValue } from '../components/LoginForm';
import SocialLogin from '../components/SocialLogin';
import CenterLayout from '../components/layout/CenterLayout';
import AuthStore from '../store/AuthStore';

@inject('authStore')
@observer
class Login extends Component<any, any> {
  state = {
    ...queryString.parse(window.location.search),
  };

  handleSubmit = async (values: LoginFormValue) => {
    const loginResponse = await AuthStore.login(values);
    if (loginResponse.success) {
      this.props.history.replace('/');
    }
  };

  render() {
    const { authStore } = this.props;
    return (
      <CenterLayout>
        <SocialLogin />
        <Divider className={styles.divider}>또는</Divider>
        <LoginForm
          onSubmit={this.handleSubmit}
          loginState={authStore.loginState}
        />
      </CenterLayout>
    );
  }
}

export default Login;
