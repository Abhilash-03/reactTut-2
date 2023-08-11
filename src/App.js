import Header from "./components/Header";
import Nav from "./components/Nav";
import About from "./components/About";
import PostPage from "./components/PostPage";
import NewPosts from "./components/NewPosts";
import EditPost from "./components/EditPost"
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import format from "date-fns/format";
import api from './api/posts'
import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  // Fetching data from json-server from data/db.jedit
  useEffect(()=>{
       const fetchPosts = async()=>{
          try{
             const response = await api.get('/posts');
             setPosts(response.data);
          } catch(err){
            if(err.response){
              console.log(err.response.data)
              console.log(err.response.status)
              console.log(err.response.headers)
            }
            else{
              console.log(`Error: ${err.message}`);

            }
          }
       }

       fetchPosts();
  }, [])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
   const datetime = format(new Date(), 'MMMM dd, yyyy pp')
   const newPost = {id, title: postTitle, datetime, body: postBody};

   try{
    const response = await api.post('/posts', newPost)
    const allPost = [...posts, response.data];
    setPosts(allPost);
    setPostTitle('');
    setPostBody('');
    navigate('/');
   }
   catch(err){
    console.log(`Error: ${err.message}`);
   }


  }

  const handleDelete = async(id)=>{
    try{
      await api.delete(`/posts/${id}`);
      const post = posts.filter(post => post.id !== id);
      setPosts(post);
      navigate('/')

    }catch(err){
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async(id) => {
    try{
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
      const updatedPost = {id, title: editTitle, datetime, body: editBody};
      const response = await api.put(`/posts/${id}`, updatedPost);
      // We are mapping again for update post so that it'll display updated data instead of old data. 
      setPosts(posts.map(post => post.id === id ? {...response.data}: post));
      setEditTitle('');
      setEditBody('');
      navigate('/');

    }catch(err){
      console.log(`Error: ${err.message}`);
    }
  }



  useEffect(()=>{
      const filteredResults = posts.filter((post)=> ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase())
      )

      setSearchResult(filteredResults.reverse());
     
  }, [posts, search])

  return (
    <div className="App">
      <Header title="React Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route index element={<Home posts={searchResult} />} />
        <Route path="/posts">
          <Route index element={<NewPosts
               postTitle = {postTitle}
               setPostTitle = {setPostTitle}
               postBody = {postBody}
               setPostBody = {setPostBody}
               handleSubmit = {handleSubmit}
          />} />
          <Route path="/posts/edit/:id" element={<EditPost
               posts={posts}
               editTitle = {editTitle}
               setEditTitle = {setEditTitle}
               editBody = {editBody}
               setEditBody = {setEditBody}
               handleEdit = {handleEdit}
          />} />
          <Route path=":id" element={<PostPage
             posts = {posts}
             handleDelete = {handleDelete}
          />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
