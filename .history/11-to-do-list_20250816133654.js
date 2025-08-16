const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;
    const html = `
    <div class="todo-row">
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
        " class="delete-todo-button">Delete</button> 
    </div>
`;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}

const listEl   = document.getElementById('todo-list');
const emptyEl  = document.getElementById('empty-state');
const textEl   = document.getElementById('todoText');
const dateEl   = document.getElementById('todoDate');
const addBtn   = document.getElementById('addBtn');

function addTask() {
  const text = (textEl.value || "").trim();
  const date = dateEl.value;

  if (!text) { alert("Please enter a task"); return; }

  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <span class="todo-text">${text}</span>
    <span class="todo-date">${date ? new Date(date).toLocaleDateString() : ""}</span>
  `;
  listEl.appendChild(li);

  textEl.value = "";
  dateEl.value = "";
  if (emptyEl) emptyEl.style.display = 'none';
}

addBtn.addEventListener('click', addTask);
textEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });