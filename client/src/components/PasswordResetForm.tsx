import React, { FormEvent, SyntheticEvent } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface IProps extends FormComponentProps {
  onSubmit: (password: string) => void;
}

const PasswordResetForm: React.FunctionComponent<IProps> = ({
  form,
  onSubmit,
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: SyntheticEvent<FormEvent>) => {
    e.preventDefault();
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values.password);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item style={{ marginTop: 24 }}>
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
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          style={{ height: 46 }}
          icon="safety"
        >
          비밀번호 재설정
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<IProps>({ name: 'password_reset_form' })(
  PasswordResetForm,
);
