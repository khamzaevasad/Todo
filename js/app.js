const formCreate = document.getElementById('form-create');
const formEdit = document.getElementById('form-edit');
const listGroupTodo = document.getElementById('list-group-todo');
// const messageCreate = document.getElementById('message-create');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');
// Time elements
const fullDay = document.getElementById('full-day');
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const secondEL = document.getElementById('second');

let editItemId;

//check

let todos = JSON.parse(localStorage.getItem('list'))
  ? JSON.parse(localStorage.getItem('list'))
  : [];

if (todos.length) {
  showTodos();
}

// Set todos to local stroge
function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos));
}

// Function time

function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();

  const second =
    now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Nowember',
    'December',
  ];

  const monthTitle = now.getMonth();
  fullDay.textContent = `${date} ${months[monthTitle]} ${year}`;

  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEL.textContent = second;
  return `${hour}:${minute}, ${date}.${month}.${year}`;
}
setInterval(getTime, 1000);

// Show todo
function showTodos() {
  const todos = JSON.parse(localStorage.getItem('list'));
  listGroupTodo.innerHTML = '';

  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
        <li ondblclick="SetCompleted(${i})" class="list-group-item d-flex justify-content-between ${
      item.completed == true ? 'completed' : ''
    }">
                    ${item.text}
                <div class="todo-icons">
                    <span class="opacity-50 me-2 times">${item.time}</span>
                    <img onClick=(editTodo(${i})) src="img/edit.svg" alt="edit" width="25px" height="25px">
                    <img onClick=(deleteTodo(${i})) src="img/delete.svg" alt="delete" width="25px" height="25px">
                </div>
        </li>
    `;
  });
}
// Show error
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = '';
  }, 2500);
}

// get Todos

formCreate.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = formCreate['input-create'].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), complated: false });
    setTodos();
    showTodos();
  } else {
    showMessage('message-create', 'Please, Enter some text...');
  }
});

// Delete Todo
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletedTodos;
  setTodos();
  showTodos();
}

// SetCompleted
function SetCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });

  todos = completedTodos;
  setTodos();
  showTodos();
}

// Edit Form
formEdit.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = formEdit['input-edit'].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      complated: false,
    });
    setTodos();
    showTodos();
    close();
  } else {
    showMessage('message-edit', 'Please, Enter some text...');
  }
});

// Edit Todo

function editTodo(id) {
  open();
  editItemId == id;
}

overlay.addEventListener('click', close);
closeBtn.addEventListener('click', close);
document.addEventListener('keydown', (e) => {
  if (e.which == 27) {
    close();
  }
});

function open() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function close() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
