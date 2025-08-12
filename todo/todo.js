const TASKS_KEY = 'todo_tasks';

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
  tasks.forEach(renderTask);
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll('#task-list li')).map(li => ({
    text: li.querySelector('span').textContent,
    completed: li.classList.contains('completed')
  }));
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function renderTask(task) {
  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');
  const span = document.createElement('span');
  span.textContent = task.text;
  li.appendChild(span);

  const del = document.createElement('button');
  del.textContent = 'Eliminar';
  del.className = 'delete';
  del.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(del);
  document.getElementById('task-list').appendChild(li);
}

function addTask() {
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (!text) return;
  renderTask({ text, completed: false });
  saveTasks();
  input.value = '';
}

document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('new-task').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

document.addEventListener('DOMContentLoaded', loadTasks);
