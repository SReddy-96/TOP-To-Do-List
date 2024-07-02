# The Odin Project - To-do List

## Objective
The main task here is to create a To-do List app using HTML, CSS, and Javascript, then bundling it all together with Webpack. Using the recently learned skills with Modules, I was able to separate my code, making it more readable and clean. I wanted to focus primarily on a mobile-first approach with this project.

## Model 
### Desktop Demo
<video controls src="./README-Files/desktop.mp4" title="Desktop Video"></video>

### Mobile Demo
<video controls src="./README-Files/mobile.mp4" title="Mobile video"></video>

### Index 

This project's entry point is `index.js`, which handles the initial DOM load, manages event listeners for the nav components, and processes form submissions. Both Tasks and Projects are handled with class constructors to create objects, which are then added to an array and stored in `localStorage` using `setItem`.

When creating new Projects and Tasks, they are assigned a `crypto.randomUUID()`, which is used to retrieve tasks by matching the ID with the array of objects in local storage. This UUID is also used to connect projects with each task.

The viewing of tasks is used for both the Today page and the Projects Tasks page. The module checks whether the ProjectObject is not empty and gathers the tasks needed to display for either a specific project or the Today page.

The use of `date-fns` was invaluable for tracking and handling dates and times. It was used to set a minimum date for the date input, and when new Tasks or Projects are created, they are given a `createdDate` key to show the user when the item was created. The functions provided by this package were great for collecting tasks based on dates, allowing users to view tasks with a `dueDate` on or before today.

I was also able to use the priority to set a condition that displays a specific color, indicating the severity of the task and making the UI more visual and easier to navigate.

One of my biggest drivers for this project was to keep it primarily mobile-focused, with the nav fixed to the bottom for easy navigation on mobile devices and maintaining a simple, user-friendly UI.

### Project

This page allows users to view their created projects and add more. The projects are laid out similarly to tasks, with the added feature of showing how many uncompleted tasks remain. When all tasks within a project are completed, the empty box changes to a ticked one, indicating project completion.

On this page, each project can be edited or deleted. If a project is deleted, all corresponding tasks are also removed.

### Add and Edit Dialog

Both the project and Task Dialogs are hard-coded into the index.html file. Using `showModal()` and `close()`, they are easily displayed to the user.

The same forms are used for both creating and editing data. By adding two submit buttons to the forms and showing/hiding them as needed, the submissions are handled based on the value inside the submit button to either add or edit the data. This is all managed within the event listener in `index.js`, which checks for the correct conditions before proceeding.

### Show Task

The use of modules made it much easier to keep the code organized and reuse it throughout the application. The show task page is used on both the Today page and inside each project. When users click on a specific Task, they can view all its details, add descriptions, and notes. They can also edit the task and change whatever they please, with only the `createdDate` and `id` remaining constant to keep track of the task.

## Problems Encountered
- Updating objects
- Event listeners being called repeatedly
- Getting the nav to stick to the bottom
- Handling different form submissions
- Saving to `localStorage`

## New Skills Acquired
- Using `Object.assign` to update existing objects in the array
- Managing where event listeners are initially called
- Using `position: fixed;` to keep the nav at the bottom of the screen
- Using the `name` attribute inside submit buttons to create conditions for handling submissions
- Gaining knowledge of `JSON.stringify`, `JSON.parse`, `.setItem()`, and `getItem()` to handle local Storage data

## Technologies Used
- HTML
- CSS
- JavaScript
- Webpack
