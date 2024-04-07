"use client";

import useSWR from "swr";
import { Card, Typography } from "@mui/material";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function RandomJokes() {
  const { data, error } = useSWR(
    "https://v2.jokeapi.dev/joke/Any?type=single&amount=10",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    } // disable Automatic revalidation
  );

  console.log(data);

  if (error) return <Typography variant="h2">Failed to get jokes💔</Typography>;
  if (!data)
    return <Typography variant="h2">Loading random jokes...🥳</Typography>;

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontSize: 30,
          fontWeight: 600,
          textAlign: "center",
          margin: 6,
        }}
      >
        Here are 10 random jokes🤡 for you:
      </Typography>
      <ul className="flex flex-col justify-center items-center">
        {data.jokes.map((joke, index) => (
          <Card
            key={index}
            sx={{
              width: 800,
              margin: 2,
              padding: 2,
              backgroundColor: "#f6f6f6",
            }}
          >
            {index + 1}. {joke.joke}
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default RandomJokes;
