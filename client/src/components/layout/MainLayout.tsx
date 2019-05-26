import React from 'react';
import styles from './MainLayout.module.scss';
import { Avatar, Card, Icon, Layout, Menu, PageHeader } from 'antd';
import { IAccountDetails } from '../../store/AccountStore';
import Meta from 'antd/es/card/Meta';
import AuthStore from '../../store/AuthStore';
import { Link } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const pageHeaderMetaMap: any = {
  '/': { title: '내 계정', subTitle: '내 계정을 관리하고 수정합니다.' },
  '/password-change': {
    title: '비밀번호 변경',
    subTitle: '비밀번호를 변경합니다.',
  },
  '/login-history': {
    title: '로그인 이력',
    subTitle: '로그인 이력과 접속정보를 관리합니다.',
  },
  '/service-management': {
    title: '연결된 서비스 관리',
    subTitle: '연결된 서비스를 확인하고 연결을 해제할 수 있습니다.',
  },
  '/application-management': {
    title: '어플리케이션 관리',
    subTitle: '계정을 사용할 어플리케이션을 관리합니다. (개발자 전용)',
  },
};

interface IProps {
  accountDetails: IAccountDetails | null;
  pathname: string;
}

const SideMenu: React.FunctionComponent<IProps> = ({ pathname }) => (
  <Menu mode="inline" selectedKeys={[pathname]} defaultOpenKeys={['sub1']}>
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="user" />
          계정정보 관리
        </span>
      }
    >
      <Menu.Item key="/">
        <Link to="/">내 계정</Link>
      </Menu.Item>
      <Menu.Item key="/password-change">
        <Link to="/password-change">비밀번호 변경</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="/login-history">
      <Link to="/login-history">
        <Icon type="laptop" />
        로그인 이력
      </Link>
    </Menu.Item>
    <Menu.Item key="/service-management">
      <Link to="/service-management">
        <Icon type="deployment-unit" />
        연결된 서비스 관리
      </Link>
    </Menu.Item>
    <Menu.Item key="/application-management">
      <Link to="/application-management">
        <Icon type="code" />
        어플리케이션 관리
      </Link>
    </Menu.Item>
  </Menu>
);

const MainLayout: React.FunctionComponent<IProps> = ({
  children,
  accountDetails,
  pathname,
}) => {
  if (!accountDetails) {
    return null;
  }

  const handleBack = () => {
    window.history.back();
  };

  const pageHeaderMeta = pageHeaderMetaMap[pathname] || {};

  return (
    <div className={styles.container}>
      <PageHeader
        onBack={handleBack}
        title={pageHeaderMeta.title}
        subTitle={pageHeaderMeta.subTitle}
      />
      <Layout style={{ background: '#fff', borderTop: '1px solid #E8E8E8' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={250}
          style={{ background: '#fff' }}
        >
          <Card
            style={{ borderLeft: 'none', borderTop: 'none' }}
            actions={[
              <Icon type="setting" />,
              <Icon
                type="logout"
                onClick={() => {
                  AuthStore.logout();
                }}
              />,
            ]}
          >
            <Meta
              avatar={
                <Avatar icon="user" src={accountDetails.thumbnailImage} />
              }
              title={accountDetails.nickname}
              description={accountDetails.email}
            />
          </Card>
          <SideMenu pathname={pathname} accountDetails={accountDetails} />
        </Sider>
        <Content style={{ padding: '24px', minHeight: 700 }}>
          {children}
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: 'center',
          borderTop: '1px solid #f9f9f9',
          backgroundColor: '#f9f9f9',
        }}
      >
        Entrance ©2019 Created by Daniel.hs
      </Footer>
    </div>
  );
};

export default MainLayout;
