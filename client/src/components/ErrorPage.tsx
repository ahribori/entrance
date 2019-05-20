import React from 'react';
import { Typography, Icon } from 'antd';
import CenterLayout from './layout/CenterLayout';

const { Title, Text } = Typography;

interface IProps {
  title: string;
  message?: string;
}

const ErrorPage: React.FunctionComponent<IProps> = ({ title, message }) => {
  return (
    <CenterLayout>
      <div style={{ textAlign: 'center' }}>
        <Title level={2}>
          <Icon type="warning" /> {title}
        </Title>
        {message && <Text>{message}</Text>}
      </div>
    </CenterLayout>
  );
};

export default ErrorPage;
