
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

    // Find the index of the task to delete using id 
    const projectIndex = Projects.findIndex(project => project.id === currentProject.id);

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

// get the tasks through the date/time created
function GetProjectsTasks(Project) {
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    let projectTasks = [];

    // iterate over tasks
    for (let i = 0; i < Tasks.length; i++) {
        if (Tasks[i].project === Project.id) {
            projectTasks.push(Tasks[i]);
        }
    }
    return projectTasks; // return an array of tasks.
}

// edit a Project, takes new object from form
function EditProject(currentProject, newProject) {
    const Projects = JSON.parse(localStorage.getItem('Projects'));

    // Find the index of the Project to update using day and time created 
    const ProjectIndex = Projects.findIndex(Project => Project.id === currentProject.id);

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

// check if project is completed, takes project object
function completedProjects() {
    const projects = JSON.parse(localStorage.getItem('Projects'));

    projects.map((project) => {
        const projectTasks = GetProjectsTasks(project);

        let checker = 0;
        // iterate over tasks checking if all task are complete
        for (let i = 0; i < projectTasks.length; i++) {
            if (projectTasks[i].completed === false) {
                return EditProject(project, { completed: false })
            } else {
                checker++;
            }
        }
        // check to make sure the checker counter matches the length of the array.
        if (projectTasks.length === checker) {
            EditProject(project, { completed: true })
        } 
    })
    return console.log("project scan complete")


}

// getting the projects and adding to select input
function ProjectSelection() {
    const Projects = JSON.parse(localStorage.getItem('Projects'));
    const ProjectSelect = document.getElementById('taskProjectSelect');

    // clear the selection
    ProjectSelect.innerHTML = ''

    // add projects to select form input, checking to see if Projects is null
    if (Projects === null) {
        const option = document.createElement('option')
        option.disabled = true;
        option.textContent = "No Projects";

        ProjectSelect.append(option);
    } else {
        for (let i = 0; i < Projects.length; i++) {
            const option = document.createElement('option')
            option.value = Projects[i].id;
            option.textContent = Projects[i].title;

            ProjectSelect.append(option);
        }
    }
}

// get project by id
function getProjectById(projectId) {
    const projects = JSON.parse(localStorage.getItem('Projects'));

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectId) {
            return projects[i]
        }
    }
    return 'project does not Exist'
}


export { createProject, DeleteProject, GetProjectsTasks, EditProject, completedProjects, ProjectSelection, getProjectById }