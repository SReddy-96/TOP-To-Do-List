import { createTask, DeleteTask, EditTask, getTaskById, getTasksProject, toggleCheckedTask } from "./taskHelpers.js";
import { createProject, DeleteProject, GetProjectsTasks, EditProject, completedProject } from "./projectHelpers.js";
import { format } from "date-fns";
import TaskForm from "./TaskForm.js";
import ProjectForm from "./ProjectForm.js";
import TodayPage from "./TodayPage.js";
import ProjectsPage from "./ProjectsPage.js";
import './style.css'
import showTask from "./showTask.js";

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
    
    TodayPage(content);
    toggleCheckedTask();
    deleteTaskInit(content);
    showTaskInit(content);
    todayButton.classList.add('activePage')
    content.className = 'todayContent'

    todayButton.addEventListener('click', function () {
        content.innerHTML = ''; // empty content div
        content.className = 'todayContent'
        TodayPage(content)
        toggleCheckedTask()
        showTaskInit(content)
        deleteTaskInit(content)
        todayButton.classList.add('activePage')
        projectButton.classList.remove('activePage')
    })


    projectButton.addEventListener('click', function () {
        content.innerHTML = ''; // empty content div
        content.className = ''
        ProjectsPage(content)
        ProjectForm(Project);
        projectButton.classList.add('activePage')
        todayButton.classList.remove('activePage')
    })

    // delete icon handler
    function deleteTaskInit(content) {
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
                    DeleteTask(taskId);
                    parentEl.style.display = 'none';
                }, 1000); // delete slowly

            })
        })
    }

    // show Task
    function showTaskInit(content) {
        const cardTitles = document.querySelectorAll('.cardTitle');
        cardTitles.forEach((cardTitle) => {
            cardTitle.addEventListener('click', function () {
                const parentEl = cardTitle.parentElement;
                const taskObject = getTaskById(parentEl.dataset.id);

                showTask(content, taskObject);
            })

        })
    }
})

