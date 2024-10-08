import NavBar from "./navBar";
import Footer from "./footer";

const layout = ({children}) => {
  return (
    <>
        <NavBar/>
        {children}
        <Footer/>
    </>
  );
};

export default layout;