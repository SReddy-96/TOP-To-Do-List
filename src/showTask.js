import TaskForm from './TaskForm.js';
import { getTasksProject } from './taskHelpers.js';
import { getTaskById } from './taskHelpers.js';;

export default function showTask(content, taskObject) {

    content.innerHTML = '';
    content.className = 'showTask'

    if (taskObject === '') {
        return "Task Object Empty"
    }

    const wrapper = document.createElement('div');
    const footer = document.createElement('div');
    const main = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const priority = document.createElement('p');
    const dueDate = document.createElement('p');
    const project = document.createElement('p');
    const notes = document.createElement('p');
    const createdDate = document.createElement('p');
    const editButton = document.createElement('button');

    const tasksProject = getTasksProject(taskObject);

    // footer
    editButton.classList.add('success-button', 'editButton', 'form-button')
    editButton.textContent = "Edit"
    editButton.dataset.id = taskObject.id;

    createdDate.textContent = `Created on: ${taskObject.createdDate}`;
    createdDate.classList.add('showTaskCreatedDate');

    footer.append(createdDate, editButton);
    footer.classList.add('showTaskFooter');


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

    // header
    const completedIcon = taskObject.completed ? checkedIcon : uncheckedIcon; // ternary operator to see if completed or not;
    title.textContent = `${taskObject.title}`;
    header.append(completedIcon, title)
    header.classList.add('showTaskHeader');

    // main
    description.textContent = `${taskObject.description}`;
    priority.innerHTML = `<b>Priority:</b> ${taskObject.priority}`;
    dueDate.innerHTML = `<b>Task Completed by:</b> ${taskObject.dueDate}`;
    project.innerHTML = `<b>Project:</b> ${tasksProject.title}`;
    notes.innerHTML = `<b>Notes:</b> ${taskObject.notes}`;

    main.append(description, priority, project, dueDate, notes,)
    main.classList.add('showTaskMain')

    // card
    wrapper.append(header, main, footer);
    wrapper.classList.add('showTaskWrapper');
    content.append(wrapper);

    editButton.addEventListener('click', function () {
        const dialog = document.getElementById('taskFormDialog');
        console.log(this.dataset.id)
        const taskObject = getTaskById(this.dataset.id)
        dialog.showModal();
        TaskForm(taskObject)
    })

}