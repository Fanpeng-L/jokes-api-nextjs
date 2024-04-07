import { Typography } from "@mui/material";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex bg-sky-50 justify-between items-center p-2">
      <Typography
        variant="h3"
        component={Link}
        href="/"
        fontWeight={700}
        className="ml-2"
      >
        Hey Jokes
      </Typography>
      <ul className="flex gap-8 mr-10 font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/searchJokes">Search</Link>
        </li>
        <li>
          <Link href="/categoryJokes">Category</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
