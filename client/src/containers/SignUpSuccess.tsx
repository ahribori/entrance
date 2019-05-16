import React, { Component } from 'react';
import { Typography, } from 'antd';
import CenterLayout from '../components/layout/CenterLayout';
import styles from './SignUpSuccess.module.scss';
import withAuth from '../components/hoc/WithAuth';

const { Title, Text } = Typography;

@withAuth
class SignUpSuccess extends Component {
  render() {
    return (
      <CenterLayout>
        회원가입을 축하해요.
      </CenterLayout>
    );
  }
}

export default SignUpSuccess;
