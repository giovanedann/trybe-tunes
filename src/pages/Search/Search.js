import React, { Component } from 'react';
import { Header, Loading, AlbumCard } from '../../components';
import './Search.css';
import SearchAlbumsAPIs from '../../services/searchAlbumsAPI';
// import { BsSearch } from 'react-icons/bs';

class Search extends Component {
  constructor() {
    super();
    this.isInputValid = this.isInputValid.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = {
      artist: '',
      loading: false,
      albuns: [],
    };
  }

  handleInputChange({ target }) {
    const { value } = target;
    this.setState({ artist: value });
  }

  async handleSearchClick({ target }) {
    this.setState({ loading: true }, async () => {
      const { artist } = this.state;
      const queryAlbuns = await SearchAlbumsAPIs(artist);
      target.previousElementSibling.value = '';
      this.setState({ loading: false, albuns: [...queryAlbuns] });
    });
  }

  isInputValid() {
    const { artist } = this.state;
    const minInputLength = 2;
    return artist.length < minInputLength;
  }

  render() {
    const { loading, albuns, artist } = this.state;
    return (
      <>
        <Header />

        { loading && <Loading className="black-loading-element" />}

        { !loading
          && (
            <div data-testid="page-search" className="search-container">
              <input
                type="text"
                placeholder="Artists or bands"
                data-testid="search-artist-input"
                onChange={ this.handleInputChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ this.isInputValid() }
                onClick={ this.handleSearchClick }
              >
                Search
              </button>
            </div>
          )}

        {/* {!albuns.length && <h2 className="not-found">No albuns found 😢</h2>} */}

        {Boolean(albuns.length) && (
          <div className="albuns-container">
            <h2 className="albuns-results-text">
              { `Resultado de álbuns de: ${artist}`}
            </h2>
            <div className="artist-albuns">
              { albuns.map((queryItem, index) => {
                const {
                  artistName,
                  collectionName,
                  artworkUrl100,
                  collectionId,
                } = queryItem;

                return (
                  <AlbumCard
                    key={ artistName + index }
                    albumImage={ artworkUrl100 }
                    albumName={ collectionName }
                    artistName={ artistName }
                    collectionId={ collectionId }
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

export default Search;
