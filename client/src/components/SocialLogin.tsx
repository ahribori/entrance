import React from 'react';
import styles from './SocialLogin.module.scss';
import { Row, Col, Typography } from 'antd';
import naverLogo from '../assets/naver_logo.png';
import kakaoLogo from '../assets/kakao_logo.png';
import facebookLogo from '../assets/facebook_logo.png';
import googleLogo from '../assets/google_logo.png';

const { Text } = Typography;

interface IProps {}

const SocialLogin: React.FunctionComponent<IProps> = () => {
  return (
    <div className={styles.center}>
      <Text type={'secondary'}>다른 서비스로 시작하기</Text>
      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={5}>
          <a href="">
            <img src={naverLogo} alt="" className={styles.logo} />
          </a>
        </Col>
        <Col span={5}>
          <a href="">
            <img src={kakaoLogo} alt="" className={styles.logo} />
          </a>
        </Col>
        <Col span={5}>
          <a href="">
            <img src={facebookLogo} alt="" className={styles.logo} />
          </a>
        </Col>
        <Col span={5}>
          <a href="">
            <img src={googleLogo} alt="" className={styles.logo} />
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default SocialLogin;
