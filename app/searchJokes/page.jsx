"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  if (isLoading) return <p className="flex justify-center">Loading...</p>;

  return (
    <section>
      <div className="flex items-center justify-center">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "30rem",
            maxWidth: "100%",
            marginTop: "4rem",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="search for jokes by keywords"
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Box>
      </div>

      <div className="flex justify-center flex-col items-center">
        <Typography variant="h5" fontWeight={600} marginY="2rem">
          Search Jokes Here: {input}
        </Typography>
        {data && data.jokes ? (
          <div>
            <Typography
              sx={{ fontSize: 30, fontWeight: 600, textAlign: "center" }}
              gutterBottom
            >
              Here {data.amount === 1 ? "is" : "are"} {data.amount}{" "}
              {data.amount === 1 ? "joke" : "jokes"} with word "{input}":
            </Typography>

            <ul className="flex flex-col">
              {data.jokes.map((joke, index) => (
                <Card
                  sx={{
                    width: 800,
                    margin: 2,
                    padding: 2,
                    backgroundColor: "#f6f6f6",
                  }}
                  key={index}
                >
                  <CardContent>
                    {index + 1}.{" "}
                    {joke.type === "single" ? (
                      joke.joke
                    ) : (
                      <>
                        <p className=""> Setup: {joke.setup}</p>
                        <p>Delivery: {joke.delivery}</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="h5">No jokes found</Typography>
        )}
      </div>
    </section>
  );
}

export default SearchJokes;
