import { createTask, DeleteTask, EditTask, getTasksProject } from "./taskHelpers.js";
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

    editTaskMethod(editedTaskObject) {
        return EditTask(this, editedTaskObject)
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

    createProjectMethod(){
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
if(window.localStorage.length === 0){
    const DefaultProject = new Project('Default Project', 'This is a mock project to add your tasks too')
    const MockTask = new Task('Mock Task', 'This is a mock Task', 'Important', '2024-06-26', DefaultProject.id, '6')
}

// dialog forms for task anf project
TaskForm(Task);
ProjectForm(Project);

document.addEventListener('DOMContentLoaded', function(){
    const content = document.getElementById('content');

    const todayButton = document.getElementById('today');
    const projectButton = document.getElementById('project');
    
    TodayPage(content)
    todayButton.classList.add('activePage')
    content.className = ''

    todayButton.addEventListener('click', function(){
        content.innerHTML = ''; // empty content div
        content.className = ''
        TodayPage(content)
        todayButton.classList.add('activePage')
        projectButton.classList.remove('activePage')
    })
    
    
    projectButton.addEventListener('click', function(){
        content.innerHTML = ''; // empty content div
        content.className = ''
        ProjectsPage(content)
        projectButton.classList.add('activePage')
        todayButton.classList.remove('activePage')
    })

})




