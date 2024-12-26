import React from "react";
import HomePage from "./pages/home";
import Spells from "./pages/spells";
import Books from "./pages/books";
import Characters from "./pages/characters";
import Houses from "./pages/houses";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterInfo from "./pages/characterInfo";
import Movies from "./pages/movies";
import BooksInfo from "./pages/booksInfo";
import MoviesInfo from "./pages/movieInfo";
import HouseInfo from "./pages/houseInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/spells",
    element: <Spells />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/houses",
    element: <Houses />,
  },
  {
    path: "/characters",
    element: <Characters />,
  },
  {
    path: "/characters/:name",
    element: <CharacterInfo />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/books/:serial",
    element: <BooksInfo/>
  },
  {
    path: "/movies/:serial",
    element: <MoviesInfo/>
  },
  {
    path: "/houses/:name",
    element: <HouseInfo />,
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
