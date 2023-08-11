import { useParams, Link } from "react-router-dom";
const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => (post.id).toString() === id);
  return (
    <main className="home postPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="datetime">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/posts/edit/${post.id}`}><button className="edit">Edit</button></Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </>
        }
        {!post && 
          <>
            <h2>Post Not Found!</h2>
            <p>Well that's disappointing.</p>
            <Link to='/'>  <p className="link">Go Back To Home</p></Link>
          </>
        }
      </article>
    </main>
  );
};

export default PostPage;
