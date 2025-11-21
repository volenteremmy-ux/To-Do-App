const API_URL="http://localhost:5000/api/tasks";

//handle form submission
document.getElementById('taskForm').addEventListener('submit', async(e) =>{
    e.preventDefault();
    const task_title= document.getElementById("task_title").value.trim();
    const description= document.getElementById("description").value.trim();
    const dueDate= document.getElementById("dueDate").value.trim();


    const payload={task_title, description};
    const res = await fetch(API_URL, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(res.ok){
        
        document.getElementById("taskForm").reset(); 
    }else{
        console.error("Error:", data);
    }
})

//Get all tasks
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        list.innerHTML += `
            <li>
                <strong>${task.task_title}</strong> - ${task.description} - ${task.dueDate?.slice(0,10)}
                <button onclick="deleteTask('${task._id}')">Delete</button>
                <button onclick="updateTask('${task._id}')">Edit</button>
            </li>
        `;
    });
}
loadTasks();

//Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
}

//Update task
async function updateTask(id) {
    const newTitle = prompt("Enter new task title:");
    const newDesc = prompt("Enter new description:");
    const newDate = prompt("Enter new due date (YYYY-MM-DD):");

    const payload = {
        task_title: newTitle,
        description: newDesc,
        dueDate: newDate
    };

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    loadTasks();
}

//Filter by name
document.getElementById("filterName").addEventListener("input", async () => {
    const name = document.getElementById("filterName").value;

    const res = await fetch(`${API_URL}?name=${name}`);
    const tasks = await res.json();

    displayFiltered(tasks);
});

//Filter by date
document.getElementById("filterDate").addEventListener("change", async () => {
    const date = document.getElementById("filterDate").value;

    const res = await fetch(`${API_URL}?date=${date}`);
    const tasks = await res.json();

    displayFiltered(tasks);
});

//Display filtered results
function displayFiltered(tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        list.innerHTML += `
            <li>
                <strong>${task.task_title}</strong> - ${task.description} - ${task.dueDate?.slice(0,10)}
                <button onclick="deleteTask('${task._id}')">Delete</button>
                <button onclick="updateTask('${task._id}')">Edit</button>
            </li>
        `;
    });
}

