import { Box, Typography } from "@mui/material";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex bg-sky-50 justify-between items-center px-8 py-2">
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: 25, md: 35, lg: 40 } }}
        component={Link}
        href="/"
        fontWeight={700}
        className="ml-2"
      >
        Hey Jokes
      </Typography>
      <Box sx={{ display: "flex", gap: 2, fontWeight: 600 }}>
        <Link href="/">Home</Link>
        <Link href="/searchJokes">Search</Link>
        <Link href="/categoryJokes">Category</Link>
      </Box>
    </div>
  );
}

export default Navbar;
