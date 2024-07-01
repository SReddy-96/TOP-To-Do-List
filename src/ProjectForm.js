import ProjectsPage from './ProjectsPage.js';
import { ProjectSelection, EditProject, getProjectById } from './projectHelpers.js';

// activate the project form dialog
export default function ProjectForm(projectObject) {
    // handle open/close of dialog
    const projectForm = document.getElementById('projectForm');

    const ProjectFormLegend = document.getElementById('ProjectFormLegend');
    const editProject = document.getElementById('editProjectFormButton');
    const addProject = document.getElementById('addProjectFormButton');

    // edit task
    if (projectObject) {

        // reset form
        projectForm.reset();

        // toggle buttons   
        addProject.style.display = "none";
        editProject.style.display = "block";

        // set legend
        ProjectFormLegend.textContent = "Edit a Project"

        // fill form
        const projectTitle = document.getElementById('projectTitle').value = projectObject.title;
        const projectDescription = document.getElementById('projectDescription').value = projectObject.description;
        const projectId = document.getElementById('ProjectId').setAttribute('data-current', projectObject.id);
    }

    // dialog open and close 
    if (!projectObject) {

        // reset form
        projectForm.reset();

        // toggle buttons   
        editProject.style.display = "none";
        addProject.style.display = "block";

        // set legend
        ProjectFormLegend.textContent = "Add a Project"
    };
}