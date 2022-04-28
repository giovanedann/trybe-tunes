import React, { Component } from 'react';
import { Header } from '../../components';

class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h1>Profile Page</h1>
        </div>
      </>
    );
  }
}

export default Profile;
