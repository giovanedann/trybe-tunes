import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../../services/musicsAPI';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { Header, Loading, MusicCard } from '../../components';
import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);
    this.setSongsToState = this.setSongsToState.bind(this);
    this.loadFavoriteSongs = this.loadFavoriteSongs.bind(this);
    this.state = {
      loading: true,
      songList: [],
      favSongs: [],
      artist: '',
      coverImage: '',
      albumName: '',
      genre: '',
      tracks: 0,
    };
  }

  componentDidMount() {
    this.setSongsToState();
    this.loadFavoriteSongs();
  }

  async setSongsToState() {
    this.setState({ loading: true }, async () => {
      const { match } = this.props;
      const { params } = match;
      const { id } = params;
      const songs = await getMusics(id);
      const {
        artistName,
        artworkUrl100,
        collectionName,
        primaryGenreName,
        trackCount,
      } = songs[0];

      this.setState({
        songList: [...songs],
        loading: false,
        artist: artistName,
        coverImage: artworkUrl100,
        albumName: collectionName,
        genre: primaryGenreName,
        tracks: trackCount,
      });
    });
  }

  async loadFavoriteSongs() {
    this.setState({ loading: true }, async () => {
      const loadedFavoriteSongs = await getFavoriteSongs();
      this.setState({ favSongs: loadedFavoriteSongs, loading: false });
    });
  }

  render() {
    const {
      loading,
      artist,
      coverImage,
      albumName,
      genre,
      tracks,
      songList,
      favSongs,
    } = this.state;

    return (
      <div>
        <Header />
        { loading && <Loading className="black-loading-element" /> }
        { !loading && (
          <div className="album-content" data-testid="page-album">
            <div className="album-info">
              <img src={ coverImage } alt={ `${albumName} cover` } />
              <p data-testid="album-name">{ albumName }</p>
              <p data-testid="artist-name">{ artist }</p>
              <p>{ `Genre: ${genre}` }</p>
              <p>{ `Tracks: ${tracks}` }</p>
            </div>
            <div className="songs-container">
              { songList.map((song, index) => {
                if (!index) { return null; }
                const { trackName } = song;
                return (
                  <MusicCard
                    key={ trackName }
                    currSong={ { ...song } }
                    isFav={ favSongs.some((item) => item.trackName === trackName) }
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
