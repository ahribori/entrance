import React, { Component } from 'react';
import { Icon, Typography } from 'antd';
import styles from './SendPasswordResetCode.module.scss';
import CenterLayout from '../components/layout/CenterLayout';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import AuthStore from '../store/AuthStore';
import PasswordResetMailForm from '../components/PasswordResetMailForm';
import { RouteComponentProps } from 'react-router';

const { Title, Text } = Typography;

interface IProps extends FormComponentProps, RouteComponentProps {
  authStore: typeof AuthStore;
}

interface IState {}

@inject('authStore')
@observer
class SendPasswordResetCode extends Component<IProps, IState> {
  state = {};

  sendPasswordResetMail = async (email: string) => {
    const response = await AuthStore.sendPasswordResetMail(email);
    if (response.success) {
      this.props.history.replace('/send-password-reset-code/success');
    }
    return response;
  };

  render() {
    const { authStore } = this.props;
    return (
      <CenterLayout>
        <div className={styles.center}>
          <Title level={4}>
            <Icon type="safety" /> 비밀번호 재설정
          </Title>
          <Text type="secondary">
            가입한 계정 이메일로 비밀번호 재설정 링크가 <br />
            발송됩니다.
          </Text>
        </div>
        <PasswordResetMailForm
          captcha={authStore.captcha}
          onSubmit={this.sendPasswordResetMail}
        />
      </CenterLayout>
    );
  }

  componentDidMount(): void {
    AuthStore.fetchCaptcha();
  }
}

export default SendPasswordResetCode;
