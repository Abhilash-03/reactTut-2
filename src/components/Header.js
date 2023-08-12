import {FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa'

function Header({title, width}) {
  return (
    <header className="heading">
       <h1>{title}</h1>
       {
         width < 768 ? <FaMobileAlt/>  : width < 992 ? <FaTabletAlt/> : <FaLaptop/>
       }
    </header>
  )
}

export default Header
