import { getData } from './projects.js'

const testimonialsURL = 'data/testimonials.json'
const testimonialsContainer = document.querySelector('.testimonials__container')

let testimonialIndex = 0
let testimonialsData = []
function getRandomTestimonialIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function displayTestimonial(testimonial) {
  testimonialsContainer.innerHTML = ''

  const testimonialCard = document.createElement('div')
  testimonialCard.classList.add('testimonials__card')

  const nameAndPictureContainer = document.createElement('div')
  nameAndPictureContainer.classList.add(
    'testimonials__name-and-picture-container'
  )

  const nameAndProfessionContainer = document.createElement('div')
  nameAndProfessionContainer.classList.add(
    'testimonials__name-and-profession-container'
  )

  const name = document.createElement('h3')
  name.classList.add('testimonials__text')
  name.textContent = testimonial.name

  const profession = document.createElement('h4')
  profession.classList.add('testimonials__text--profession')
  profession.textContent = testimonial.profession

  const picture = document.createElement('img')
  picture.classList.add('testimonials__picture')
  picture.setAttribute('src', testimonial.pictureURL)

  const quote = document.createElement('blockquote')
  quote.classList.add('testimonials__quote')
  quote.textContent = `" ${testimonial.quote} "`

  const link = document.createElement('a')
  link.classList.add('testimonials__link')
  link.textContent = `@ ${testimonial.name}`
  link.setAttribute('href', testimonial.link)
  link.setAttribute('target', '_blank')
  link.setAttribute('rel', 'noopener noreferrer')

  const arrowLeft = document.createElement('img')
  arrowLeft.classList.add('testimonials__arrow')
  arrowLeft.setAttribute('src', './assets/svg/arrow-left.svg')
  arrowLeft.setAttribute('alt', 'Previous Testimonial')
  arrowLeft.addEventListener('click', showPreviousTestimonials)

  const arrowRight = document.createElement('img')
  arrowRight.classList.add('testimonials__arrow')
  arrowRight.setAttribute('src', './assets/svg/arrow-right.svg')
  arrowRight.setAttribute('alt', 'Next Testimonial')
  arrowRight.addEventListener('click', showNextTestimonials)

  nameAndProfessionContainer.appendChild(name)
  nameAndProfessionContainer.appendChild(profession)
  nameAndPictureContainer.appendChild(nameAndProfessionContainer)
  nameAndPictureContainer.appendChild(picture)
  testimonialCard.appendChild(nameAndPictureContainer)
  testimonialCard.appendChild(quote)
  testimonialCard.appendChild(link)

  testimonialsContainer.appendChild(arrowLeft)
  testimonialsContainer.appendChild(testimonialCard)
  testimonialsContainer.appendChild(arrowRight)
}

function showNextTestimonials() {
  if (testimonialIndex < testimonialsData.length - 1) {
    testimonialIndex++
  } else {
    testimonialIndex = 0
  }
  displayTestimonial(testimonialsData[testimonialIndex])
}

function showPreviousTestimonials() {
  if (testimonialIndex > 0) {
    testimonialIndex--
  } else {
    testimonialIndex = testimonialsData.length - 1
  }
  displayTestimonial(testimonialsData[testimonialIndex])
}

getData(testimonialsURL)
  .then((data) => {
    if (data) {
      testimonialsData = data
      testimonialIndex = getRandomTestimonialIndex(0, testimonialsData.length)
      displayTestimonial(testimonialsData[testimonialIndex])
    }
  })
  .catch((error) => {
    console.error('Error loading testimonials JSON', error)
  })
