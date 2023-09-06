import { Button, Tab, Tabs, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SingleContent from '../../components/SingleContent/SingleContent';
import { CustomPagination } from '../../components/Pagination/CustomPagination';
import axios from 'axios';




const Search = () => {
  const [type,setType] = useState(0);
  const [page,setPage] = useState(1);
  const [searchText,setSearchText] = useState("");
  const [content,setContent] = useState();
  const [numOfPages,setNumOfPages] = useState();

  

  const options = {
    method: 'GET',
    url:  `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&query=${searchText}&page=${page}&include_adult=false`,
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
        
           <div>
            <div style={{display: "flex", margin:"20px 0"}}>
              <TextField 
                size='medium'
                style={{flex : 1}}
                className='searchBox'
                label='Search'
                variant='filled'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button variant='contained' style={{marginLeft: 10}} onClick={options}><SearchOutlinedIcon/></Button>
            </div>
            <Tabs value={type} indicatorColor='primary'
            textColor='primary'
            onChange={(event,newValue) =>{
              setType(newValue);
              setPage(1);
            }}
            >
            <Tab style={{ width: "100%" }} label="Search Movies" />
            <Tab style={{ width: "100%" }} label="Search TV Series" />
            </Tabs>
            <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
           </div>
       
    </div>
  )
}

export default Search