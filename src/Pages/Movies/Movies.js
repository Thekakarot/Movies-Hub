import React, { useState } from 'react'
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import { CustomPagination } from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Geners';
import useGenre from '../../hooks/useGenre';
const Movies = () => {

  const[page,setPage] = useState(1);
  const[content, setContent] = useState([]);
  const[numOfPages, setNumOfPages] = useState();
  const[selectedGenres,setSelectedGenres] = useState([]);
  const[genres,setGeners] = useState([]);
  const genreforURL = useGenre(selectedGenres);

const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRhZmE4OWUzZjU4Y2UxNWMwMWFjYzIxOTRkYzRiNyIsInN1YiI6IjY0ZjU3OTI2OGMyMmMwMDBhY2ZkNDk5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lRRu5Dvtj1SbVrO99mF9bQG3NxuCwP47fAIx5twPdr8'
  }
};

axios
  .request(options)
  .then(function (response) {
    // console.log(response.data.results);
    setContent(response.data.results);
    setNumOfPages(response.data.total_pages);
  })
  .catch(function (error) {
    console.error(error);
  });
  return (
    <div>
        <span className='pageTitle'>Movies</span>
        <Genres 
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGeners}
        setPage={setPage}
      />
        <div className='trending'>
       {
        content && content.map((c) => (
            <SingleContent  key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
        ))
       }
      </div>{
        numOfPages > 1 && (
      <CustomPagination setPage = {setPage} numOfPages={numOfPages} />
        )}
    </div>
  )
}

export default Movies