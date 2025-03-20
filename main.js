document.addEventListener("DOMContentLoaded", () => { // esperar a que se cargue el DOM, addentListener se usa para escuchar eventos 
    loadTasks(); // cargar tareas cuando se carga la pagina, con el sessionstorage
});

function addTask() { // funcion para añadir tareas
    const taskInput = document.getElementById("newTask"); // obtener input
    const tasks = getTasks(); // obtener tareas

    if (taskInput.value.trim() === "") { // si el input esta vacio  
        return; // se abandona la función si es que esta vacia
    }

    tasks.push({ content: taskInput.value, done: false });// si es que no esta vacia se añade a la lista
    renderTasks(tasks); // se renderizan las tareas

    taskInput.value = ""; // se limpia el input
}

function getTasks() { // obtener tareas
    const storedTasks = sessionStorage.getItem("tasks"); // obtener tareas
    return storedTasks ? JSON.parse(storedTasks) : []; // si no hay tareas se devuelve un array vacio
}

function saveTasks(tasks) { // guardar tareas
    sessionStorage.setItem("tasks", JSON.stringify(tasks)); // guardar tareas
}

function renderTasks(tasks) { // renderizar tareas
    const listElement = document.getElementById("taskList"); // obtener lista
    listElement.innerHTML = ''; // limpiar lista
    tasks.forEach((task, index) => { // recorrer tareas
        const taskElement = document.createElement("li"); // crear elemento
        taskElement.textContent = task.content; // agregar contenido
        taskElement.onclick = () => toggleTaskDone(index); // agregar evento
        if (task.done) { // si la tarea esta hecha
            taskElement.style.textDecoration = "line-through"; // se tachado
        }
        listElement.appendChild(taskElement); // agrega elemento
    });
}

function toggleTaskDone(index) { // cambiar el estado de la tarea
    const tasks = getTasks(); // obtener tareas
    tasks[index].done = !tasks[index].done; // cambiar estado
    saveTasks(tasks); // guardar tareas
    renderTasks(tasks); // renderizar tareas
}

function loadTasks() { // cargar tareas
    const tasks = getTasks(); // obtener tareas
    renderTasks(tasks); // renderizar tareas
}
