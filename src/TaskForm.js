
// activate the task form dialog
// add projects to select 
export default function TaskForm() {
    const Projects = JSON.parse(localStorage.getItem('Projects'));
    const ProjectSelect = document.getElementById('ProjectSelect');
    
    for (let i = 0; i < Projects.length;i++){
        const option = document.createElement('option')
        option.value = Projects[i].id;
        option.textContent = Projects[i].title;

        ProjectSelect.append(option);
    }

}