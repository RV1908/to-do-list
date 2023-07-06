const setTaskInLocalStorage = (task) => {
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    if (!task.name || task.name === '') return alert('Please enter a task name.');
    if (tasks.find(t => t.name === task.name)) return;
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTasksFromLocalStorage = () => {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

const main = () => {
    const tasks = getTasksFromLocalStorage();
    const doneTasks = tasks.filter(task => task.done);
    const todoTasks = tasks.filter(task => !task.done);
    const todo = document.getElementById('todo');
    const done = document.getElementById('done');

    todo.innerHTML = '';
    done.innerHTML = '';

    todoTasks.forEach(task => {
        todo.innerHTML += `<div onClick="onTaskClick('${task.name}')" class="actionable">
        <div class="checkbox empty">
            X
        </div>
        <h3>${task.name}</h3>
        </div>`;
    });

    doneTasks.forEach(task => {
        done.innerHTML += `<div onClick="onTaskClick('${task.name}')" class="actionable">
        <div class="checkbox">
            ✓
        </div>
        <h3>${task.name}</h3>
        </div>`;
    });
};

const onAddTask = (e) => {
    e.preventDefault();
    const name = document.getElementById('task').value;
    if (!name) return;
    const task = {
        name,
        done: false,
        createdAt: new Date()
    };
    setTaskInLocalStorage(task);
    document.getElementById('task').value = '';
    main();
};

const onTaskClick = (taskName) => {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(t => t.name === taskName);
    task.done = !task.done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    main();
};

main();
