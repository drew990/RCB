import Footer from "../Footer/footer";
import NavBar from "../Nav/navbar";

function Layout({ children }) {
  return (
    <>
      {/* <NavBar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
export default Layout;
