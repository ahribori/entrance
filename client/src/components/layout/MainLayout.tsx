import React from 'react';
import styles from './MainLayout.module.scss';
import { Avatar, Card, Icon, Layout, Menu, PageHeader } from 'antd';
import { IAccountDetails } from '../../store/AccountStore';
import Meta from 'antd/es/card/Meta';
import AuthStore from '../../store/AuthStore';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface IProps {
  accountDetails: IAccountDetails | null;
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
      <Menu.Item key="1">내 계정</Menu.Item>
      <Menu.Item key="2">비밀번호 변경</Menu.Item>
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
}) => {
  if (!accountDetails) {
    return null;
  }

  return (
    <div className={styles.container}>
      <PageHeader
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
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
