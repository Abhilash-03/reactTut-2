import { Link } from "react-router-dom";
import { useContext } from 'react'
import DataContext from '../context/DataContext';

const Nav = () => {
  const {search , setSearch} = useContext(DataContext);
  return (
    <nav className="navForm">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          name="search"
          id="search"
          role="searchbox"
          placeholder="Search Blogs..."
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </form>

       <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts'>Posts</Link></li>
        <li><Link to='/about'>About</Link></li>
       </ul>

    </nav>
  );
};

export default Nav;
