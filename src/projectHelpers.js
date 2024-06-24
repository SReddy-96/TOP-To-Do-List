function createProject(newProject) {
    
    // get the array, push new project then stringify and set in local storage
    const Projects = JSON.parse(localStorage.getItem('Projects') || "[]")
    Projects.push(newProject)
    localStorage.setItem('Projects', JSON.stringify(Projects) );
    return console.log("Project added");
}

export {createProject}