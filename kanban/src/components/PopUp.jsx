import React, { useState } from 'react';

import Button from './Button';

import X from '../assets/icon-cross.svg';

function PopUp({ type, onClose }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [subtasks, setSubtasks] = useState(['']);

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Aqui você pode adicionar a lógica para criar uma nova tarefa no data.json
    // com os valores dos campos taskTitle e taskDescription

    // Fechar o popup após a criação da tarefa
    onClose();
  };

  let title, content;
  
  switch (type) {
    case 'AddNewTask':
      title = 'Add New Task';
      content = (
        <form onSubmit={handleFormSubmit}>
          <div className="input">
            <label htmlFor="taskTitle">Title</label>
            <input
              type="text"
              id="taskTitle"
              placeholder="e.g. Take coffee break"
              value={taskTitle}
              onChange={handleTaskTitleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            ></textarea>
          </div>
          <div className="input">
            <label>Subtasks</label>
            {subtasks.map((subtask, index) => (
              <div className="subtask" key={index}>
                <input
                  type="text"
                  name={`subtask-${index}`} 
                />
                <img
                  src={X}
                  alt="Excluir"
                />
              </div>
            ))}
            <Button
              type="btn-secundary"
              content="+ Add New Subtask"
              t="button"
              func={handleAddSubtask}
            />
          </div>
          <Button type="btn-terciary" content="Create Task" t="submit" />
        </form>
      );
      break;
    case 'view':
      title = 'View Task';
      content = 'This is the view task popup.';
      break;
    case 'edit':
      title = 'Edit Task';
      content = 'This is the edit task popup.';
      break;
    default:
      title = 'Popup Content';
      content = 'This is a popup component.';
      break;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{title}</h3>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PopUp;