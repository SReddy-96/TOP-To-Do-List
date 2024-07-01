import { TodaysTasks, DeleteTask, toggleCheckedTask, getTaskById } from './taskHelpers.js';
import showTask from './showTask.js';
import { GetProjectsTasks, getProjectById } from './projectHelpers.js';

export default function TaskPage(content, pageHeading) {

    // clear the content
    content.innerHTML = '';
    let pageTasks = ''

    // check if param is empty
    if (pageHeading === '') {
        return console.error('No page requirement inputted')
    }

    // check if today page then run func
    if (pageHeading === 'Today') {
        pageTasks = TodaysTasks();
    } else {
        const project = getProjectById(pageHeading);
        pageHeading = project.title;
        pageTasks = GetProjectsTasks(project);
    }

    const todayHeader = document.createElement('h2');
    todayHeader.classList.add('pageHeader')
    todayHeader.textContent = pageHeading;
    content.append(todayHeader)

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

        // add deleteButton
        const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteIcon.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"); //Set path's data
        deleteIcon.appendChild(newElement);
        deleteIcon.classList.add('deleteIcon')

        title.textContent = pageTasks[i].title;

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