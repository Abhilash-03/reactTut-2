import Feed from "./Feed"
const Home = ({posts, fetchError, isLoading}) => {
    return (
      <main className="home display">
        {isLoading && <p className="statusmsg">Loading posts...</p> }
        {!isLoading && fetchError && <p className="statuserror">{fetchError}</p> }

         {!isLoading && !fetchError && 
          ((posts.length )? (
                <Feed posts={posts} />
            ) :
             <p>No Posts To Display.</p>)
         }
      </main>
    )
  }
  
  export default Home
  