import React, { Component } from 'react';
import withAuth from '../components/hoc/WithAuth';

@withAuth
class Index extends Component {
  render() {
    return <div>Index</div>;
  }
}

export default Index;
