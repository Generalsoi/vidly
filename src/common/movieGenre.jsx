import React from "react";

const MovieGenre = (props) => {
  const { items, onItemSelect, textProperty, valueProperty, selectedItem } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

MovieGenre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default MovieGenre;
