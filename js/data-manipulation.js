
const whatIDoDataPath = '../data/whatIDoData.json'
const projectsDataPath = '../data/projectsData.json'

const WhatIDoData = fetchData(whatIDoDataPath)
const projectsData = fetchData(projectsDataPath)

const whatIDoElement = document.querySelector(".what-i-do")

const WhatIDoSelected = [1,2,3]

// Function to fetch Json 
function fetchData(path) {
    return fetch(path)
        .then(response => response.json())
        .catch(error => console.error('Error loading the JSON file:', error))
}

// Function for display whatIDo Elements
function addWhatIDo(data, selector ) {
    console.log(data)
    for (let i = 0; i < selector.length; i++) {
        const containerElement = document.createElement("div")
        const mediaElement = document.createElement("div")
        const mediaObjectElement = document.createElement("div")
        const iconElement = document.createElement("i")
        const mediaBodyElement = document.createElement("div")
        const h3Element = document.createElement("h3")
        const pElement = document.createElement("p")
        containerElement.classList.add("col-md-4", "col-xs-11", "wow", "fadeInUp")
        mediaElement.classList.add("media")
        mediaObjectElement.classList.add("media-object", "media-left")
        if (data[i].icon) {
            const iconClasses = data[i].icon.split(" ")
            iconElement.classList.add(...iconClasses)
        }
        mediaBodyElement.classList.add("media-body")
        h3Element.classList.add("media-heading")
        h3Element.textContent = data[i].title
        pElement.textContent = data[i].text
        mediaObjectElement.appendChild(iconElement)
        mediaBodyElement.appendChild(h3Element)
        mediaBodyElement.appendChild(pElement)
        mediaElement.appendChild(mediaObjectElement)
        mediaElement.appendChild(mediaBodyElement)
        containerElement.appendChild(mediaElement)
        whatIDoElement.appendChild(containerElement)
    }
}

fetchData(whatIDoDataPath).then(data => addWhatIDo(data, WhatIDoSelected))

