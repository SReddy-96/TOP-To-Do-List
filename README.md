# The Odin Project - To-do List

## Objective

## Model 
### Landing Page
|  Desktop | Mobile   | 
|----------|----------|
| ![desktop]()|![mobile]()|


## Problems encountered
- how to update the object.

## New skills
- Using `Object.assign` to assign the new object to the existing object in the array. 

## Languages
- HTML
- CSS
- JavaScript
- Webpack
 
### Sudo 
- [x]  use class to create the task, adding title, description, due-date, priority, notes. what project it's on.
- [x]  use class to create a project then be able to add tasks to said project.
- [x] class method to get module that gets all the tasks inside that project.
- [x] default project should be shown if its the first time on the app.have title and description
- [ ] separate logic from DOM manipulation
- [x] creating task 
- [x] deleting task
- [x] changing priority - use class method editTask and just assign an array with priority.
- [x] setting task a complete. using editTask method
- [x] editing task (use icons to show this)
- [x] setting task to project, use all projects and use a selection form to choose then match the id's 
- [x] creating project, 
- [x] editing project
- [x] due date on project, function to get 
- [x] completed project, use getProjectTasks to check all completed is true then show all tasks are completed
- [x] deleting project. 
- [ ] handle if the task in not in local storage.
- [ ] make sure to `stringify` when sending json data to local storage.

UI
- [ ] view all projects
- [ ] view all tasks in project, just title and due-date. 
- [x] check box to click but use an icon, change when clicked which inturn changes the bool. , line through the task, setting a class to a task
- [ ] expand a single task to edit and delete
- [x] if the date is todays date it goes into a `Today` page, show title, which project, description, no due date as its today.
- [ ] if all task are complete in project it changes color
- [x] for priority, change the right hand side border color
- [ ] go mobile first.
- [x] add a low nav bar to mobile with today, projects, add, option for project or task.
- [ ] on desktop, side bar with today, next 7 days, add task, add project. then projects titles are shown underneath. 
- [ ] have a number on the side of the project to show how many tasks need doing.
- [ ] display a message when there is not tasks
- [x] show form with a dialog modal, both task and project
- [ ] use ${} to add the right priority to show the color

when going to project and back to today it looses the event listener!!!!!

priority
- Urgent (red)
- Important (yellow/orange)
- Low Priority.(blue)

have a boolean if done true or false

delete = Storage.removeItem('object variable')
create = take input add to object then JSON.stringify('object') then localStorage.setItem('object variable', the user user input)
update = be the same as create
read = localStorage.getItem('object variable') then JSON.parse('variable')