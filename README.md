# The Odin Project - To-do List

## Objective

## Model 
### Landing Page
|  Desktop | Mobile   | 
|----------|----------|
| ![desktop]()|![mobile]()|


## Problems encountered
- 

## New skills
- 

## Languages
- HTML
- CSS
- JavaScript
- Webpack
 
### Sudo 
- [x]  use class to create the task, adding title, description, due-date, priority, notes. what project it's on.
- [x]  use class to create a project then be able to add tasks to said project.
- [ ] default project should be shown if its the first time on the app.have title and description
- [ ] separate logic from DOM manipulation
- [ ] creating task 
- [ ] deleting task
- [ ] changing priority 
- [ ] setting task a complete.
- [ ] editing task (use icons to show this)
- [ ] setting task to project
- [ ] creating project, 
- [ ] editing project
- [ ] due date on project 
- [ ] completed project 
- [ ] deleting project. 
- [ ] handle if the task in not in local storage.
- [ ] make sure to `stringify` when sending json data to local storage.

UI
- [ ] view all projects
- [ ] view all tasks in project, just title and due-date. 
- [ ] check box to click but use an icon, change when clicked which inturn changes the bool. , line through the task, 
- [ ] expand a single task to edit and delete
- [ ] if the date is todays date it goes into a `Today` page, show title, which project, description, no due date as its today.
- [ ] if all task are complete in project it changes color
- [ ] for priority, change the right hand side border color
- [ ] go mobile first.
- [ ] add a low nav bar to mobile with today, projects, add, option for project or task.
- [ ] on desktop, side bar with today, next 7 days, add task, add project. then projects titles are shown underneath. 
- [ ] have a number on the side of the project to show how many tasks need doing.
- [ ] display a message when there is not tasks

priority
- Urgent (red)
- Important (yellow/orange)
- Low Priority.(blue)

have a boolean if done true or false

delete = Storage.removeItem('object variable')
create = take input add to object then JSON.stringify('object') then localStorage.setItem('object variable', the user user input)
update = be the same as create
read = localStorage.getItem('object variable') then JSON.parse('variable')