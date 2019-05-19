import React, { Component } from 'react';
import { Icon, Typography } from 'antd';
import styles from './PasswordReset.module.scss';
import CenterLayout from '../components/layout/CenterLayout';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import AuthStore from '../store/AuthStore';
import queryString from 'query-string';
import PasswordResetForm from '../components/PasswordResetForm';
import PasswordResetMailForm from '../components/PasswordResetMailForm';

const { Title, Text } = Typography;

interface IProps extends FormComponentProps {
  authStore: typeof AuthStore;
}

interface IState {
  code?: string;
}

@inject('authStore')
@observer
class PasswordReset extends Component<IProps, IState> {
  state = {
    ...queryString.parse(window.location.search),
  };

  sendPasswordResetMail = async (email: string) => {
    const response = await AuthStore.sendPasswordResetMail(email);
    if (response.success) {
    }
    return response;
  };

  requestPasswordReset = async (password: string) => {
    const { code } = this.state;
  };

  render() {
    const { authStore } = this.props;
    const { code } = this.state;
    return (
      <CenterLayout>
        <div className={styles.center}>
          <Title level={4}>
            <Icon type="safety" /> 비밀번호 재설정
          </Title>
          {code ? (
            <Text type="secondary">새로운 비밀번호를 입력하세요.</Text>
          ) : (
            <Text type="secondary">
              가입한 계정 이메일로 비밀번호 재설정 링크가 <br />
              발송됩니다.
            </Text>
          )}
        </div>
        {code ? (
          <PasswordResetForm onSubmit={this.requestPasswordReset} />
        ) : (
          <PasswordResetMailForm
            captcha={authStore.captcha}
            onSubmit={this.sendPasswordResetMail}
          />
        )}
      </CenterLayout>
    );
  }

  componentDidMount(): void {
    AuthStore.fetchCaptcha();
  }
}

export default PasswordReset;
