import { TodaysTasks } from './taskHelpers.js'

export default function TodayPage(Task, content) {
    const todayHeader = document.createElement('h2');
    todayHeader.classList.add('pageHeader')
    todayHeader.textContent = 'Today'
    content.append(todayHeader)
    const todaysTasks = TodaysTasks()

    if (typeof (todaysTasks) === 'string') {
        content.append(todaysTasks);
    }

    for (let i = 0; i < todaysTasks.length; i++) {
        const wrapper = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('taskCheckbox');
        checkbox.dataset.id = todaysTasks[i].id;
        const title = document.createElement('p');

        // get priority
        wrapper.classList.add(`priority_${todaysTasks[i].priority}`);

        // add editIcon
        const editIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        editIcon.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"); //Set path's data
        editIcon.appendChild(newElement);
        editIcon.classList.add('editIcon');


        // add deleteButton
        const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteIcon.setAttribute('viewBox', '0 0 24 24');
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"); //Set path's data
        deleteIcon.appendChild(newElement);
        deleteIcon.classList.add('deleteIcon')

        title.textContent = todaysTasks[i].title;

        // write condition to check if the task is completed
        if (todaysTasks[i].completed === true) {
            title.classList.add('checkedTitle');
            checkbox.checked = true;
        }

        wrapper.append(checkbox, title, editIcon, deleteIcon);
        wrapper.classList.add('taskCard')

        content.append(wrapper)
    }
}