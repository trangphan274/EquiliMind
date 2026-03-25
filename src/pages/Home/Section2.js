import { useEffect } from "react"
import "../../styles/Section2Style.css"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Chili from "../../assets/images/chili.avif"
import Alecrim from "../../assets/images/Alecrim.avif"
import Espaguetti from "../../assets/images/Espaguetti.avif"
import Tomato from "../../assets/images/Tomato.avif"
import Green from "../../assets/images/green.avif"
import Purple from "../../assets/images/purple_leaf.avif"
import Ervas from "../../assets/images/Ervas.avif"

gsap.registerPlugin(ScrollTrigger)

const Section2 = () => {
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  const veggies = gsap.utils.toArray(".veggie")

  const setters = veggies.map(el => ({
    x: gsap.quickSetter(el, "x", "px"),
    y: gsap.quickSetter(el, "y", "px"),
  }))

  let mouseX = 0
  let mouseY = 0
  let scrollY = 0

  // SCROLL parallax (base)
  veggies.forEach((el, i) => {
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

  // MOUSE follow (additive)
let smoothX = 0
let smoothY = 0
let smoothScroll = 0

const render = () => {
  smoothX += (mouseX - smoothX) * 0.08
  smoothY += (mouseY - smoothY) * 0.08
  smoothScroll += (scrollY - smoothScroll) * 0.1

  setters.forEach((s, i) => {
    const dir = i < 3 ? 1 : -1
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
          <span className="highlight">Authentic</span> and{" "}
          <span className="highlight">delicious</span> flavor made with{" "}
          <span className="highlight">love</span> and tradition.
        </p>
      </div>

      <div className="veggies">
        <img src={Chili} className="veggie chili" alt="" />
        <img src={Alecrim} className="veggie alecrim" alt="" />
        <img src={Espaguetti} className="veggie espaguetti" alt="" />
        <img src={Tomato} className="veggie tomato" alt="" />
        <img src={Green} className="veggie green" alt="" />
        <img src={Purple} className="veggie purple_leaf" alt="" />
        <img src={Ervas} className="veggie ervas" alt="" />
      </div>
    </section>
  )
}

export default Section2
