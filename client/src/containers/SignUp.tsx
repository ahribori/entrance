import React, { Component } from 'react';
import styles from './SignUp.module.scss';
import CenterLayout from '../layout/CenterLayout';
import SocialLogin from '../components/SocialLogin';
import SignUpForm, { SignUpFormValue } from '../components/SignUpForm';
import { Divider } from 'antd';

class SignUp extends Component {
  handleSubmit = (values: SignUpFormValue) => {
    console.log(values);
  };

  render() {
    return (
      <CenterLayout>
        <SocialLogin />
        <Divider className={styles.divider}>또는</Divider>
        <SignUpForm onSubmit={this.handleSubmit} />
      </CenterLayout>
    );
  }
}

export default SignUp;
