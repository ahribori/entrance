import React, { Component } from 'react';
import withAuth from '../components/hoc/WithAuth';
import { Button } from 'antd';
import AuthStore from '../store/AuthStore';
import { inject, observer } from 'mobx-react';
import AccountStore from '../store/AccountStore';
import MainLayout from '../components/layout/MainLayout';

interface IProps {
  authStore: typeof AuthStore;
  accountStore: typeof AccountStore;
}

@withAuth
@inject('authStore', 'accountStore')
@observer
class Index extends Component<IProps, any> {
  render() {
    return (
      <MainLayout>
        <Button
          onClick={() => {
            AuthStore.logout();
          }}
        >
          로그아웃
        </Button>
      </MainLayout>
    );
  }
}

export default Index;
