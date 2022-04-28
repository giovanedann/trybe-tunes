import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, ProfileEdit, NotFound } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>

        <Route
          exact
          path="/"
          render={ (props) => (<Login { ...props } />) }
        />

        <Route
          exact
          path="/search"
          render={ (props) => <Search { ...props } /> }
        />

        <Route
          exact
          path="/album/:id"
          render={ (props) => <Album { ...props } /> }
        />

        <Route
          exact
          path="/favorites"
          render={ (props) => <Favorites { ...props } /> }
        />

        <Route
          exact
          path="/profile"
          render={ (props) => <Profile { ...props } /> }
        />

        <Route
          exact
          path="/profile/edit"
          render={ (props) => (
            <ProfileEdit
              { ...props }
            />) }
        />

        <Route
          render={ (props) => (
            <NotFound
              { ...props }
            />) }
        />

      </Switch>
    );
  }
}

export default App;
