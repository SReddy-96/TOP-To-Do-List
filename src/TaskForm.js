import { format } from "date-fns";
import './index.js'
import { ProjectSelection } from "./projectHelpers.js";

// activate the task form dialog
export default function TaskForm(TaskClass) {
    // handle open/close of dialog
    const dialog = document.getElementById('taskFormDialog');
    const showBtn = document.getElementById("showTaskForm");
    const closeBtn = document.getElementById("closeTaskForm");

    const taskForm = document.getElementById('taskForm');

    // get projects for selection on first load
    ProjectSelection();

    // dialog open and close 
    showBtn.addEventListener("click", () => {

        // set min/value date in form to today
        const taskDueDate = document.getElementById('taskDueDate');
        taskDueDate.value = format(new Date, 'yyyy-MM-dd');
        taskDueDate.min = format(new Date, 'yyyy-MM-dd');

        dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskPriority = document.getElementById('taskPriority').value;
        const taskDueDate = document.getElementById('taskDueDate').value;
        const taskProjectSelect = document.getElementById('taskProjectSelect').value;
        const taskNotes = document.getElementById('taskNotes').value;

        // create new task with class
        new TaskClass(taskTitle, taskDescription, taskPriority, taskDueDate, taskProjectSelect, taskNotes)

        //  close dialog
        dialog.close()

        // empty for next time
        this.reset()

    })


}