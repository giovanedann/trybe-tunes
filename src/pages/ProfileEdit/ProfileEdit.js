import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Loading } from '../../components';
import { getUser, updateUser } from '../../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.loadUserInfo = this.loadUserInfo.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.areTextInputValid = this.areTextInputValid.bind(this);
    this.isMailInputValid = this.isMailInputValid.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      saved: false,
    };
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  areTextInputValid() {
    const { name, image, description } = this.state;
    const minInputsLength = 1;
    return [name, image, description].every((item) => item.length > minInputsLength);
  }

  isMailInputValid() {
    const { email } = this.state;
    const validation = email.toString().toLowerCase().match(/\S+@\S+\.\S+/);
    if (validation) {
      return validation[0] === email;
    }
  }

  isFormInvalid() {
    return !(this.isMailInputValid() && this.areTextInputValid());
  }

  async saveUserInfo() {
    this.setState({ loading: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({ loading: false, saved: true });
    });
  }

  async loadUserInfo() {
    this.setState({ loading: true }, async () => {
      const savedUserInfo = await getUser();
      const { name, email, image, description } = savedUserInfo;
      this.setState({ name, email, image, description, loading: false });
    });
  }

  render() {
    const { loading, name, email, image, description, saved } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" className="profile-edit-container">
          { saved && <Redirect to="/profile" />}
          { loading && <Loading className="black-loading-element" />}
          { !loading && (
            <div className="edit-container">
              <form>
                <div className="profile-photo-container">
                  <img
                    src={
                      !image.length
                        ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUf9QPA3pe7BY91OIKO_4xqJfLRsPWJyHDRQ&usqp=CAU'
                        : image
                    }
                    alt="profile"
                  />
                  <input
                    type="text"
                    name="image"
                    defaultValue={ image }
                    id="profile-picture"
                    data-testid="edit-input-image"
                    placeholder="Insert your profile image link"
                    onChange={ this.handleInputChange }
                  />
                </div>
                <label htmlFor="name-edit-input">
                  Name
                  <input
                    defaultValue={ name }
                    name="name"
                    type="text"
                    id="name-edit-input"
                    placeholder="Your name"
                    data-testid="edit-input-name"
                    onChange={ this.handleInputChange }
                  />
                </label>
                <label htmlFor="mail-edit-input">
                  E-mail
                  <input
                    defaultValue={ email }
                    name="email"
                    type="text"
                    id="mail-edit-input"
                    placeholder="Your e-mail"
                    data-testid="edit-input-email"
                    onChange={ this.handleInputChange }
                  />
                </label>
                <label htmlFor="description-edit-input">
                  Description
                  <textarea
                    id="description-edit-input"
                    name="description"
                    placeholder="Description"
                    data-testid="edit-input-description"
                    rows={ 5 }
                    cols={ 30 }
                    defaultValue={ description }
                    onChange={ this.handleInputChange }
                  />
                </label>
                <div className="button-container">
                  <button
                    type="button"
                    data-testid="edit-button-save"
                    disabled={ this.isFormInvalid() }
                    onClick={ this.saveUserInfo }
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>) }
        </div>
      </>
    );
  }
}

export default ProfileEdit;
