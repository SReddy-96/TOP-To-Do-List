import { isToday, isBefore } from "date-fns";

// create a task
function createTask(newTask) {
    // get the array, push new Task then stringify and set in local storage
    const Tasks = JSON.parse(localStorage.getItem('Tasks') || "[]")
    Tasks.push(newTask)
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
    return console.log("task added");
}

// delete a tasks
function DeleteTask(currentTask) {
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    // Find the index of the task to delete using day created 
    const taskIndex = Tasks.findIndex(task => task.id === currentTask.id);

    // Check if the task exists in the array
    if (taskIndex !== -1) {
        // Remove the task from the array
        Tasks.splice(taskIndex, 1);

        // Save the updated array back to local storage
        localStorage.setItem('Tasks', JSON.stringify(Tasks));
    } else {
        console.error('Task does not exist')
    }
}

// edit a Task, takes new object from form, change completed to true
function EditTask(currentTask, newTask) {
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    // Find the index of the task to update using day and time created 
    const taskIndex = Tasks.findIndex(task => task.id === currentTask.id);

    // Check if the task exists in the array
    if (taskIndex !== -1) {
        // assigning the object with the new data.
        Object.assign(Tasks[taskIndex], newTask)

        // Save the updated array back to local storage
        localStorage.setItem('Tasks', JSON.stringify(Tasks));
    } else {
        console.error('Task does not exist')
    }
}

// get the project that the task is in
function getTasksProject(currentTask) {
    const Projects = JSON.parse(localStorage.getItem('Projects'));

    // Find the index of the Project to update using day and time created 
    const ProjectIndex = Projects.findIndex(Project => Project.id === currentTask.project);

    if (ProjectIndex !== -1) {
        // return project object for task 
        return Projects[ProjectIndex];
    } else {
        return ('No Project')
    }
}

// get all the tasks need for today
function TodaysTasks() {
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    // check if array is empty
    if (Tasks.length === 0) {
        return "No tasks for today"
    }

    const TasksForToday = [];

    // iterate over and if the date matches todays and before then add to array
    for (let i = 0; i < Tasks.length; i++) {
        if (isToday(Tasks[i].dueDate) === true || isBefore(Tasks[i].dueDate, new Date())) {
            TasksForToday.push(Tasks[i]);
        }
    }


    return TasksForToday;

}

// get task by id
function getTaskById(taskId) {
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    for (let i = 0; i < Tasks.length; i++) {
        if (Tasks[i].id === taskId) {
            return Tasks[i]
        }
    }
    return 'Task does not Exist'
}

// eventlistener to change complete and line through 
function toggleCheckedTask() {
    const taskCheckboxes = document.querySelectorAll('.taskCheckbox')
    taskCheckboxes.forEach((taskCheckbox) => {
        taskCheckbox.addEventListener('change', () => {
            // get title of task
            const taskCard = taskCheckbox.parentElement;
            const taskTitle = taskCard.children[1]

            // get task ID
            const taskId = getTaskById(taskCard.dataset.id)

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
}


export { createTask, DeleteTask, EditTask, getTasksProject, TodaysTasks, getTaskById, toggleCheckedTask }
