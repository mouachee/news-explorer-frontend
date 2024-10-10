import "./App.css";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
function App() {
  return (
    <div className="app">
      <div className="app__content">
        <div className="app__search">
          <Nav />
          <Header />
        </div>
        <Main />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
