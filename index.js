const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;

    // Create delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7"; // × symbol
    deleteBtn.classList.add("delete");
    li.appendChild(deleteBtn);

    // Create edit button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "\u270E"; // ✎ symbol
    editBtn.classList.add("edit");
    li.appendChild(editBtn);

    listContainer.appendChild(li);
    saveData();
  }

  inputBox.value = ""; // Clear the input box
}

// Event listener for clicks on the task list
listContainer.addEventListener("click", function (e) {
  const target = e.target;

  // Delete task
  if (target.classList.contains("delete")) {
    target.parentElement.remove();
    saveData();
  }

  // Edit task
  else if (target.classList.contains("edit")) {
    const li = target.parentElement;
    const currentText = li.childNodes[0].textContent.trim();

    // Clear the li content
    li.innerHTML = "";

    // Create input box
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    li.appendChild(input);

    // Create save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save-btn";
    li.appendChild(saveBtn);

    // Create delete button again
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete");
    li.appendChild(deleteBtn);

    // Save logic
    saveBtn.addEventListener("click", function () {
      const newText = input.value.trim() || currentText;

      // Reset li content
      li.innerHTML = newText;

      // Restore delete button
      const newDelete = document.createElement("span");
      newDelete.innerHTML = "\u00d7";
      newDelete.classList.add("delete");
      li.appendChild(newDelete);

      // Restore edit button
      const newEdit = document.createElement("span");
      newEdit.innerHTML = "\u270E";
      newEdit.classList.add("edit");
      li.appendChild(newEdit);

      saveData();
    });

    input.focus();
  }

  // Toggle check
  else if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
  }
}, false);

// Function to clear all tasks
function clearTasks() {
  listContainer.innerHTML = "";
  saveData();
}

// Function to save tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

// Load tasks on page load
showTask();

// Attach clear button functionality
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearTasks);