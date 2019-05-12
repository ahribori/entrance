import React, { FormEvent, SyntheticEvent } from 'react';
import styles from './SignUpForm.module.scss';
import { Link } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Checkbox, Form, Icon, Input } from 'antd';

export interface SignUpFormValue {
  email: string;
  password: string;
}

interface IProps extends FormComponentProps {
  onSubmit: (values: SignUpFormValue) => void;
}

const SignUpForm: React.FunctionComponent<IProps> = ({ form, onSubmit }) => {
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
            placeholder="비밀번호 (영문, 숫자, 특수문자 6-30자)"
            size="large"
            autoComplete="password"
            style={{ height: 46 }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password-confirm', {
          rules: [
            { required: true, message: '비밀번호를 다시 입력하세요.' },
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
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="비밀번호 확인"
            size="large"
            autoComplete="password-check"
            style={{ height: 46 }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('nickname', {
          rules: [
            {
              pattern: /^[a-zA-Z가-힣]{2,10}$/gi,
              message: '공백없이 한글,영문 2-16자만 가능합니다.',
            },
            { required: true, message: '닉네임을 입력하세요.' },
          ],
        })(
          <Input
            prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="text"
            placeholder="닉네임 (2-16자)"
            size="large"
            autoComplete="nickname"
            style={{ height: 46 }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('service-policy', {
          valuePropName: 'checked',
          initialValue: false,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback('서비스 약관에 동의해야 합니다.');
                }
                callback();
              },
            },
          ],
        })(
          <Checkbox>
            <a href="#none">서비스 약관</a>에 동의합니다.
          </Checkbox>,
        )}
        <Button
          type="primary"
          htmlType="submit"
          className={styles.sign_up_button}
          size="large"
          block
          style={{ height: 46 }}
          icon="form"
        >
          계정 만들기
        </Button>
        <div className={styles.sign_up_message}>
          이미 계정이 있으신가요? <Link to="/">로그인</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Form.create<IProps>({ name: 'sign_up_form' })(SignUpForm);
