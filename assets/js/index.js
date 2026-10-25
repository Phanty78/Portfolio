// Menu mobile + logo cliquable
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

function toggleMenu() {
  const isOpen = smallMenu.classList.toggle('header__sm-menu--active')
  headerHamMenuBtn.classList.toggle('d-none', isOpen)
  headerHamMenuCloseBtn.classList.toggle('d-none', !isOpen)
  hamMenuBtn.setAttribute('aria-expanded', String(isOpen))
}

hamMenuBtn.addEventListener('click', toggleMenu)
hamMenuBtn.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleMenu()
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
    hamMenuBtn.setAttribute('aria-expanded', 'false')
  })
}

const headerLogoContainer = document.querySelector('.header__logo-container')

headerLogoContainer.addEventListener('click', () => {
  location.href = 'index.html'
})
headerLogoContainer.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    location.href = 'index.html'
  }
})
