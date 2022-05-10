import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';
import { Loading } from '../../components'
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.loadFavoritedSongs = this.loadFavoritedSongs.bind(this);
    this.state = { loading: false, favSongs: [] };
  }

  componentDidMount() {
    this.loadFavoritedSongs();
  }

  async handleCheckBox({ target }) {
    const { currSong, updater } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(currSong);
    } else {
      await removeSong(currSong);
      updater();
    }
    this.setState({
      loading: false,
      favSongs: JSON.parse(localStorage.getItem('favorite_songs')),
    });
  }

  loadFavoritedSongs() {
    this.setState({ favSongs: JSON.parse(localStorage.getItem('favorite_songs')) });
  }

  render() {
    const { currSong } = this.props;
    const { trackName, previewUrl, trackId } = currSong;
    const { loading, favSongs } = this.state;
    return (
      <>
        { loading && <Loading className="black-loading-element"/> }
        { !loading && (
          <div key={ trackName } className="music-player">
            <p className="track-name">{ trackName }</p>
            <audio
              key={ trackName }
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              Browser doesn't support audio the element
              <code>audio</code>
              .
            </audio>
            <input
              type="checkbox"
              id="favorite-song"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleCheckBox }
              checked={ favSongs.some((item) => item.trackId === trackId) }
            />
            <label htmlFor="favorite-song">
              ❤
            </label>
            <div className="music-card__pink-line"></div>
          </div>
        )}
      </>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  currSong: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  updater: PropTypes.func,
};

MusicCard.defaultProps = {
  updater: () => {},
};
