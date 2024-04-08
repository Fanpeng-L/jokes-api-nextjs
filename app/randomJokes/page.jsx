"use client";

import useSWR from "swr";
import { Box, Card, Typography } from "@mui/material";

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
          fontSize: { xs: 25, md: 30, lg: 35 },
          fontWeight: 600,
          textAlign: "center",
          margin: 6,
        }}
      >
        Here are 10 random jokes🤡 for you:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.jokes.map((joke, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: 350, md: 600, lg: 800 },
              fontSize: 20,
              margin: 2,
              padding: 4,
              backgroundColor: "#f6f6f6",
            }}
          >
            {index + 1}. {joke.joke}
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default RandomJokes;
