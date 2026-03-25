import React from 'react'
import Ingredients1 from '../../assets/images/ingredients1.avif'
import Ingredients2 from '../../assets/images/ingredients2.avif'
import Ingredients3 from '../../assets/images/ingredients3.avif'
import '../../styles/Section4Style.css'

const Section4 = () => {
  return (
    <section className="ingredients_section">
        <div className="ingredients_heading">
            <h1 className="mb-4">OUR INGREDIENTS</h1>
        </div>
        <div className="ingredients_grid">
            <div className="ingredients_item">

            <img src={Ingredients1} alt="Ingredient 1" />
            </div>
            <div className="ingredients_item">

            <img src={Ingredients2} alt="Ingredient 2" />
            </div>
            <div className="ingredients_item">

            <img src={Ingredients3} alt="Ingredient 3" />
            </div>
            
        </div>
        <div className="ingredients_text">
            <p>Our ingredients are carefully selected from reputable suppliers. Each ingredient is fresh, natural, and of high quality. </p>
        </div>
    </section>
  )
}

export default Section4