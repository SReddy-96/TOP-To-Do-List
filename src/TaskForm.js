import { format } from "date-fns";
import './index.js'
import { ProjectSelection } from "./projectHelpers.js";

// activate the task form dialog
export default function TaskForm(taskObject) {
    // handle open/close of dialog
    const formLegend = document.getElementById('formLegend');
    const editTask = document.getElementById('editTaskFormButton');
    const addTask = document.getElementById('addTaskFormButton');

    const taskForm = document.getElementById('taskForm');

    // get projects for selection on first load
    ProjectSelection();

    // edit task
    if (taskObject) {

        // reset form
        taskForm.reset();

        // toggle buttons   
        addTask.style.display = "none";
        editTask.style.display = "block";

        // set min date in form to today
        const taskDueDate = document.getElementById('taskDueDate');
        taskDueDate.min = format(new Date, 'yyyy-MM-dd');

        // set legend
        formLegend.textContent = "Edit a Task"

        // fill form
        const TaskTitle = document.getElementById('taskTitle').value = taskObject.title;
        const taskDescription = document.getElementById('taskDescription').value = taskObject.description;
        const taskPriority = document.getElementById('taskPriority').value = taskObject.priority;
        taskDueDate.value = taskObject.dueDate;
        const taskProjectSelect = document.getElementById('taskProjectSelect').value = taskObject.project;
        const taskNotes = document.getElementById('taskNotes').value = taskObject.notes;
        const taskId = document.getElementById('taskId').setAttribute('data-current', taskObject.id);
    }

    // dialog open and close 
    if (!taskObject) {

        // reset form
        taskForm.reset();

        // toggle buttons   
        editTask.style.display = "none";
        addTask.style.display = "block";

        // set min/value date in form to today
        const taskDueDate = document.getElementById('taskDueDate');
        taskDueDate.value = format(new Date, 'yyyy-MM-dd');
        taskDueDate.min = format(new Date, 'yyyy-MM-dd');

        // set legend
        formLegend.textContent = "Add a Task"
    };
}