import React, { FormEvent, SyntheticEvent } from 'react';
import { Alert, Button, Checkbox, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import { RequestState } from '../store/StoreHelper';

export interface LoginFormValue {
  email: string;
  password: string;
}

interface IProps extends FormComponentProps {
  onSubmit: (values: LoginFormValue) => {};
  loginState: RequestState;
}

const LoginForm: React.FunctionComponent<IProps> = ({
  form,
  onSubmit,
  loginState,
}) => {
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = (e: SyntheticEvent<FormEvent>) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
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
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="아이디(이메일)"
            size="large"
            autoComplete="email"
            disabled={loginState.pending}
            style={{ height: 46 }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: '비밀번호를 입력하세요.' },
            { min: 6, message: '비밀번호는 6-30자 사이로 입력하세요.' },
            { max: 30, message: '비밀번호는 6-30자 사이로 입력하세요.' },
          ],
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="비밀번호"
            size="large"
            autoComplete="password"
            disabled={loginState.pending}
            style={{ height: 46 }}
          />,
        )}
      </Form.Item>
      {loginState.error && (
        <Alert
          message={'계정 혹은 비밀번호가 일치하지 않습니다.'}
          type={'error'}
          closable
          style={{ marginBottom: 12 }}
        />
      )}
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: false,
        })(<Checkbox disabled={loginState.pending}>아이디 저장</Checkbox>)}
        <Link to="/send-password-reset-code" className={styles.right}>
          비밀번호 재설정
        </Link>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.login_button}
          size="large"
          block
          style={{ height: 46 }}
          icon="unlock"
          loading={loginState.pending}
        >
          로그인
        </Button>
        <div className={styles.sign_up_message}>
          계정이 없으신가요? <Link to="/signup">계정 만들기</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Form.create<IProps>({ name: 'login_form' })(LoginForm);
