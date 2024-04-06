"use client";

import useSWR from "swr";
import { Typography } from "@mui/material";

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
      <Typography variant="h4" fontWeight={600}>
        Here are 10 jokes🤡 for you:
      </Typography>
      <ul>
        {data.jokes.map((joke, index) => (
          <li key={index}>
            {index + 1}. {joke.joke}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomJokes;
