import React, { Component } from 'react';
import { Header, Loading, MusicCard } from '../../components';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.updateFavoritedSongs = this.updateFavoritedSongs.bind(this);
    this.state = {
      loading: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.updateFavoritedSongs();
  }

  async updateFavoritedSongs() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ favSongs, loading: false });
  }

  render() {
    const { favSongs, loading } = this.state;
    return (
      <>
        <Header />
        { loading && <Loading className="black-loading-element" />}
        { !loading
        && (
          <div data-testid="page-favorites" className="favorites-page-container">
            <h2>Músicas favoritas</h2>
            <div className="fav-songs-container">
              { favSongs.map((song) => {
                const { trackName } = song;
                return (
                  <MusicCard
                    key={ trackName }
                    currSong={ { ...song } }
                    isFav={ favSongs.some((item) => item.trackName === trackName) }
                    updater={ this.updateFavoritedSongs }
                  />
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Favorites;
