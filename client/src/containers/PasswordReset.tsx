import React, { Component, FormEvent, SyntheticEvent } from 'react';
import { Typography, Icon, Form, Input, Button } from 'antd';
import styles from './PasswordReset.module.scss';
import CenterLayout from '../layout/CenterLayout';
import { FormComponentProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import AuthStore, { IAuthStore } from '../store/AuthStore';

const { Title, Text } = Typography;

interface IProps extends FormComponentProps {
  authStore: IAuthStore;
}

@inject('authStore')
@observer
class PasswordReset extends Component<IProps, any> {
  sendPasswordResetMail = (email: string) => {
    console.log(email);
  };

  handleSubmit = (e: SyntheticEvent<FormEvent>) => {
    e.preventDefault();
    const { form } = this.props;
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        this.sendPasswordResetMail(values.email);
      }
    });
  };

  render() {
    const { form, authStore } = this.props;
    const { getFieldDecorator } = form;
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item style={{ marginTop: 24 }}>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '이메일을 입력하세요.' },
                {
                  type: 'email',
                  message: '이메일 형식이 아닙니다.',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="아이디(이메일)"
                size="large"
                autoComplete="email"
                style={{ height: 46 }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('captcha', {
              rules: [
                { required: true, message: '자동입력방지문자를 입력하세요.' },
                {
                  validator: (rule, value, callback) => {
                    if (
                      value &&
                      value.toString().toUpperCase() !== authStore.captcha.code
                    ) {
                      return callback('자동입력방지문자가 일치하지 않습니다.');
                    }
                    return callback();
                  },
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="scan" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="자동입력방지문자"
                size="large"
                autoComplete="email"
                disabled={authStore.captcha.code === ''}
                style={{
                  height: 46,
                  width: 180,
                  marginRight: 10,
                  marginBottom: 4,
                }}
              />,
            )}
            <span
              className={styles.captcha}
              dangerouslySetInnerHTML={{
                __html: authStore.captcha.svg,
              }}
            />
            <Button
              shape="circle"
              icon="reload"
              size="small"
              className={styles.reload}
              loading={!authStore.captcha.code}
              onClick={e => {
                e.preventDefault();
                AuthStore.resetCaptcha();
                AuthStore.fetchCaptcha();
                form.setFieldsValue({ captcha: '' });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ height: 46 }}
              icon="mail"
            >
              비밀번호 재설정 링크 발송
            </Button>
            <div style={{ paddingTop: 8 }}>
              <Link to="/">
                <Icon type="left" /> 돌아가기
              </Link>
            </div>
          </Form.Item>
        </Form>
      </CenterLayout>
    );
  }

  componentDidMount(): void {
    AuthStore.fetchCaptcha();
  }
}

export default Form.create<IProps>({ name: 'password_reset_form' })(
  PasswordReset,
);
