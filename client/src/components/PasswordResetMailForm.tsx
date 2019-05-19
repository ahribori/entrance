import React, { FormEvent, SyntheticEvent } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import styles from './PasswordResetMailForm.module.scss';
import { FormComponentProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';
import AuthStore from '../store/AuthStore';
import { NormalizedResponse } from '../store/StoreHelper';

interface IProps extends FormComponentProps {
  captcha: { svg: string; code: string };
  onSubmit: (email: string) => Promise<NormalizedResponse>;
}

const PasswordResetMailForm: React.FunctionComponent<IProps> = ({
  form,
  captcha,
  onSubmit,
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: SyntheticEvent<FormEvent>) => {
    e.preventDefault();
    const { validateFields, setFields } = form;
    validateFields(async (err, values) => {
      if (!err) {
        const response = await onSubmit(values.email);
        if (!response.success && response.status === 404) {
          setFields({
            email: {
              value: values.email,
              errors: [new Error('가입된 계정이 아닙니다.')],
            },
          });
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                if (value && value.toString().toUpperCase() !== captcha.code) {
                  return callback('자동입력방지문자가 일치하지 않습니다.');
                }
                return callback();
              },
            },
          ],
        })(
          <Input
            prefix={<Icon type="scan" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="자동입력방지문자"
            size="large"
            autoComplete="email"
            disabled={captcha.code === ''}
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
            __html: captcha.svg,
          }}
        />
        <Button
          shape="circle"
          icon="reload"
          size="small"
          className={styles.reload}
          loading={!captcha.code}
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
          <Link to="/login">
            <Icon type="left" /> 돌아가기
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Form.create<IProps>({ name: 'password_reset_mail_form' })(
  PasswordResetMailForm,
);
