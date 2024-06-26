import { TodaysTasks } from './taskHelpers.js'

export default function TodayPage(content) {
    content.textContent = "Today"
    const todaysTasks = TodaysTasks()

    if(typeof(todaysTasks) === 'string'){
        content.append(todaysTasks);
    }

    for (let i = 0; i < todaysTasks.length; i++) {
        const wrapper = document.createElement('div');
        const title = document.createElement('h3');
        const dueDate = document.createElement('p');

        title.textContent = todaysTasks[i].title;
        dueDate.textContent = todaysTasks[i].dueDate;

        wrapper.append(title, dueDate);
        
        content.append(wrapper)
    }
}