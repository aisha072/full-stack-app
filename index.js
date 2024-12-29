async function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      alert('User created');
    } else {
      alert('Error creating user');
    }
  }
  
  async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      document.getElementById('signup').style.display = 'none';
      document.getElementById('login').style.display = 'none';
      document.getElementById('todos').style.display = 'block';
    } else {
      alert('Invalid credentials');
    }
  }
  
  async function addTodo() {
    const text = document.getElementById('todo-text').value;
    const token = localStorage.getItem('token');
    const response = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    if (response.ok) {
      const todo = await response.json();
      const li = document.createElement('li');
      li.textContent = todo.text;
      document.getElementById('todo-list').appendChild(li);
    } else {
      alert('Error adding todo');
    }
  }
  