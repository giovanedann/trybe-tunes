import React, { Component } from 'react';
import { Header } from '../../components';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Profile Edit Page</h1>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
