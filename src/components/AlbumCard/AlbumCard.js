import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { albumImage, albumName, artistName, collectionId } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="album-link"
      >
        <div className="album-card">
          <img src={ albumImage } alt={ artistName + albumName } />
          <div className="info-container">
            <p className="card-album-name">{ albumName }</p>
            <p className="card-album-artist-name">{ artistName }</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  albumImage: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
