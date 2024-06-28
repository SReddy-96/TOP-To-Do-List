import { format } from "date-fns";
import './index.js'
import { ProjectSelection } from "./projectHelpers.js";
import { EditTask, getTaskById } from "./taskHelpers.js";
import showTask from './showTask.js';
import TaskPage from "./TaskPage.js";

// activate the task form dialog
export default function TaskForm(TaskClass, taskObject) {
    // handle open/close of dialog
    const dialog = document.getElementById('taskFormDialog');
    const showBtn = document.getElementById("showTaskForm");
    const closeBtn = document.getElementById("closeTaskForm");
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

        dialog.showModal();
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

        dialog.showModal();
    };

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

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
            new TaskClass(taskTitle, taskDescription, taskPriority, taskDueDate, taskProjectSelect, taskNotes)

            const content = document.getElementById('content');
            TaskPage(content, 'Today');
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


    }, { once: true })


}