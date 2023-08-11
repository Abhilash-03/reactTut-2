import { Link } from "react-router-dom"
const Missing = () => {
    return (
      <main className="home missing">
         <h2><span className="error">404</span>, Page Not Found</h2>
         <Link to={'/'}><small className="link">Go to home page</small></Link>
         </main>
    )
  }
  
  export default Missing
  