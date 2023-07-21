import React, { useState, useEffect } from 'react';
import { Button, TextInput, Paper, Container } from '@mantine/core';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    setTasks([...tasks, { text: newTask, isCompleted: false }]);
    setNewTask('');
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].text);
  };

  const handleSaveTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    const updatedTasks = [...tasks];
    if (editIndex !== -1) {
      updatedTasks[editIndex].text = newTask;
      setEditIndex(-1);
    } else {
      updatedTasks.push({ text: newTask, isCompleted: false });
    }

    setTasks(updatedTasks);
    setNewTask('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  return (
    <Container size="sm" className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <TextInput
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        {editIndex === -1 ? (
          <Button onClick={handleAddTask}>Add Task</Button>
        ) : (
          <Button onClick={handleSaveTask} color="teal">
            Save
          </Button>
        )}
      </div>
      <Paper shadow="sm">
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {editIndex === index ? (
                <TextInput value={newTask} onChange={(e) => setNewTask(e.target.value)} />
              ) : (
                <span className={task.isCompleted ? 'completed' : ''}>{task.text}</span>
              )}
              {editIndex === index ? (
                <Button onClick={handleSaveTask} color="teal">
                  Save
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handleToggleCompletion(index)}
                    color={task.isCompleted ? 'yellow' : 'blue'}
                  >
                    {task.isCompleted ? 'Unaccept' : 'Accept'}
                  </Button>
                  <Button onClick={() => handleEditTask(index)} color="cyan">
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteTask(index)} color="red">
                    X
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
}

export default App;
