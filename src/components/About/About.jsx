import "./About.css";
import Author from "../../assets/me.png";

function About() {
  return (
    <div className="about">
      <div className="about__container">
        <img src={Author} alt="author" className="about__author--profile" />
        <div className="about__author--info">
          <h2 className="about__author--title">About the author</h2>
          <p className="about__author--caption">
            My name is Mouachee Thao, I'm a full-stack software engineer with a
            passion for creating interactive and user-friendly applications. I
            use React, JavaScript, and CSS in frontend, and I am also
            experienced with backend technologies like node.js, express.js and
            MongoDB.
          </p>
          <p className="about__author--caption">
            I've learned many technologies from TripleTen, including React,
            JavaScript, CSS, HTML5, Express.js, node.js, and MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
