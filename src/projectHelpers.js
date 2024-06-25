
function createProject(newProject) {

    // get the array, push new project then stringify and set in local storage
    const Projects = JSON.parse(localStorage.getItem('Projects') || "[]")
    Projects.push(newProject)
    localStorage.setItem('Projects', JSON.stringify(Projects));
    return console.log("Project added");
}

// delete Project using object matching created dates
function DeleteProject(currentProject) {
    const Projects = JSON.parse(localStorage.getItem('Projects'));

    // Find the index of the task to delete using day created 
    const projectIndex = Projects.findIndex(project => project.createdDate === currentProject.createdDate);

    // Check if the task exists in the array
    if (projectIndex !== -1) {
        // Remove the task from the array
        Projects.splice(projectIndex, 1);

        // Save the updated array back to local storage
        localStorage.setItem('Projects', JSON.stringify(Projects));
    } else {
        console.error('Project does not exist')
    }
}

function GetProjectsTasks(Project) {
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    let projectTasks = [];

    // iterate over tasks
    for (let i = 0; i < Tasks.length; i++) {
        if (Tasks[i].project === Project.title) {
            projectTasks.push(Tasks[i]);
        }
    }
    return projectTasks; // return an array of tasks.
}

// edit a Project, takes new object from form
function EditProject(currentProject, newProject){
    const Projects = JSON.parse(localStorage.getItem('Projects'));

    // Find the index of the Project to update using day and time created 
    const ProjectIndex = Projects.findIndex(Project => Project.createdDate === currentProject.createdDate);

    // Check if the Project exists in the array
    if (ProjectIndex !== -1) {
        // assigning the object with the new data.
        Object.assign(Projects[ProjectIndex], newProject)

        // Save the updated array back to local storage
        localStorage.setItem('Projects', JSON.stringify(Projects));
    } else {
        console.error('Project does not exist')
    }
}
export { createProject, DeleteProject, GetProjectsTasks, EditProject }