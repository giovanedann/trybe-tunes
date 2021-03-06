import React, { Component } from 'react';
import { SiApplemusic } from 'react-icons/si';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import { Loading } from '../../components';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      user: '',
      logged: false,
      loading: false,
    };
  }

  async handleButtonClick() {
    this.setState({ loading: true }, async () => {
      const { user } = this.state;
      await createUser({ name: user });
      this.setState({ logged: true, loading: false });
    });
  }

  handleInputChange({ target: { value } }) {
    this.setState({ user: value });
  }

  render() {
    const { user, logged, loading } = this.state;
    const minLength = 3;

    return (
      <div data-testid="page-login" className="login-form-container">
        {!logged && !loading
        && (
          <form className="login-form">
            <div className="icons-container">
              <SiApplemusic color="#E0398D" className="login-music-icon" />
            </div>
            <p className="form-title">my<span>tunes</span></p>
            <input
              placeholder="Enter your username or e-mail"
              type="text"
              name="textInput"
              data-testid="login-name-input"
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ user.length < minLength }
              onClick={ this.handleButtonClick }
            >
              Entrar
            </button>
          </form>
        )}
        { loading && <Loading />}
        { logged && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
