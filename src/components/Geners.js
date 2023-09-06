import { Chip } from "@mui/material";
import axios from "axios";
// import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  // const fetchGenres = async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  //   );
  //   setGenres(data.genres);
  // };

  // useEffect(() => {
  //   fetchGenres();

  //   return () => {
  //     setGenres({}); // unmounting
  //   };
  //   // eslint-disable-next-line
  // }, []);

 

const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRhZmE4OWUzZjU4Y2UxNWMwMWFjYzIxOTRkYzRiNyIsInN1YiI6IjY0ZjU3OTI2OGMyMmMwMDBhY2ZkNDk5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lRRu5Dvtj1SbVrO99mF9bQG3NxuCwP47fAIx5twPdr8'
  }
};

axios
  .request(options)
  .then(function (response) {
    // console.log(response.data);
    setGenres(response.data.genres);

    return() =>{
      setGenres({});
    }
  }) 
  .catch(function (error) {
    console.error(error);
  });

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres && selectedGenres.map((genre) => (
        <Chip 
          style={{ margin: 3, }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          // size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 3 , backgroundColor :"white"}}
          label={genre.name}
          key={genre.id}
          clickable
          // size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
      
    </div>
  );
};

export default Genres;