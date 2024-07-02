import { createTask, EditTask, getTaskById } from "./taskHelpers.js";
import { createProject,ProjectSelection, EditProject, getProjectById } from "./projectHelpers.js";
import { format } from "date-fns";
import TaskForm from "./TaskForm.js";
import TaskPage from "./TaskPage.js";
import ProjectsPage from "./ProjectsPage.js";
import ProjectForm from "./ProjectForm.js";
import showTask from "./showTask.js";
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

// run script for mock data
if (window.localStorage.length === 0) {
    const DefaultProject = new Project('Default Project', 'This is a mock project to add your tasks too')
    const MockTask = new Task('Search SReddy-96 on Github', 'https://github.com/SReddy-96', 'Urgent', format(new Date, 'yyyy-MM-dd'), DefaultProject.id, 'Notes');
    const MockTask1 = new Task("Check out Steven's Portfolio", 'https://steven-reddy.netlify.app/', 'Important', format(new Date, 'yyyy-MM-dd'), DefaultProject.id, 'Notes')
    const MockTask2 = new Task("Connect with Steven on LinkedIn", 'https://www.linkedin.com/in/steven-reddy-912b0b299/', 'Urgent', format(new Date, 'yyyy-MM-dd'), DefaultProject.id, 'Notes')
    const MockTask3 = new Task("Follow Steven on X", 'https://x.com/SReddy_96', 'LowPriority', format(new Date, 'yyyy-MM-dd'), DefaultProject.id, 'Notes')

}

document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');
    const todayButton = document.getElementById('today');
    const projectButton = document.getElementById('project');

    // first load of app
    TaskPage(content, 'Today');
    todayButton.classList.add('activePage')
    content.className = 'TaskContent'

    // initialize the project form and task form
    ProjectForm(Project)
    TaskForm();

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
    const dialog = document.getElementById('taskFormDialog');
    const closeBtn = document.getElementById("closeTaskForm");
    const addTaskButton = document.getElementById("showTaskForm");

    addTaskButton.addEventListener('click', function () {
        TaskForm();
        dialog.showModal();
    })

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });



    // set the event listeners for the task form
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault()

        const action = document.activeElement.value;

        if (action === 'Add Task') {
            const taskTitle = document.getElementById('taskTitle').value;
            const taskDescription = document.getElementById('taskDescription').value;
            const taskPriority = document.getElementById('taskPriority').value;
            const taskDueDate = document.getElementById('taskDueDate').value;
            const taskProjectSelect = document.getElementById('taskProjectSelect').value;
            const taskNotes = document.getElementById('taskNotes').value;

            // create new task with class
            new Task(taskTitle, taskDescription, taskPriority, taskDueDate, taskProjectSelect, taskNotes)

            const content = document.getElementById('content');
            content.innerHTML = ''; // empty content div
            content.className = 'TaskContent'
            TaskPage(content, 'Today')
            todayButton.classList.add('activePage')
            projectButton.classList.remove('activePage')
            dialog.close()

        }

        else if (action === 'Edit Task') {

            const taskTitle = document.getElementById('taskTitle').value;
            const taskDescription = document.getElementById('taskDescription').value;
            const taskPriority = document.getElementById('taskPriority').value;
            const taskDueDate = document.getElementById('taskDueDate').value;
            const taskProjectSelect = document.getElementById('taskProjectSelect').value;
            const taskNotes = document.getElementById('taskNotes').value;
            const taskId = document.getElementById('taskId').dataset.current;

            const editedTask = {
                title: taskTitle,
                description: taskDescription,
                priority: taskPriority,
                dueDate: taskDueDate,
                project: taskProjectSelect,
                notes: taskNotes
            }

            const currentTask = getTaskById(taskId)

            EditTask(currentTask, editedTask);

            const updateShowTask = getTaskById(taskId);
            const content = document.getElementById('content');
            showTask(content, updateShowTask)
            dialog.close();

        } else {
            console.error('Failed Submitting Form')
        }
    })

    // handle project form
    const projectForm = document.getElementById('projectForm');
    projectForm.addEventListener('submit', function (e) {
        e.preventDefault()

        const dialog = document.getElementById('projectFormDialog');
        const action = document.activeElement.value;
        if (action === 'Add Project') {
            const projectTitle = document.getElementById('projectTitle').value;
            const projectDescription = document.getElementById('projectDescription').value;

            new Project(projectTitle, projectDescription);

            //  close dialog
            dialog.close()

            // empty for next time
            this.reset()

            // update form selection
            ProjectSelection()

            // reload project page
            ProjectsPage(content)
        }

        else if (action === 'Edit Project') {

            const ProjectTitle = document.getElementById('projectTitle').value;
            const ProjectDescription = document.getElementById('projectDescription').value;
            const ProjectId = document.getElementById('ProjectId').dataset.current;


            const editedProject = {
                title: ProjectTitle,
                description: ProjectDescription,
            }

            const currentProject = getProjectById(ProjectId)

            EditProject(currentProject, editedProject);

            const content = document.getElementById('content');
            ProjectsPage(content)
            dialog.close();

        } else {
            console.error('Failed Submitting Form')
        }
    })

})

