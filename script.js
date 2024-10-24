const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    if (inputBox.value === '') {
        alert("Please write something!");
    } else {
        let task = {
            text: inputBox.value,
            completed: false
        };

        tasks.push(task); 
        saveTasks(); 
        renderTasks(); 
        inputBox.value = ''; 
    }
}

function renderTasks() {
    listContainer.innerHTML = ''; 

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // Create the circular check button
        let checkBtn = document.createElement("button");
        checkBtn.innerHTML = ""; 
        checkBtn.classList.add("check-btn");

        // Add 'completed' class if the task is marked as completed
        if (task.completed) {
            li.classList.add("completed");
            checkBtn.classList.add("checked");
        }

        // Event listener to mark the task as completed
        checkBtn.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed; 
            saveTasks(); // Save to localStorage
            renderTasks(); 
        });

        
        let taskText = document.createElement("span");
        taskText.innerHTML = task.text;

        // Create the delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("remove-btn");

        
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1); 
            saveTasks(); 
            renderTasks(); 
        });

        
        li.appendChild(checkBtn);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
