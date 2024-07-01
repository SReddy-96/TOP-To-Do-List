import ProjectsPage from './ProjectsPage.js';
import {ProjectSelection} from './projectHelpers.js';

// activate the project form dialog
export default function ProjectForm(projectClass) {
    // handle open/close of dialog
    const dialog = document.getElementById('projectFormDialog');
    const content = document.getElementById('content')
    const projectForm = document.getElementById('projectForm');
    
    projectForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const projectTitle = document.getElementById('projectTitle').value;
        const projectDescription = document.getElementById('projectDescription').value;

        new projectClass(projectTitle, projectDescription);

        //  close dialog
        dialog.close()

        // empty for next time
        this.reset()

        // update form selection
        ProjectSelection()
        
        // reload project page
        ProjectsPage(content)
        
    })


}