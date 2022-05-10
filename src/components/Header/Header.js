import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';

import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.updateUserState = this.updateUserState.bind(this);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.updateUserState();
  }

  updateUserState() {
    this.setState({ user: {} }, async () => {
      const user = await getUser();
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    const { name } = user;

    return (
      <>
        <div className="header-container" data-testid="header-component">
          <div className="left-side">
            <BsMusicNoteBeamed color="black" size={ 24 } className="search-music-icon"/>
            <h1>trybe<span>tunes</span></h1>
          </div>
          {!name ? <Loading className="black-loading-element"/> : <p className="user-name" data-testid="header-user-name">{name}</p>}
        </div>
        <div className="header__black-line"></div>
        <nav className="navigation-links">
          <Link to="/search" className="link" data-testid="link-to-search">
            <div>Search</div>
          </Link>
          <Link
            to="/favorites"
            className="link"
            data-testid="link-to-favorites"
          >
            <div>Favorites</div>
          </Link>
          <Link to="/profile" className="link" data-testid="link-to-profile">
            <div>Profile</div>
          </Link>
        </nav>
        <div className="header__black-line"></div>
      </>
    );
  }
}

export default Header;
