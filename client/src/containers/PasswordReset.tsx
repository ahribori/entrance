import React, { Component } from 'react';
import { Icon, Typography } from 'antd';
import styles from './SendPasswordResetCode.module.scss';
import CenterLayout from '../components/layout/CenterLayout';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import AuthStore, { TokenType } from '../store/AuthStore';
import queryString from 'query-string';
import PasswordResetForm from '../components/PasswordResetForm';
import ErrorPage from '../components/ErrorPage';
import AccountStore from '../store/AccountStore';
import { RouteComponentProps } from 'react-router';

const { Title, Text } = Typography;

interface IProps extends FormComponentProps, RouteComponentProps {
  authStore: typeof AuthStore;
}

interface IState {
  code?: string;
  pending: boolean;
  hasVerifiedCode: boolean;
}

@inject('authStore')
@observer
class SendPasswordResetCode extends Component<IProps, IState> {
  state = {
    ...(queryString.parse(window.location.search) as { code: string }),
    pending: true,
    hasVerifiedCode: false,
  };

  private async verifyCode() {
    const { code } = this.state;
    if (!code) {
      return this.setState({ pending: false });
    }
    const verifyResponse = await AuthStore.verifyToken(code);
    return this.setState({
      pending: false,
      hasVerifiedCode:
        verifyResponse.success &&
        verifyResponse.data.sub === TokenType.PASSWORD_RESET_TOKEN,
    });
  }

  requestPasswordReset = async (password: string) => {
    const { code } = this.state;
    const response = await AccountStore.passwordReset(password, code);
    if (response.success) {
      this.props.history.replace('/password-reset/success');
    }
    console.log(code);
  };

  render() {
    const { pending, hasVerifiedCode } = this.state;

    if (pending) {
      return null;
    }

    if (!hasVerifiedCode) {
      return <ErrorPage title="잘못된 접근입니다." />;
    }

    return (
      <CenterLayout>
        <div className={styles.center}>
          <Title level={4}>
            <Icon type="safety" /> 비밀번호 재설정
          </Title>
          <Text type="secondary">새로운 비밀번호를 입력하세요.</Text>
        </div>
        <PasswordResetForm onSubmit={this.requestPasswordReset} />
      </CenterLayout>
    );
  }

  componentDidMount(): void {
    this.verifyCode();
  }
}

export default SendPasswordResetCode;
