import React, { Component } from 'react';
import { Header } from '../../components';

class Favorites extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <p>Favorites Page</p>
        </div>
      </>
    );
  }
}

export default Favorites;
