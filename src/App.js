import React, { useState } from 'react';
import './App.css';

function Todo({todo, index}) {
  return (
    <div className="todo">{todo.text}</div>
  );
}

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className="input"
        onChange={e => setValue(e.target.value)}
        placeholder="Add todo..."
        type="text"
        value={value} />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn about React', isCompleted: false, },
    { text: 'Meet friend for lunch', isCompleted: false, },
    { text: 'Build really cool todo app', isCompleted: false, }
  ]);

  const addTodo = text => {
    const newTodos = [ ...todos, text ];
    setTodos(newTodos);
  }

  return (<div className="app">
    <div className="todo-list">
      {todos.map((todo, index) => (
        <Todo key={index} index={index} todo={todo} />
      ))}
      <TodoForm addTodo={addTodo} />
    </div>
  </div>);
}

export default App;
