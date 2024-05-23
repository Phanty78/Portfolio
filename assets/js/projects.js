const projectsURL = '/data/projects.json'
const technologiesURL = '/data/technologies.json'

const projectsContent = document.querySelector(".projects__content")

export async function getData(url){
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    catch(error){
        console.error("Error loading JSON", error)
        return null
    }
}

function createProject(projectsData, thecData) {
    projectsData.forEach(project => {
        if (project.isVisible){

            // Crate Main containers
            const projectRowElement = document.createElement("div")
            projectRowElement.classList.add("projects__row")
            const informationContainer = document.createElement("div")
            informationContainer.classList.add("projects__row-content")
            const imageContainer = document.createElement("div")
            imageContainer.classList.add("projects__row-img-cont")

            // Create Title and Description
            const title = document.createElement("h3")
            title.classList.add("projects__row-content-title")
            title.textContent = project.title
            const description = document.createElement("p")
            description.classList.add("projects__row-content-desc")
            description.innerHTML = project.description

            // Create Technologies list
            let techElementsContainer = document.createElement("div")
            techElementsContainer.classList.add("projects__row-content-technologies-container")
            thecData.forEach(techElement => {
                project.technologies.forEach(projectTechElement => {
                    if (techElement.name === projectTechElement ) {
                        const iconTechElement = document.createElement("img")
                        iconTechElement.classList.add("projects__row-content-technologies-container-icon")
                        iconTechElement.setAttribute("src", techElement.iconURL)
                        iconTechElement.setAttribute("alt", techElement.alt)
                        iconTechElement.setAttribute("loading", "lazy")
                        iconTechElement.setAttribute("aria-hidden", "true")
                        const nameTechElement = document.createElement("p")
                        nameTechElement.classList.add("projects__row-content-technologies-container-name")
                        nameTechElement.textContent = techElement.name
                        techElementsContainer.appendChild(iconTechElement)
                        techElementsContainer.appendChild(nameTechElement)
                    }
                })
            })

            // Create Button
            const buttonContainer = document.createElement("div")
            buttonContainer.classList.add("projects__row-content-button-container")
            if (project["live-link"]!== "") {
                const liveButton = document.createElement("a")
                liveButton.classList.add("btn", "btn--med", "btn--theme", "dynamicBgClr", "btn--card-size")
                liveButton.setAttribute("href", project["live-link"])
                liveButton.setAttribute("target", "_blank")
                liveButton.setAttribute("aria-label", "Link to the project demo")
                liveButton.setAttribute("rel", "noopener noreferrer")
                liveButton.innerHTML = "<i class='fa-solid fa-eye' aria-hidden='true'></i> Live"
                buttonContainer.appendChild(liveButton)
            }
            if (project["source-link"] !== "") {
                const sourceButton = document.createElement("a")
                sourceButton.classList.add("btn", "btn--med", "btn--theme", "dynamicBgClr", "btn--card-size")
                sourceButton.setAttribute("href", project["source-link"])
                sourceButton.setAttribute("target", "_blank")
                sourceButton.setAttribute("aria-label", "Link to the project source code")
                sourceButton.setAttribute("rel", "noopener noreferrer")
                sourceButton.innerHTML = "<i class='fa-brands fa-github' aria-hidden='true'></i> Source"
                buttonContainer.appendChild(sourceButton)
            }

            // Create Image
            const image = document.createElement("img")
            image.setAttribute("src", project.imageURL)
            image.setAttribute("alt", project.title)
            image.setAttribute("loading", "lazy")
            image.classList.add("projects__row-img")
            imageContainer.appendChild(image)
        

            // Attach content
            informationContainer.appendChild(title)
            informationContainer.appendChild(description)
            informationContainer.appendChild(techElementsContainer)
            informationContainer.appendChild(buttonContainer)
            projectRowElement.appendChild(informationContainer)
            projectRowElement.appendChild(imageContainer)
            projectsContent.appendChild(projectRowElement)
        }
    })
}

getData(projectsURL)
    .then(projectsData => {
        if (projectsData) {
            getData(technologiesURL)
                .then(technologiesData => {
                    if (technologiesData) {
                        createProject(projectsData, technologiesData)
                    } else {
                        console.error("Failed to load technologies data")
                    }
                })
                .catch(error => {
                    console.error("Error loading technologies JSON", error)
                })
        } else {
            console.error("Failed to load project data")
        }
    })
    .catch(error => {
        console.error("Error loading projects JSON", error)
    })
