import { Link } from "react-router-dom";
import "../css/home.css";
import heroImage from "../assets/aiImage.jpg"; 

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Knowledge Sharing Platform</h1>
          <p>Boost your learning with AI-powered assistance. Explore, create, and improve articles seamlessly.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn primary">
              Login
            </Link>
            <Link to="/register" className="btn secondary">
              Register
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="AI illustration" />
        </div>
      </section>
    </div>
  );
}

export default Home;