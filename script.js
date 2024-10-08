const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskDateTime = document.getElementById('taskDateTime');
const taskList = document.getElementById('tasks');

let tasks = [];

// Add Task Function
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = taskInput.value;
    const taskDate = taskDateTime.value;

    if (taskText === '' || taskDate === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    taskDateTime.value = '';
});

// Render Task List
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text} - <small>${new Date(task.date).toLocaleString()}</small></span>
            <div>
                <button onclick="toggleTask(${task.id})">Complete</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="editTask(${task.id})">Edit</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Toggle Task Completion
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Edit Task (Simple Implementation)
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTaskText = prompt('Edit your task:', task.text);
    const newTaskDate = prompt('Edit task date and time:', task.date);

    if (newTaskText !== null && newTaskDate !== null) {
        task.text = newTaskText;
        task.date = newTaskDate;
        renderTasks();
    }
}
