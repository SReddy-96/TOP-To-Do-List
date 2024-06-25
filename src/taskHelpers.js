
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
    const taskIndex = Tasks.findIndex(task => task.createdDate === currentTask.createdDate);

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

// edit a Task, takes new object from form
function EditTask(currentTask, newTask){
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    // Find the index of the task to update using day and time created 
    const taskIndex = Tasks.findIndex(task => task.createdDate === currentTask.createdDate);

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

// change completed to true

export { createTask, DeleteTask, EditTask }
