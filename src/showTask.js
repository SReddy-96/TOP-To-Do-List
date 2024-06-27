import { getTasksProject } from './taskHelpers.js';

export default function showTask(content, taskObject) {

    content.innerHTML = '';
    content.className = 'showTask'

    if (taskObject === '') {
        return "Task Object Empty"
    }

    const wrapper = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const priority = document.createElement('p');
    const dueDate = document.createElement('p');
    const project = document.createElement('p');
    const notes = document.createElement('p');
    const createdDate = document.createElement('p');
    const completed = document.createElement('p');

    const tasksProject = getTasksProject(taskObject);
    
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
    
    const completedIcon = taskObject.completed ? checkedIcon : uncheckedIcon; // ternary operator to see if completed or not;
    title.textContent = `${taskObject.title}`;
    header.append(completedIcon, title)
    header.classList.add('showTaskHeader');
    
    description.textContent = `${taskObject.description}`;
    priority.textContent = `Priority: ${taskObject.priority}`;
    dueDate.textContent = `Task Completed by: ${taskObject.dueDate}`;
    project.textContent = `Project: ${tasksProject.title}`;
    notes.textContent = `Notes: ${taskObject.notes}`;
    createdDate.textContent = `Task Created on: ${taskObject.createdDate}`;

    wrapper.append(header, description, priority, project, dueDate, createdDate, notes);
    content.append(wrapper);

}