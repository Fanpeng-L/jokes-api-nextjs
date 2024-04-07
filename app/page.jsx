import Navbar from "./components/Navbar";
import SearchJokes from "./components/SearchJokes";
import RandomJokes from "./randomJokes/page";

function Home() {
  return (
    <div>
      <Navbar />
      <SearchJokes />
      {/* <RandomJokes /> */}
    </div>
  );
}

export default Home;
