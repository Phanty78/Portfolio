import { getData } from "./projects.js"

const testimonialsURL = 'data/testimonials.json'
const testimonialsContainer = document.querySelector(".testimonials__container")

function createRating(rating, container) {
    if (rating) {
        for (let i = 0; i < 5; i++) {
            const star = document.createElement("img")
            star.classList.add("testimonials__star")
            if (rating > 0) {
                star.setAttribute("src","assets/svg/star-solid.svg")
                rating--
            }else{
                star.setAttribute("src","assets/svg/star-regular.svg")
            }
            container.appendChild(star)
        }
    }
}

getData(testimonialsURL)
    .then(testimonialsData => {
        if (testimonialsData) {
            const displayedElements = testimonialsData.slice(-3) // A modifier par un slider
            displayedElements.forEach(testimonial => {
                const testimonialCard = document.createElement("div")
                testimonialCard.classList.add("testimonials__card")
                const nameAndPictureContainer = document.createElement("div")
                nameAndPictureContainer.classList.add("testimonials__name-and-picture-container")
                const name = document.createElement("h3")
                name.classList.add("testimonials__text")
                name.textContent = testimonial.name
                const picture = document.createElement("img")
                picture.classList.add("testimonials__picture")
                picture.setAttribute("src", testimonial.pictureURL)
                const quote = document.createElement("blockquote")
                quote.classList.add("testimonials__quote")
                quote.textContent = `" ${testimonial.quote} "`
                const ratingContainer = document.createElement("div")
                createRating(testimonial.rating, ratingContainer)
                ratingContainer.classList.add("testimonials__rating-container")
                nameAndPictureContainer.appendChild(name)
                nameAndPictureContainer.appendChild(picture)
                testimonialCard.appendChild(nameAndPictureContainer)
                testimonialCard.appendChild(quote)
                testimonialCard.appendChild(ratingContainer)
                testimonialsContainer.appendChild(testimonialCard)
            })
        }
    })
    .catch(error => {
        console.error("Error loading testimonials JSON", error)
    })
  