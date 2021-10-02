import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "./movie.css";
import LikeMovie from "../common/likeMovie";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import MovieGenre from "./movieGenre";

class Movie extends Component {
  state = {
    movieList: getMovies(),
    likeClasses: ["fa fa-heart", "fa fa-heart-o"],
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (movie) => {
    const movieList = this.state.movieList.filter((m) => m._id !== movie._id);
    this.setState({ movieList });
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
    const { pageSize, currentPage, movieList } = this.state;
    const movies = paginate(movieList, currentPage, pageSize);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <MovieGenre />
          </div>
          <div className="col">
            <h3 className="movies-heading">{this.noOfMovies()}</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <h5>Title</h5>
                  </th>
                  <th>
                    <h5>Genre</h5>
                  </th>
                  <th>
                    <h5>Stock</h5>
                  </th>
                  <th>
                    <h5>Rate</h5>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <LikeMovie
                        onClick={() => this.handleLike(movie)}
                        liked={movie.liked}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              moviesCount={this.state.movieList.length}
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
