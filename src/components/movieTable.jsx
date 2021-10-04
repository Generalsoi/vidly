import React from "react";
import LikeMovie from "../common/likeMovie";

const MovieTable = (props) => {
  const { movies, onLike, onDelete } = props;

  return (
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
              <LikeMovie onClick={() => onLike(movie)} liked={movie.liked} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
