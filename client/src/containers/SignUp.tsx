import React, { Component } from 'react';
import styles from './SignUp.module.scss';
import CenterLayout from '../components/layout/CenterLayout';
import SocialLogin from '../components/SocialLogin';
import SignUpForm, { SignUpFormValue } from '../components/SignUpForm';
import { Divider } from 'antd';
import { inject, observer } from 'mobx-react';
import AuthStore from '../store/AuthStore';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  authStore: typeof AuthStore;
}

@inject('authStore')
@observer
class SignUp extends Component<IProps> {
  handleSubmit = async (values: SignUpFormValue) => {
    const { email, password, nickname } = values;
    const signUpResponse = await AuthStore.signUp({
      email,
      password,
      nickname,
    });

    if (signUpResponse.success) {
      this.props.authStore.storeAccessToken(
        signUpResponse.data.auth.accessToken,
      );
      this.props.history.replace('/signup/success');
    }

    return signUpResponse;
  };

  render() {
    const { authStore } = this.props;
    return (
      <CenterLayout>
        <SocialLogin />
        <Divider className={styles.divider}>또는</Divider>
        <SignUpForm
          onSubmit={this.handleSubmit}
          captcha={authStore.captcha}
          signUpState={authStore.signUpState}
        />
      </CenterLayout>
    );
  }

  componentDidMount(): void {
    AuthStore.fetchCaptcha();
  }
}

export default SignUp;
