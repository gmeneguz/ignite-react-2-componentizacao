import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

import IGenre from "./interfaces/IGenre";
import IMovie from "./interfaces/IMovie";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<IGenre[]>([]);

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenre>({} as IGenre);

  useEffect(() => {
    api.get<IGenre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<IMovie[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api.get<IGenre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function handleSelectGenre(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        onSelectGenre={handleSelectGenre}
      />
      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
