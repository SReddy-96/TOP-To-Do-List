import { TodaysTasks } from './taskHelpers.js'

export default function TodayPage(content) {

    // clear the content
    content.innerHTML = '';

    const todayHeader = document.createElement('h2');
    todayHeader.classList.add('pageHeader')
    todayHeader.textContent = 'Today'
    content.append(todayHeader)
    const todaysTasks = TodaysTasks()

    if (typeof (todaysTasks) === 'string') {
        return content.append(todaysTasks);
    }

    for (let i = 0; i < todaysTasks.length; i++) {
        const wrapper = document.createElement('div');
        wrapper.dataset.id = todaysTasks[i].id;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('taskCheckbox');
        const title = document.createElement('p');
        title.classList.add('cardTitle')

        // get priority
        wrapper.classList.add(`priority_${todaysTasks[i].priority}`);

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

        wrapper.append(checkbox, title, deleteIcon);
        wrapper.classList.add('taskCard')

        content.append(wrapper)
    }
}