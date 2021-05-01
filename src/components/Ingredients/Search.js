import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onfilteredIngredients } = props;
  const [filterIngredient, setFilterIngredient] = useState("");

  useEffect(() => {
    const query =
      filterIngredient.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${filterIngredient}"`;

    fetch(
      "https://react-hooks-update-652af-default-rtdb.firebaseio.com/ingredients.json" +
        query
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onfilteredIngredients(loadedIngredients);
        // setUserIngredients(loadedIngredients);
      });
  }, [filterIngredient]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filterIngredient}
            onChange={(event) => {
              setFilterIngredient(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
