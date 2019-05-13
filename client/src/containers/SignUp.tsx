import React, { Component } from 'react';
import styles from './SignUp.module.scss';
import CenterLayout from '../layout/CenterLayout';
import SocialLogin from '../components/SocialLogin';
import SignUpForm, { SignUpFormValue } from '../components/SignUpForm';
import { Divider } from 'antd';
import { inject, observer } from 'mobx-react';
import AuthStore, { IAuthStore } from '../store/AuthStore';

interface IProps {
  authStore: IAuthStore;
}

@inject('authStore')
@observer
class SignUp extends Component<IProps> {
  handleSubmit = (values: SignUpFormValue) => {
    console.log(values);
  };

  render() {
    const { authStore } = this.props;
    return (
      <CenterLayout>
        <SocialLogin />
        <Divider className={styles.divider}>또는</Divider>
        <SignUpForm onSubmit={this.handleSubmit} captcha={authStore.captcha} />
      </CenterLayout>
    );
  }

  componentDidMount(): void {
    AuthStore.fetchCaptcha();
  }
}

export default SignUp;
