import {
  createFilters,
  displayElements,
  getData,
  toggleActiveFilter,
} from './shared.js'

const skillsURL = 'data/skills.json'
const skillsContainer = document.querySelector('.skills')
const skillsFilterContainer = document.getElementById(
  'skills__filters__container'
)
const filtersArray = ['Tout', 'Web', 'Back', 'Système', 'Outils']
let filterTag = 'Tout'
const fileName = 'skills'

getData(skillsURL)
  .then((SkillsData) => {
    if (SkillsData) {
      SkillsData.forEach((skill) => {
        displayElements(skill, skillsContainer)
      })
      createFilters(filtersArray, skillsFilterContainer)
      const filters = document.querySelectorAll(
        '#skills__filters__container .filter'
      )
      toggleActiveFilter(
        filters,
        SkillsData,
        filterTag,
        skillsContainer,
        fileName
      )
    }
  })
  .catch((error) => {
    console.error('Error loading skills JSON', error)
  })
