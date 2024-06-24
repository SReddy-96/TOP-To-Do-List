import { createTask, DeleteTask } from "./taskHelpers.js";
import { createProject } from "./projectHelpers.js";
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
        this.createdDate = new Date;
    }
}

// project class
class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

const hello = new Task('1', '2', '3', '4', '5', '6')

createTask(hello)

const tasks = JSON.parse(localStorage.getItem('Tasks'))

setTimeout(DeleteTask(tasks[0]), 2000);