// script.js

document.addEventListener('DOMContentLoaded', function() {
    function addTask() {
        const taskTitleInput = document.getElementById('taskTitle');
        const taskTimeInput = document.getElementById('taskTime');
        const taskTypeRadio = document.querySelector('input[name="taskType"]:checked');

        const title = taskTitleInput.value.trim();
        const time = taskTimeInput.value.trim();
        const type = taskTypeRadio.value;

        if (title && time) {
            const task = {
                title,
                time,
                type,
                completed: false
            };
            saveTask(task);
            renderTask(task);
            taskTitleInput.value = '';
            taskTimeInput.value = '';
        } else {
            alert('Please fill in both task title and time.');
        }
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(renderTask);
    }

    function renderTask(task) {
        const targetList = task.type === 'personal' ? document.getElementById('personalTasks') : document.getElementById('workTasks');
        if (task.completed) {
            targetList = document.getElementById('completedTasks');
        }
        const taskDiv = document.createElement('div');
        taskDiv.className = 'list-item';
        taskDiv.innerHTML = `
            <span>${task.title}</span> 
            <span>${task.time}</span>
            <button onclick="completeTask('${task.title}')">Complete</button>
            <button onclick="deleteTask('${task.title}')">Delete</button>
        `;
        targetList.appendChild(taskDiv);
    }

    function completeTask(title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.title === title) {
                task.completed = true;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderAllTasks();
    }

    function deleteTask(title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.title !== title);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderAllTasks();
    }

    function renderAllTasks() {
        document.getElementById('personalTasks').innerHTML = '<h2>Personal Tasks</h2>';
        document.getElementById('workTasks').innerHTML = '<h2>Work Tasks</h2>';
        document.getElementById('completedTasks').innerHTML = '<h2>Completed Tasks</h2>';
        loadTasks();
    }

    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTask);

    loadTasks();

    const toggleModeBtn = document.getElementById('toggleMode');
    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const registerSubmitBtn = document.getElementById('registerSubmitBtn');

    loginBtn.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerBtn.addEventListener('click', () => {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    loginSubmitBtn.addEventListener('click', () => {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        if (validateLogin(username, password)) {
            alert('Login successful');
            loginForm.style.display = 'none';
        } else {
            alert('Invalid username or password');
        }
    });

    registerSubmitBtn.addEventListener('click', () => {
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        if (username && password) {
            saveUser(username, password);
            alert('Registration successful');
            registerForm.style.display = 'none';
        } else {
            alert('Please fill in both username and password');
        }
    });

    function saveUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
    }

    function validateLogin(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.username === username && user.password === password);
    }
});
