const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Initialize an empty array for tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to add a task to the array and update localStorage
function addTask() {
    if (inputBox.value === '') {
        alert("Please write something!");
    } else {
        let task = {
            text: inputBox.value,
            completed: false
        };

        tasks.push(task); // Add the new task to the array
        saveTasks(); // Save to localStorage
        renderTasks(); // Update the UI
        inputBox.value = ''; // Clear input box
    }
}

// Function to render tasks in the UI
function renderTasks() {
    listContainer.innerHTML = ''; // Clear the list before re-rendering

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // Create the circular check button
        let checkBtn = document.createElement("button");
        checkBtn.innerHTML = ""; // Empty content, will only be a styled circle
        checkBtn.classList.add("check-btn");

        // Add 'completed' class if the task is marked as completed
        if (task.completed) {
            li.classList.add("completed");
            checkBtn.classList.add("checked");
        }

        // Event listener to mark the task as completed
        checkBtn.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed; // Toggle completion
            saveTasks(); // Save to localStorage
            renderTasks(); // Re-render tasks
        });

        // Create a span for the task text
        let taskText = document.createElement("span");
        taskText.innerHTML = task.text;

        // Create the delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("remove-btn");

        // Event listener to delete the task
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1); // Remove task from array
            saveTasks(); // Save to localStorage
            renderTasks(); // Re-render tasks
        });

        // Append check button, task text, and delete button in correct order
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

// Initial render when the page loads
renderTasks();
