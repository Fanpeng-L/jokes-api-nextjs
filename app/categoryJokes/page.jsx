"use client";

import { Button, Card, Typography } from "@mui/material";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function filterJokes() {
  const [category, setCategory] = useState("Programming"); // Default category is programming

  const { data, error } = useSWR(
    `https://v2.jokeapi.dev/joke/${category}?amount=10`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  console.log(data);

  if (!data && !error)
    return (
      <Typography variant="h4" sx={{ textAlign: "center", margin: 6 }}>
        Loading jokes now...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h4" sx={{ textAlign: "center", margin: 6 }}>
        Fetching data failed
      </Typography>
    );

  return (
    <div>
      <div>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, textAlign: "center", margin: 4 }}
        >
          Which category of jokes you want to get?
        </Typography>

        <div className="flex justify-center items-center gap-2 mb-8">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#D5E9F3", color: "#000000" }}
            onClick={() => handleCategoryChange("Programming")}
          >
            Programming
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#684d8f", color: "#ffffff" }}
            onClick={() => handleCategoryChange("Miscellaneous")}
          >
            Miscellaneous
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#000000", color: "#ffffff" }}
            onClick={() => handleCategoryChange("Dark")}
          >
            Dark
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#bcd96e", color: "#000000" }}
            onClick={() => handleCategoryChange("Pun")}
          >
            Pun
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f7e6b2", color: "#000000" }}
            onClick={() => handleCategoryChange("Spooky")}
          >
            Spooky
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#e06666", color: "#000000" }}
            onClick={() => handleCategoryChange("Christmas")}
          >
            Christmas
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
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
            <p>{joke.joke}</p>
            <p>{joke.setup}</p>
            <p>{joke.delivery}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

//   return (
//     <div>
//

//       <ul className="flex flex-col justify-center items-center">
//         {data.jokes.map((joke, index) => (
//           <Card
//             key={index}
//             sx={{
//               width: 800,
//               margin: 2,
//               padding: 2,
//               backgroundColor: "#f6f6f6",
//             }}
//           >
//             {index + 1}. {joke.joke}
//           </Card>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default filterJokes;
