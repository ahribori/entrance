import React, { Component } from 'react';
import SuccessPage from '../components/SuccessPage';

class PasswordResetSuccess extends Component {
  render() {
    return (
      <SuccessPage
        title={'비밀번호가 성공적으로 변경되었습니다.'}
        message={'지금 로그인하세요!'}
      />
    );
  }
}

export default PasswordResetSuccess;
