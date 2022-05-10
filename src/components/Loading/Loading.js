import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    const { className } = this.props;
    return (
      <p className={ className || "loading-element" }>Carregando...</p>
    );
  }
}

export default Loading;
