import React, { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    const callApi = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const data = await response.json();

      setTodo(data);
    };

    callApi();
  }, []);

  const [view, setView] = useState('read');
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [index, setIndex] = useState(undefined);

  const handleAddClick = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: input,
        completed: false,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();

    setTodo([...todo, data]);
    setInput('');
  };
  const handleTodoClick = (index) => {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    setTodo(newTodo);
  };
  const handleDeleteClick = async (index) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`, {
      method: 'DELETE',
    });

    const newTodo = [...todo];

    newTodo.splice(index, 1);
    setTodo(newTodo);
  };
  const handleEditClick = (index) => {
    setView('edit');
    setIndex(index);
    setEditInput(todo[index].title);
  };
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleEditInputChange = (event) => {
    setEditInput(event.target.value);
  };
  const handleSaveClick = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: editInput,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const newTodo = [...todo];
    newTodo[index].title = editInput;
    setView('read');
    setIndex(undefined);
    setEditInput('');
  };
  return (
    <div>
      {view === 'read' && (
        <>
          <ul>
            {todo.map((ele, index) => (
              <li key={ele.title + index}>
                <span
                  onClick={() => handleTodoClick(index)}
                  style={{
                    textDecoration: ele.completed ? 'line-through' : 'none',
                  }}
                >
                  {ele.title}
                </span>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
                <button onClick={() => handleEditClick(index)}>Edit</button>
              </li>
            ))}
          </ul>
          <input value={input} onChange={(event) => handleInputChange(event)} />
          <button onClick={handleAddClick}>Add Todo</button>
        </>
      )}
      {view === 'edit' && (
        <>
          <input
            value={editInput}
            onChange={(event) => handleEditInputChange(event)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      )}
    </div>
  );
}

export default App;
