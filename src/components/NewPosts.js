
const NewPosts = ({postTitle, setPostTitle, postBody, setPostBody, handleSubmit}) => {
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
