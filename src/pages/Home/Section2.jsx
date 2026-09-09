import { useEffect } from "react"
import "../../styles/Section2Style.css"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


import Rock from "../../assets/images/rock.png"
import Rock2 from "../../assets/images/rock2.png"
import Bird from "../../assets/images/bird.png"
import Bird2 from "../../assets/images/bird2.png"
import Leaf1 from "../../assets/images/leaf1.png"
import Leaf2 from "../../assets/images/leaf2.png"

gsap.registerPlugin(ScrollTrigger)

const Section2 = () => {
  useEffect(() => {
    const floating = gsap.utils.toArray(".floating")

    const setters = floating.map(el => ({
      x: gsap.quickSetter(el, "x", "px"),
      y: gsap.quickSetter(el, "y", "px"),
    }))

    let mouseX = 0
    let mouseY = 0
    let scrollY = 0

    floating.forEach((el, i) => {
      const amp = 40 + i * 25

      ScrollTrigger.create({
        trigger: ".slogan",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: self => {
          scrollY = gsap.utils.interpolate(-amp, amp, self.progress)
        },
      })
    })

    let smoothX = 0
    let smoothY = 0
    let smoothScroll = 0

    const render = () => {
      smoothX += (mouseX - smoothX) * 0.08
      smoothY += (mouseY - smoothY) * 0.08
      smoothScroll += (scrollY - smoothScroll) * 0.1

      setters.forEach((s, i) => {
        const dir = i < 4 ? 1 : -1
        const amp = 8 + i * 5

        s.x(smoothX * amp * dir)
        s.y(smoothScroll + smoothY * amp * dir)
      })
    }

    gsap.ticker.add(render)

    const onMove = e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener("mousemove", onMove)

    return () => {
      window.removeEventListener("mousemove", onMove)
      gsap.ticker.remove(render)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="slogan">
      <div className="slogan-content">
        <p>
          Know your <span className="highlight">limits</span>{" "}
          manage your <span className="highlight">stress</span>{" "}
          and stay mentally <span className="highlight">strong</span>.
        </p>
      </div>

      <div className="floating-container">
       
        <img src={Rock} className="floating rock" alt="" />
        <img src={Bird} className="floating bird1" alt="" />
        <img src={Leaf1} className="floating leaf1" alt="" />

        <img src={Rock2} className="floating rock2" alt="" />
      
        <img src={Bird2} className="floating bird2" alt="" />
        <img src={Leaf2} className="floating leaf2" alt="" />
      </div>
    </section>
  )
}

export default Section2