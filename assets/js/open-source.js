import { getData } from './shared.js'

const openSourceURL = 'data/open-source.json'
const technologiesURL = '/data/technologies.json'

const openSourceProjectsContainer = document.querySelector(
  '.open-source__container'
)

function displayElements(
  openSourceData,
  openSourceProjectsContainer,
  technologiesData
) {
  openSourceData.forEach((openSourceProject) => {
    // Create Card Elements
    const divElement = document.createElement('div')
    divElement.classList.add('open-source__card')
    divElement.setAttribute('id', openSourceProject.id)
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('open-source__card-img-cont')
    const title = document.createElement('h3')
    title.classList.add('open-source__card-title')
    title.textContent = openSourceProject.title

    // Create Image Elements
    const image = document.createElement('img')
    image.classList.add('open-source__card-img')
    image.loading = 'lazy'
    image.src = openSourceProject.image
    image.alt = openSourceProject.title
    imageContainer.appendChild(image)

    //Attach Content
    divElement.appendChild(imageContainer)
    divElement.appendChild(title)
    openSourceProjectsContainer.appendChild(divElement)

    // Create addEventListener
    divElement.addEventListener('click', () => {
      displayModal(divElement.id, openSourceData, technologiesData)
      closeModal()
    })
  })
}

function displayModal(openSourceProjectId, ProjectsData, technologiesData) {
  // Find DOM elements
  const modal = document.querySelector('.modal')
  const modalTitle = document.querySelector('.modal-title')
  const modalDescription = document.querySelector('.modal-description')
  const modalImageContainer = document.querySelector('.modal-image-container')
  const modalContributionDescription = document.querySelector(
    '.modal-body__contributions-description'
  )
  const modalContributionNumber = document.querySelector(
    '.modal-body__contributions-number'
  )
  const modalFooterButtonsContainer = document.querySelector(
    '.modal-footer__buttons'
  )
  const modalFooterThechnologiesContainer = document.querySelector(
    '.modal-footer__thecnologys'
  )

  //Create Image Element
  const modalImage = document.createElement('img')
  modalImage.classList.add('modal-image')
  modalImage.loading = 'lazy'
  modalImageContainer.appendChild(modalImage)

  // Find project data
  const projectId = parseInt(openSourceProjectId)
  const project = ProjectsData.find(
    (openSourceProject) => openSourceProject.id === projectId
  )

  // Attribute simple values
  modalTitle.textContent = project.title
  modalDescription.textContent = project.description
  modalImage.src = project.image
  modalImage.alt = project.title
  modalContributionNumber.textContent =
    project.contributionDescription.length + ' contributions'

  // Attribute contribution description values
  for (let i = 0; i < project.contributionDescription.length; i++) {
    const li = document.createElement('li')
    li.textContent = project.contributionDescription[i]
    modalContributionDescription.appendChild(li)
  }

  //Create Buttons
  if (project['live-link'] !== '') {
    const liveButton = document.createElement('a')
    liveButton.classList.add(
      'btn',
      'btn--med',
      'btn--theme',
      'dynamicBgClr',
      'btn--card-size'
    )
    liveButton.setAttribute('href', project['live-link'])
    liveButton.setAttribute('target', '_blank')
    liveButton.setAttribute('aria-label', 'Link to the project demo')
    liveButton.setAttribute('rel', 'noopener noreferrer')
    liveButton.innerHTML =
      "<i class='fa-solid fa-eye' aria-hidden='true'></i> Live"
    modalFooterButtonsContainer.appendChild(liveButton)
  }
  if (project['source-link'] !== '') {
    const sourceButton = document.createElement('a')
    sourceButton.classList.add(
      'btn',
      'btn--med',
      'btn--theme',
      'dynamicBgClr',
      'btn--card-size'
    )
    sourceButton.setAttribute('href', project['source-link'])
    sourceButton.setAttribute('target', '_blank')
    sourceButton.setAttribute('aria-label', 'Link to the project source code')
    sourceButton.setAttribute('rel', 'noopener noreferrer')
    sourceButton.innerHTML =
      "<i class='fa-brands fa-github' aria-hidden='true'></i> Source"
    modalFooterButtonsContainer.appendChild(sourceButton)
  }

  // Create Technologies list
  modalFooterThechnologiesContainer.classList.add(
    'projects__row-content-technologies-container'
  )
  technologiesData.forEach((techElement) => {
    project.technologies.forEach((projectTechElement) => {
      if (techElement.name === projectTechElement) {
        const iconTechElement = document.createElement('img')
        iconTechElement.classList.add(
          'projects__row-content-technologies-container-icon'
        )
        iconTechElement.setAttribute('src', techElement.iconURL)
        iconTechElement.setAttribute('alt', techElement.alt)
        iconTechElement.setAttribute('loading', 'lazy')
        iconTechElement.setAttribute('aria-hidden', 'true')
        const nameTechElement = document.createElement('p')
        nameTechElement.classList.add(
          'projects__row-content-technologies-container-name'
        )
        nameTechElement.textContent = techElement.name
        modalFooterThechnologiesContainer.appendChild(iconTechElement)
        modalFooterThechnologiesContainer.appendChild(nameTechElement)
      }
    })
  })

  // Display modal
  modal.classList.remove('hidden')
}

function closeModal() {
  const closeModalButton = document.querySelector('.close-modal-button')
  closeModalButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal')
    ResetModal()
    modal.classList.add('hidden')
  })
}

function ResetModal() {
  const modalTitle = document.querySelector('.modal-title')
  const modalDescription = document.querySelector('.modal-description')
  const modalImageContainer = document.querySelector('.modal-image-container')
  const modalContributionDescription = document.querySelector(
    '.modal-body__contributions-description'
  )
  const modalContributionNumber = document.querySelector(
    '.modal-body__contributions-number'
  )
  const modalFooterButtonsContainer = document.querySelector(
    '.modal-footer__buttons'
  )
  const modalFooterThechnologiesContainer = document.querySelector(
    '.modal-footer__thecnologys'
  )

  // Reset modal content
  modalTitle.textContent = ''
  modalDescription.textContent = ''
  modalImageContainer.innerHTML = ''
  modalContributionDescription.innerHTML = ''
  modalContributionNumber.textContent = ''
  modalFooterButtonsContainer.innerHTML = ''
  modalFooterThechnologiesContainer.innerHTML = ''
}

getData(openSourceURL)
  .then((openSourceData) => {
    if (openSourceData) {
      getData(technologiesURL).then((technologiesData) => {
        if (technologiesData) {
          displayElements(
            openSourceData,
            openSourceProjectsContainer,
            technologiesData
          )
        }
      })
    }
  })
  .catch((error) => {
    console.error('Error loading open source JSON', error)
  })
