import React, { useState }   from 'react'
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css'
import { CustomPagination } from '../../components/Pagination/CustomPagination';

const Trending = () => {

    const[page,setPage] = useState(1);
    const [content, setContent] = useState([]);

    // const fetchTrending = async () => {
    //     const {data } = await axios.get(
    //       `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    //     );
    
    //     setContent(data.results);
    //   };
  
    // useEffect(() => {
    //    fetchTrending();
    // }, [])
    
    // useEffect( () => {
    //     axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`).then(
    //         response =>{ setContent(response.data.results)}
    //     ).catch(err => {console.log(err)}
    //     );

      
    // }, [])
    
    

const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
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
  })
  .catch(function (error) {
    console.error(error);
  });
    
  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className='trending'>
       {
        content && content.map((c) => (
            <SingleContent  key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
        ))
       }
      </div>
      <CustomPagination setPage = {setPage} />
    </div>
  )
}

export default Trending