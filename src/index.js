import { createTask, DeleteTask, EditTask } from "./taskHelpers.js";
import { createProject, DeleteProject, GetProjectsTasks, EditProject } from "./projectHelpers.js";
import { compareAsc, format } from "date-fns";

// Task class
class Task {
    constructor(title, description, priority, dueDate, project, notes) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
        this.notes = notes;
        this.createdDate = format(new Date, 'PPPPpppp');
        this.completed = false;
    }
    
    DeleteTaskMethod(){
        return DeleteTask(this)
    }
    
    editTaskMethod(editedTaskObject){
        return EditTask(this, editedTaskObject)
    }
}

// project class
class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.createdDate = format(new Date, 'PPPPpppp');
    }
    
    DeleteProjectMethod(){
        return DeleteProject(this)
    }
    
    getTasks(){
        return GetProjectsTasks(this)
    }
    
    editProjectMethod(editedProjectObject){
        return EditProject(this, editedProjectObject)
    }
}

const hello = new Task('1', '2', '3', '4', 'hello', '6')
const bye = new Task('1', '2', '3', '4', 'bye', '6')
const projectHello = new Project('hello', 'hello')

createProject(projectHello)
createTask(bye)
createTask(hello)

const tasks = JSON.parse(localStorage.getItem('Tasks'))
const Projects = JSON.parse(localStorage.getItem('Projects'))



const editObject = { completed: true }

const editProjectObject = {title: 'goodbye'}

console.log(tasks);

bye.DeleteTaskMethod()

setTimeout(() => {
    bye.editTaskMethod(editObject);
    console.log(JSON.parse(localStorage.getItem('Tasks')))
}, 3000);

setTimeout(() => {
    projectHello.editProjectMethod(editProjectObject);
    console.log(JSON.parse(localStorage.getItem('Projects')))
}, 3000);



