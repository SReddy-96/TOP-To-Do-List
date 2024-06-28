import { completedProjects, GetProjectsTasks } from "./projectHelpers";
import ProjectForm from "./ProjectForm.js";

export default function ProjectsPage(content, ProjectClass) {
    
    // clear page 
    content.innerHTML = ''    
    
    const title = document.createElement('h2');
    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'showProjectForm';
    addProjectButton.textContent = 'Add Project'
    title.textContent = 'Projects';
    content.append(title, addProjectButton);

    // update completed projects
    completedProjects()

    const projects = JSON.parse(localStorage.getItem('Projects'));

    // adding project cards
    projects.map((project) => {
        const wrapper = document.createElement('div');
        wrapper.dataset.id = project.id;
        wrapper.classList.add('taskCard');
        const title = document.createElement('p');
        title.classList.add('ProjectCardTitle');
        title.textContent = project.title;
        const completedIconCell = document.createElement('div');

        // add unchecked
        const uncheckedIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        uncheckedIcon.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"); //Set path's data
        uncheckedIcon.appendChild(newElement);
        uncheckedIcon.classList.add('uncheckedIcon');

        // add checked box
        const checkedIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkedIcon.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"); //Set path's data
        checkedIcon.appendChild(newElement);
        checkedIcon.classList.add('checkedIcon');

        const completedIcon = project.completed ? checkedIcon : uncheckedIcon;
        completedIconCell.append(completedIcon);

        const taskCounter = document.createElement('div');

        if (project.completed === false) {
            taskCounter.classList.add('taskCounter')
            const projectTasks = GetProjectsTasks(project);
            let counter = 0;
            projectTasks.map((task) => {
                if (task.completed === false) {
                    counter++;
                }
            })
            taskCounter.textContent = counter;
        } else{
            taskCounter.classList.add('projectCompleted');
        }
        
        wrapper.append(completedIconCell, title, taskCounter);

        content.append(wrapper);
    })
    
    // handle opening the dialog
    const showBtn = document.getElementById("showProjectForm");
    showBtn.addEventListener("click", () => {
        ProjectForm(ProjectClass)
    });

}