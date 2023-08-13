import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import PostPage from "./components/PostPage";
import NewPosts from "./components/NewPosts";
import EditPost from "./components/EditPost";
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header title="React Blog" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/posts">
            <Route index element={<NewPosts />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>

      <Footer />
    </div>
  );
}

export default App;
