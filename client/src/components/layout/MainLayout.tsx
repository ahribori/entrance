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
};

interface IProps {
  accountDetails: IAccountDetails | null;
  pathname: string;
}

const SideMenu = () => (
  <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="user" />
          계정정보 관리
        </span>
      }
    >
      <Menu.Item key="1"><Link to="/">내 계정</Link></Menu.Item>
      <Menu.Item key="2">
        <Link to="/password-change">비밀번호 변경</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="7">
      <span>
        <Icon type="laptop" />
        로그인 이력
      </span>
    </Menu.Item>
    <Menu.Item key="8">
      <span>
        <Icon type="deployment-unit" />
        연결된 서비스 관리
      </span>
    </Menu.Item>
    <Menu.Item key="9">
      <span>
        <Icon type="code" />
        어플리케이션 관리
      </span>
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

  const pageHeaderMeta = pageHeaderMetaMap[pathname] || {};

  return (
    <div className={styles.container}>
      <PageHeader
        onBack={pathname !== '/' ? () => window.history.back() : undefined}
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
          <SideMenu />
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
