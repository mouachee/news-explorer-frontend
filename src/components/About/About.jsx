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
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__author--caption">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
