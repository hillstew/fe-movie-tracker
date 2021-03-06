import React, { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import MovieCard from '../../components/MovieCard/MovieCard';
import { populateFavorites } from "../../actions";
import { postData, deleteData } from "../../api/api";
import { getFavorites } from "../../utils/helper";

export class MovieArea extends Component {
  handleFavorite = async (movie, user) => {
    if (user.favorites && !user.favorites.includes(movie.movie_id)) {
      await postData("/favorites/new", { ...movie, user_id: user.id });
      let userFavorites = await getFavorites(user.id);
      this.props.populateFavorites(userFavorites);
    } else {
      await postData("/favorites/new", { ...movie, user_id: user.id });
      let userFavorites = await getFavorites(user.id);
      this.props.populateFavorites(userFavorites);
    }
  };

  handleDelete = async (movie, user) => {
    const suffix = `/${user.id}/favorites/${movie.movie_id}`;
    await deleteData(suffix, { user_id: user.id, movie_id: movie.movie_id });
    let userFavorites = await getFavorites(user.id);
    this.props.populateFavorites(userFavorites);
  };

  renderFavoriteCards = (movies, user) => {
    const favorites = movies.filter(movie => {
      return user.favorites.includes(movie.movie_id);
    });
    const favoriteCards = favorites.map(movie => {
      return (
        <MovieCard
          key={movie.movie_id}
          movie={movie}
          user={user}
          handleFavorite={this.handleFavorite}
          handleDelete={this.handleDelete}
        />
      );
    });
    return favoriteCards;
  };

  renderAllMovies = (movies, user) => {
    const allMovies = movies.map(movie => {
      return (
        <MovieCard
          key={movie.movie_id}
          movie={movie}
          handleFavorite={this.handleFavorite}
          user={user}
          handleDelete={this.handleDelete}
        />
      );
    });
    return allMovies;
  };

  render() {
    const { location, user, movies } = this.props;
    return (
      <div>
        {location.pathname === "/favorites" && user.favorites && (
          <div className="movie-area">
            {this.renderFavoriteCards(movies, user)}
          </div>
        )}
        {location.pathname === "/favorites" && !user.favorites && (
          <div className="movie-area">no favorites</div>
        )}
        {location.pathname === "/" && (
          <div className="movie-area">{this.renderAllMovies(movies, user)}</div>
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  movies: state.movies,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  populateFavorites: favorites => dispatch(populateFavorites(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieArea);


MovieArea.propTypes = {
  populateFavorites: PropTypes.func,
  movies: PropTypes.array,
  user: PropTypes.object
}