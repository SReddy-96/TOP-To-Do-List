import { TodaysTasks, DeleteTask, toggleCheckedTask, getTaskById } from './taskHelpers.js';
import showTask from './showTask.js';
import { GetProjectsTasks, getProjectById, DeleteAllProjectsTasks } from './projectHelpers.js';
import { format } from 'date-fns';
import { DeleteProject } from './projectHelpers.js';
import ProjectsPage from './ProjectsPage.js';
import ProjectForm from './ProjectForm.js';

export default function TaskPage(content, pageHeading) {

    // clear the content
    content.innerHTML = '';
    let pageTasks = ''

    const TaskPageHeader = document.createElement('div');
    const pageTitle = document.createElement('h2');
    const pageDescription = document.createElement('p');

    // check if param is empty
    if (pageHeading === '') {
        return console.error('No page requirement inputted')
    }

    // check if today page then run func
    if (pageHeading === 'Today') {
        pageTasks = TodaysTasks();
        TaskPageHeader.classList.add('pageHeaderToday')

        pageTitle.textContent = pageHeading;
        pageDescription.textContent = format(new Date(), 'PPPP')

        TaskPageHeader.append(pageTitle, pageDescription)
    } else {
        const project = getProjectById(pageHeading);
        pageTitle.textContent = project.title;
        pageTasks = GetProjectsTasks(project);

        //  add description and edit and delete buttons
        TaskPageHeader.classList.add('pageHeader');

        pageDescription.textContent = project.description;

        // add deleteButton
        const DeleteIconPage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        DeleteIconPage.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"); //Set path's data
        DeleteIconPage.appendChild(newElement);
        DeleteIconPage.classList.add('DeleteIconPage');

        // add edit Button
        const EditIconPage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        EditIconPage.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2"); //Set path's data
        EditIconPage.appendChild(newElement);
        EditIconPage.classList.add('EditIconPage');

        // event listeners
        DeleteIconPage.addEventListener('click', function () {
            DeleteAllProjectsTasks(project);
            DeleteProject(project);
            ProjectsPage(content)
        })

        EditIconPage.addEventListener('click', function(){
            const dialog = document.getElementById('projectFormDialog');
            dialog.showModal();
            ProjectForm(project);
        })


        TaskPageHeader.append(pageTitle, EditIconPage, DeleteIconPage, pageDescription)
    }

    content.append(TaskPageHeader)

    // check if pageTasks has any tasks
    if (typeof (pageTasks) === 'string') {
        return content.append(pageTasks);
    }

    for (let i = 0; i < pageTasks.length; i++) {
        const wrapper = document.createElement('div');
        wrapper.dataset.id = pageTasks[i].id;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('taskCheckbox');
        checkbox.name = 'taskCheckBox'
        const title = document.createElement('p');
        title.classList.add('cardTitle')

        // get priority
        wrapper.classList.add(`priority_${pageTasks[i].priority}`);

        title.textContent = pageTasks[i].title;


        // add deleteButton
        const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteIcon.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"); //Set path's data
        deleteIcon.appendChild(newElement);
        deleteIcon.classList.add('deleteIcon')

        // write condition to check if the task is completed
        if (pageTasks[i].completed === true) {
            title.classList.add('checkedTitle');
            checkbox.checked = true;
        }

        wrapper.append(checkbox, title, deleteIcon);
        wrapper.classList.add('taskCard')

        content.append(wrapper)
    }

    // delete icon handler

    const deleteTasks = document.querySelectorAll('.deleteIcon');
    deleteTasks.forEach((deleteTask) => {
        deleteTask.addEventListener('click', function () {
            const parentEl = deleteTask.parentElement;
            const taskId = getTaskById(parentEl.dataset.id);

            if (!taskId) {
                console.error(taskId)
            }
            parentEl.style.opacity = '0';
            setTimeout(() => {
                DeleteTask(taskId)
                parentEl.style.display = 'none';
            }, 1000); // delete slowly

        })
    })


    // show Task
    const cardTitles = document.querySelectorAll('.cardTitle');
    cardTitles.forEach((cardTitle) => {
        cardTitle.addEventListener('click', function () {
            const parentEl = cardTitle.parentElement;
            const taskObject = getTaskById(parentEl.dataset.id);

            showTask(content, taskObject);
        })

    })

    // Show which tasks are completed
    toggleCheckedTask()

}