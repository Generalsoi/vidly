import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import "./movie.css";
import MovieTable from "./movieTable";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import MovieGenre from "../common/movieGenre";

class Movie extends Component {
  state = {
    movieList: [],
    genres: [],
    likeClasses: ["fa fa-heart", "fa fa-heart-o"],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ genres, movieList: getMovies() });
  }

  handleDelete = (movie) => {
    const movieList = this.state.movieList.filter((m) => m._id !== movie._id);
    this.setState({ movieList });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (movie) => {
    const movieList = [...this.state.movieList];
    const index = movieList.indexOf(movie);
    movieList[index] = { ...movieList[index] };
    movieList[index].liked = !movieList[index].liked;
    this.setState({ movieList });
  };

  noOfMovies = () => {
    return this.state.movieList.length === 0
      ? "There are no movies in the database"
      : `Showing ${this.state.movieList.length} movies in the database`;
  };

  render() {
    const { pageSize, currentPage, movieList, genres, selectedGenre } =
      this.state;
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movieList.filter((m) => m.genre._id === selectedGenre._id)
        : movieList;

    const movies = paginate(filteredMovies, currentPage, pageSize);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <MovieGenre
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <h3 className="movies-heading">
              Showing {filteredMovies.length} movies in the database
            </h3>
            <MovieTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            />
            <Pagination
              moviesCount={filteredMovies.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
