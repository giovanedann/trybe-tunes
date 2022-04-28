import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { isFav } = this.props;
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.state = { loading: false, favorited: isFav };
  }

  async handleCheckBox({ target: { checked } }) {
    const { currSong } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(currSong);
    } else {
      await removeSong(currSong);
    }
    this.setState({ loading: false, favorited: checked });
  }

  render() {
    const { currSong } = this.props;
    const { trackName, previewUrl, trackId } = currSong;
    const { loading, favorited } = this.state;
    return (
      <>
        { loading && <h2>Carregando...</h2> }
        { !loading && (
          <div key={ trackName } className="music-player">
            <p>{ trackName }</p>
            <audio
              key={ trackName }
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite-song">
              Favorita
              <input
                type="checkbox"
                name="favorite-song"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleCheckBox }
                checked={ favorited }
              />
            </label>
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
  isFav: PropTypes.bool.isRequired,
};
