import React, { Component } from 'react';
import { Button } from 'antd';
import AuthStore from '../../../store/AuthStore';

class Index extends Component {
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
