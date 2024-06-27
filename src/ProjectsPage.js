export default function ProjectsPage(Task, content) {
    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'showProjectForm';
    addProjectButton.textContent = 'Add Project'
    content.textContent = 'Projects'

    content.append(addProjectButton);
}