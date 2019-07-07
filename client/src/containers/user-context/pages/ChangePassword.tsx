import React, { Component, FormEvent, SyntheticEvent } from 'react';
import styles from './ChangePassword.module.scss';
import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface IProps extends FormComponentProps {}

class ChangePassword extends Component<IProps, any> {
  handleSubmit = (e: SyntheticEvent<FormEvent>) => {
    e.preventDefault();
    const { form } = this.props;
    const { validateFields, setFields } = form;
    validateFields(async (err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <div className={styles.container}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item style={{ marginTop: 24 }}>
              {getFieldDecorator('current-password', {
                rules: [
                  { required: true, message: '기존 비밀번호를 입력하세요.' },
                  { min: 6, message: '비밀번호는 6-30자 사이로 입력하세요.' },
                  { max: 30, message: '비밀번호는 6-30자 사이로 입력하세요.' },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="기존 비밀번호"
                  size="large"
                  autoComplete="password"
                />,
              )}
            </Form.Item>
            <Form.Item >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '새로운 비밀번호를 입력하세요.' },
                  { min: 6, message: '비밀번호는 6-30자 사이로 입력하세요.' },
                  { max: 30, message: '비밀번호는 6-30자 사이로 입력하세요.' },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="새로운 비밀번호 (영문, 숫자, 특수문자 6-30자)"
                  size="large"
                  autoComplete="password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password-confirm', {
                rules: [
                  {
                    required: true,
                    message: '새로운 비밀번호를 다시 입력하세요.',
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (value && value !== form.getFieldValue('password')) {
                        return callback('비밀번호가 일치하지 않습니다.');
                      }
                      callback();
                    },
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="새로운 비밀번호 확인"
                  size="large"
                  autoComplete="password-check"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                icon="safety"
              >
                비밀번호 재설정
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create<IProps>({ name: 'password_reset_form' })(
  ChangePassword,
);
