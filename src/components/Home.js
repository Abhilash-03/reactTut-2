import Feed from "./Feed"
import { useContext } from 'react'
import DataContext from '../context/DataContext';

const Home = () => {
  const {searchResult, fetchError, isLoading} = useContext(DataContext);

    return (
      <main className="home display">
        {isLoading && <p className="statusmsg">Loading posts...</p> }
        {!isLoading && fetchError && <p className="statuserror">{fetchError}</p> }

         {!isLoading && !fetchError && 
          ((searchResult.length )? (
                <Feed posts={searchResult} />
            ) :
             <p>No Posts To Display.</p>)
         }
      </main>
    )
  }
  
  export default Home
  