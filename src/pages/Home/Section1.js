import { useEffect } from "react";
import gsap from "gsap";
import "../../styles/Section1Style.css";


const Section1 = () => {
  
 

  useEffect(() => {
    // statue fade + slide lên
    

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
     
     

    </section>
  );
};

export default Section1;