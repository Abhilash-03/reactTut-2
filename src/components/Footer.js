const Footer = () => {
  const year = new Date();
    return (
      <footer>
         <p>Copyright &copy; {year.getFullYear()}. Created By AKJ</p>
      </footer>
    )
  }
  
  export default Footer
  