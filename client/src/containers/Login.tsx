import React, { Component } from 'react';
import * as queryString from 'query-string';

class Login extends Component<any, any> {
  state = {
    ...queryString.parse(window.location.search),
  };

  render() {
    return <div>로그인</div>;
  }

  componentDidMount(): void {
    console.log(this.state);
  }
}

export default Login;
