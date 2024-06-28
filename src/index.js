import { createTask} from "./taskHelpers.js";
import { createProject} from "./projectHelpers.js";
import { format } from "date-fns";
import TaskForm from "./TaskForm.js";
import TaskPage from "./TaskPage.js";
import ProjectsPage from "./ProjectsPage.js";
import './style.css'

// Task class
class Task {
    constructor(title, description, priority, dueDate, project, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
        this.notes = notes;
        this.createdDate = format(new Date, 'yyyy-MM-dd');
        this.completed = false;

        this.createTaskMethod()
    }

    createTaskMethod() {
        return createTask(this)
    }
}

// project class
class Project {
    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.createdDate = format(new Date, 'yyyy-MM-dd');
        this.completed = false;

        this.createProjectMethod();
    }

    createProjectMethod() {
        return createProject(this);
    }
}

const priorities = ['Urgent', 'Important', 'Low Priority'];

// run script for mock data
if (window.localStorage.length === 0) {
    const DefaultProject = new Project('Default Project', 'This is a mock project to add your tasks too')
    const MockTask = new Task('Mock Task', 'This is a mock Task', 'Important', '2024-06-26', DefaultProject.id, '6')
}

document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');

    const todayButton = document.getElementById('today');
    const projectButton = document.getElementById('project');

    TaskPage(content, 'Today');
    todayButton.classList.add('activePage')
    content.className = 'TaskContent'

    todayButton.addEventListener('click', function () {
        content.innerHTML = ''; // empty content div
        content.className = 'TaskContent'
        TaskPage(content, 'Today')
        todayButton.classList.add('activePage')
        projectButton.classList.remove('activePage')
    })


    projectButton.addEventListener('click', function () {
        content.innerHTML = ''; // empty content div
        content.className = 'ProjectList'
        ProjectsPage(content, Project)
        projectButton.classList.add('activePage')
        todayButton.classList.remove('activePage')
    })


    // open dialog forms for task and project
    const addTaskButton = document.getElementById("showTaskForm");
    addTaskButton.addEventListener('click', function () {
        TaskForm(Task);
    })

})

