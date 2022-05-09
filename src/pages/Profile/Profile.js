import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading } from '../../components';
import { getUser } from '../../services/userAPI';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.getUserInfo = this.getUserInfo.bind(this);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.setState({ loading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description, loading: false });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="profile">
          { loading && <Loading className="black-loading-element" />}
          { !loading && (
            <div className="profile-container">
              <div className="profile-header">
                <img
                  src={ !image.length
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUf9QPA3pe7BY91OIKO_4xqJfLRsPWJyHDRQ&usqp=CAU'
                    : image }
                  alt="generic"
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">
                  <button type="button">Editar perfil</button>
                </Link>
              </div>
              <div className="profile-info">
                <div className="name-info">
                  <p className="info">Name:</p>
                  <p>{ name }</p>
                </div>
                <div className="mail-info">
                  <p className="info">E-mail:</p>
                  <p>{ email }</p>
                </div>
                <div className="description-info">
                  <p className="info">Description:</p>
                  <p>{ description }</p>
                </div>
              </div>
            </div>)}
        </div>
      </>
    );
  }
}

export default Profile;
