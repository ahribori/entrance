import React, { Component } from 'react';
import withAuth from '../components/hoc/WithAuth';
import { Button } from 'antd';
import AuthStore from '../store/AuthStore';
import { inject, observer } from 'mobx-react';
import AccountStore from '../store/AccountStore';

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
      <div>
        <Button
          onClick={() => {
            AuthStore.logout();
          }}
        >
          로그아웃
        </Button>
      </div>
    );
  }
}

export default Index;
