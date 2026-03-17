import { motion } from "framer-motion";
import parasImage from "../assets/paras.jpeg";
import "./about.css";

function About() {
  return (
    <div className="about-container">

      {/* HERO SECTION */}
      <div className="hero-section">

        <motion.div
          initial={{opacity:0,x:-50}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.8}}
          className="hero-text"
        >
          <h1>Paras Enterprises</h1>
          <h3>Where Automotive Excellence Meets Unmatched Expertise</h3>

          <p>
            Established with passion and purpose, Paras Enterprises is dedicated
            to delivering premium automotive accessories and expert mechanical
            care. Every vehicle deserves the best service and every driver
            deserves honesty, reliability and precision.
          </p>
        </motion.div>

        <motion.img
          src={parasImage}
          alt="Paras Enterprises"
          className="hero-image"
          initial={{opacity:0,x:50}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.8}}
        />

      </div>


      {/* STORY SECTION */}
      <section className="story-section">

        <h2>Our Story</h2>

        <p>
          Paras Enterprises didn't start as a business — it started as a belief.
          A belief that every vehicle deserves the best care and every driver
          deserves service built on honesty and automotive passion.
        </p>

        <p>
          Over the years we have grown into a trusted automotive destination,
          offering both premium accessories and expert mechanical services under
          one roof.
        </p>

      </section>


      {/* CORE PILLARS */}
      <section className="pillars-section">

        <h2>Our Core Pillars</h2>

        <div className="pillar-grid">

          <motion.div whileHover={{scale:1.05}} className="pillar-card">
            <h3>🔧 Expert Mechanical Care</h3>
            <p>
              Certified mechanics delivering precision repairs and maintenance
              with years of hands-on experience.
            </p>
          </motion.div>

          <motion.div whileHover={{scale:1.05}} className="pillar-card">
            <h3>🚗 Premium Accessories</h3>
            <p>
              High-quality automotive upgrades, interiors and exterior parts
              designed for durability and performance.
            </p>
          </motion.div>

          <motion.div whileHover={{scale:1.05}} className="pillar-card">
            <h3>🤝 Trust & Transparency</h3>
            <p>
              Honest communication, fair pricing and no hidden surprises.
            </p>
          </motion.div>

          <motion.div whileHover={{scale:1.05}} className="pillar-card">
            <h3>⚡ Speed & Efficiency</h3>
            <p>
              Fast service without compromising quality so you get back on the
              road quickly.
            </p>
          </motion.div>

        </div>

      </section>


      {/* WHY CHOOSE US */}
      <section className="difference-section">

  <h2>The Paras Difference</h2>

  <div className="difference-grid">

    <div className="difference-card">
      <h3>🏢 One Roof Solution</h3>
      <p>
        From accessories to complete mechanical services,
        everything your vehicle needs is available in one place.
      </p>
    </div>

    <div className="difference-card">
      <h3>🛠 Genuine Parts</h3>
      <p>
        We provide only authentic and high-quality automotive
        parts to ensure durability and reliability.
      </p>
    </div>

    <div className="difference-card">
      <h3>👨‍🔧 Expert Technicians</h3>
      <p>
        Our experienced and certified mechanics handle every
        vehicle with technical expertise and precision.
      </p>
    </div>

    <div className="difference-card">
      <h3>❤️ Customer First</h3>
      <p>
        Customer satisfaction is at the heart of everything
        we do — we listen, advise, and deliver the best service.
      </p>
    </div>

    <div className="difference-card">
      <h3>💰 Honest Pricing</h3>
      <p>
        Competitive and transparent pricing ensures premium
        service without unnecessary costs.
      </p>
    </div>

  </div>

</section>


      {/* MISSION */}
      <section className="mission-section">

        <h2>Our Mission</h2>

        <p>
          "To be the most trusted name in automotive care — one vehicle,
          one customer, one mile at a time."
        </p>

        <span>— The Paras Enterprises Team</span>

      </section>

    </div>
  );
}

export default About;