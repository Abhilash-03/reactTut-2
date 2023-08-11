import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
  handleEdit,
}) => {
     const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
        
    }, [post, setEditTitle, setEditBody]);

  return (
    <main className="home newPost">
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <div className="inputBox">
              <label htmlFor="editTitle">Edit Title:</label>
              <input
                type="text"
                placeholder="Enter Title"
                id="posttitle"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="postBody">Edit Post:</label>
              <textarea
                name="postbody"
                id="postbody"
                placeholder="Enter post details"
                rows="7"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" onClick={()=> handleEdit(post.id)}>Submit</button>
          </form>
        </>
      }
      {
        !editTitle &&
        <>
         <p>Something went wrong, 404.</p>
         <p>Please try again</p>
       <Link to='/'>  <p className="link">Go Back To Home</p></Link>
         </>
      }
    </main>
  );
};

export default EditPost;
