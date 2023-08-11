import Header from "./components/Header";
import Nav from "./components/Nav";
import About from "./components/About";
import PostPage from "./components/PostPage";
import NewPosts from "./components/NewPosts";
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  const initialPosts = [
    {
      id: 1,
      title: "First Post",
      datetime: "12 july 2023 11:20",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      title: "2nd Post",
      datetime: "14 july 2023 01:20",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      title: "Third Post",
      datetime: "17 july 2023 17:25",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      title: "Fourth Post",
      datetime: "12 August 2023 9:12",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  const handleDelete = (id)=>{
     const post = posts.filter(post => post.id !== id);
     setPosts(post);
     navigate('/')
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
   const datetime = format(new Date(), 'MMMM dd, yyyy pp')
   const newPost = {id, title: postTitle, datetime, body: postBody};
   const allPost = [...posts, newPost];
   setPosts(allPost);
   setPostTitle('');
   setPostBody('');
   navigate('/');

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
