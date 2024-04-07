"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";

function SearchJokes() {
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState("");

  // fetch jokes based on user input:
  const fetchData = () => {
    if (input.trim() !== "") {
      setLoading(true);
      fetch(`https://v2.jokeapi.dev/joke/Any?contains=${input}&amount=5`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch jokes");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
      console.log(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setInput("");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="search for jokes by keywords"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Box>
      </div>

      {data && data.jokes && data.jokes.length > 0 ? (
        <div>
          <Typography variant="h4" fontWeight={600}>
            Here {data.amount === 1 ? "is" : "are"} {data.amount}{" "}
            {data.amount === 1 ? "joke" : "jokes"}:
          </Typography>

          <ul>
            {data.jokes.map((joke, index) => (
              <li key={index}>
                {index + 1}.{" "}
                {joke.type === "single" ? (
                  joke.joke
                ) : (
                  <>
                    <p className="">Setup: {joke.setup}</p>
                    <p>Delivery: {joke.delivery}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Typography variant="h2">No jokes found</Typography>
      )}
    </div>
  );
}

export default SearchJokes;
