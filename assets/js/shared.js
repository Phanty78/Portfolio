import { createProject } from './projects.js'

export async function getData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading JSON', error)
    return null
  }
}

export function createFilters(filtersArray, filtersContainer) {
  filtersArray.forEach((filter) => {
    const filterElement = document.createElement('p')
    filterElement.classList.add('filter')
    if (filter === 'All') {
      filterElement.classList.add('filter--active')
    }
    filterElement.textContent = filter
    filtersContainer.appendChild(filterElement)
  })
}

export function toggleActiveFilter(
  filters,
  Data,
  filterTag,
  filteredElementsContainer,
  fileName,
  thecData
) {
  filters.forEach((filter) => {
    filter.addEventListener('click', (e) => {
      filters.forEach((filter) => {
        filter.classList.remove('filter--active')
      })
      e.target.classList.add('filter--active')
      filterTag = e.target.textContent
      UpdateElements(
        Data,
        filteredElementsContainer,
        filterTag,
        fileName,
        thecData
      )
    })
  })
}

export function UpdateElements(
  Data,
  filteredElementsContainer,
  filterTag,
  fileName,
  thecData
) {
  filteredElementsContainer.innerHTML = ''
  if (fileName === 'skills') {
    Data.forEach((filteredElement) => {
      if (filterTag === 'All') {
        if (filteredElement.isVisible === true) {
          displayElements(filteredElement, filteredElementsContainer)
        }
      } else {
        if (
          filteredElement.isVisible === true &&
          filteredElement.type.includes(filterTag)
        ) {
          displayElements(filteredElement, filteredElementsContainer)
        }
      }
    })
  } else if (fileName === 'projects') {
    if (filterTag === 'All') {
      createProject(Data, thecData)
    } else {
      const filteredProjects = Data.filter((project) =>
        project.type.includes(filterTag)
      )
      createProject(filteredProjects, thecData)
    }
  }
}

export function displayElements(element, filteredElementsContainer) {
  const divElement = document.createElement('div')
  divElement.classList.add('skills__skill')
  divElement.textContent = element.name
  filteredElementsContainer.appendChild(divElement)
}
