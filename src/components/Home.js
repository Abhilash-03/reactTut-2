import Feed from "./Feed"
const Home = ({posts}) => {
    return (
      <main className="home display">
         {
          (posts.length )? (
                <Feed posts={posts} />
            ) :
             <p>No Posts To Display.</p>
         }
      </main>
    )
  }
  
  export default Home
  