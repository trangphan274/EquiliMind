import { useEffect } from "react";
import Statue from "../../assets/images/statue.png";
import gsap from "gsap";
import "../../styles/Section1Style.css";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();
  const goPredict = () => {
    navigate('/predict');  // đưa thẳng tới route /predict
  }

  useEffect(() => {
    // statue fade + slide lên
    gsap.fromTo(
      ".statue",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // marquee chạy nhẹ
    gsap.to(".marquee_track", {
      x: "-50%",
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

  }, []);

  return (
    <section className="hero_section">

      {/* marquee */}
      <div className="hero_marquee">
        <div className="marquee_track">
          <h1>
            RESTORE BALANCE • PRIORITIZE MENTAL HEALTH • FIND YOUR INNER PEACE •
            PREDICT TO PREVENT • MINDFUL WORKING
          </h1>
          <h1>
            RESTORE BALANCE • PRIORITIZE MENTAL HEALTH • FIND YOUR INNER PEACE •
            PREDICT TO PREVENT • MINDFUL WORKING
          </h1>
        </div>
      </div>

      {/* statue */}
      <div className="statue_overlay">
        <img src={Statue} className="statue" alt="statue" />
      </div>
      <button className="explore_btn" onClick={goPredict}>Predict Burnout</button>


    </section>
  );
};

export default Section1;