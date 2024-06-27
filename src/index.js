import { createTask, DeleteTask, EditTask, getTaskById, getTasksProject } from "./taskHelpers.js";
import { createProject, DeleteProject, GetProjectsTasks, EditProject, completedProject } from "./projectHelpers.js";
import { format } from "date-fns";
import TaskForm from "./TaskForm.js";
import ProjectForm from "./ProjectForm.js";
import TodayPage from "./TodayPage.js";
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

    DeleteTaskMethod() {
        return DeleteTask(this)
    }

    getProject() {
        return getTasksProject(this)
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

    DeleteProjectMethod() {
        return DeleteProject(this);
    }

    getTasks() {
        return GetProjectsTasks(this);
    }

    editProjectMethod(editedProjectObject) {
        return EditProject(this, editedProjectObject);
    }

    isProjectCompleted() {
        return completedProject(this);
    }
}

const priorities = ['Urgent', 'Important', 'Low Priority'];

// run script for mock data
if (window.localStorage.length === 0) {
    const DefaultProject = new Project('Default Project', 'This is a mock project to add your tasks too')
    const MockTask = new Task('Mock Task', 'This is a mock Task', 'Important', '2024-06-26', DefaultProject.id, '6')
}

// dialog forms for task anf project
TaskForm(Task);

document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');

    const todayButton = document.getElementById('today');
    const projectButton = document.getElementById('project');

    TodayPage(Task, content)
    todayButton.classList.add('activePage')
    content.className = ''

    todayButton.addEventListener('click', function () {
        content.innerHTML = ''; // empty content div
        content.className = ''
        TodayPage(Task, content)
        todayButton.classList.add('activePage')
        projectButton.classList.remove('activePage')
    })


    projectButton.addEventListener('click', function () {
        content.innerHTML = ''; // empty content div
        content.className = ''
        ProjectsPage(Task, content)
        ProjectForm(Project);
        projectButton.classList.add('activePage')
        todayButton.classList.remove('activePage')
    })

    // eventlistener to change complete and line through 
    const taskCheckboxes = document.querySelectorAll('.taskCheckbox')
    taskCheckboxes.forEach((taskCheckbox) => {
        taskCheckbox.addEventListener('change', () => {
            const taskId = getTaskById(taskCheckbox.dataset.id)

            // get title of task
            const taskCard = taskCheckbox.parentElement;
            const taskTitle = taskCard.children[1]
            
            if (!taskId) {
                console.error(taskId)
            }
            if (taskId.completed === true) {
                taskTitle.classList.remove('checkedTitle');
                EditTask(taskId, { completed: false });
            } else {
                taskTitle.classList.add('checkedTitle');
                EditTask(taskId, { completed: true });
            }
        })

    })



})




