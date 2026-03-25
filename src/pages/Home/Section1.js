import {useEffect} from 'react'
import Pasta from '../../assets/images/pasta.avif'
import Leaf1 from '../../assets/images/leaf1.avif'
import Leaf2 from '../../assets/images/leaf2.avif'
import Leaf3 from '../../assets/images/leaf3.avif'
import Leaf4 from '../../assets/images/leaf4.avif'

import gsap from 'gsap'
import '../../styles/Section1Style.css'

const Section1 = () => {
  useEffect(() => {
    gsap.fromTo(
  ".leaf",
  { opacity: 0 },
  {
    opacity: 1,
    x: (i) => (i % 2 === 0 ? -20 : 20),
    duration: 0.3,
    stagger: 0.2,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(".leaf", {
        y: () => gsap.utils.random(-30, 30),
        duration: 1,
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: "sine.inOut"
      })
    }
  }
)
}, []);

    
  return (
    <section className="hero_section">

      {/* marquee */}
      <div className="hero_marquee">
        <div className="marquee_track">
          <h1>L'EREDITÀ L'EREDITÀ L'EREDITÀ L'EREDITÀ</h1>
          <h1>L'EREDITÀ L'EREDITÀ L'EREDITÀ L'EREDITÀ</h1>
        </div>
      </div>


      {/* pasta */}
      <div className="pasta_overlay">
        <img src={Pasta} className="pasta" alt="pasta" />
</div>
      
      {/* leaves */}
      
      
        <img src={Leaf1} className="leaf leaf1" alt="" />
        <img src={Leaf2} className="leaf leaf2" alt="" />
        <img src={Leaf3} className="leaf leaf3" alt="" />
        <img src={Leaf4} className="leaf leaf4" alt="" />

    




      {/* text right (bootstrap ok) */}
      <div className="hero_text text-end">
        <h2>
          Dangerously delicious, so good that our dishes even speak Italian.
        </h2>
      </div>

    </section>
  )
}

export default Section1
