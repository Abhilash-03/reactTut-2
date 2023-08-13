import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import format from "date-fns/format";
import api from '../api/posts';

const EditPost = () => {
   
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts} = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();


  const handleEdit = async (id) => {
    try {
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      const response = await api.put(`/posts/${id}`, updatedPost);
      // We are mapping again for update post so that it'll display updated data instead of old data.
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="home newPost">
      {editTitle && (
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
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <p>Something went wrong, 404.</p>
          <p>Please try again</p>
          <Link to="/">
            <p className="link">Go Back To Home</p>
          </Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
