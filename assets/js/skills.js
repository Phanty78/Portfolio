import { getData } from "./projects.js"

const skillsURL = '/data/skills.json'
const skillsContainer = document.querySelector(".skills")

getData(skillsURL)
    .then(SkillsData => {
        if (SkillsData) {
            SkillsData.forEach(skill => {
                if (skill.isVisible === true) {
                    const skillElement = document.createElement("div")
                    skillElement.classList.add("skills__skill")
                    skillElement.textContent = skill.name
                    skillsContainer.appendChild(skillElement)
                }
            });
        }
    })
    .catch(error => {
        console.error("Error loading skills JSON", error)
    })