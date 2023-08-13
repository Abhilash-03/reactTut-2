import { useContext, useState } from 'react'
import DataContext from '../context/DataContext';
import api from '../api/posts';
import format from "date-fns/format";
import {  useNavigate } from "react-router-dom";

const NewPosts = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post("/posts", newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="home newPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <div className="inputBox">
        <label htmlFor="postTitle">Title:</label>
        <input type="text"
            placeholder="Enter Title"
            id="posttitle"
            required
            value={postTitle}
            onChange={(e)=> setPostTitle(e.target.value)}
        />
         </div>
         <div className="inputBox">
        <label htmlFor="postBody">Post:</label>
        <textarea name="postbody" id="postbody" placeholder="Enter post details"
          rows="7"  value={postBody} onChange={(e)=> setPostBody(e.target.value)}
        ></textarea>
</div>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPosts
