// Load tasks from localStorage or empty array
let todoList = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todo, i) => {
    const { name, dueDate, completed } = todo;

    todoListHTML += `
      <div class="todo-row">
        <input type="checkbox" ${completed ? "checked" : ""} 
          onchange="toggleComplete(${i})">
        <div class="${completed ? 'completed' : ''}">${name}</div>
        <div>${dueDate || "-"}</div>
        <button class="delete-todo-button" onclick="deleteTodo(${i})">Delete</button> 
      </div>
    `;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (!name) {
    alert("Please enter a task");
    return;
  }

  todoList.push({ name, dueDate, completed: false });
  saveTodos();

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodos();
  renderTodoList();
}

function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed;
  saveTodos();
  renderTodoList();
}

// Add Enter key support
document.querySelector('.js-name-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// Initial render
renderTodoList();
